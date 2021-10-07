/**
 * main.tsx
 *
 * This is the primary entry point of your custom mapguide-react-layout viewer bundle
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import proj4 from "proj4";

// This is our custom application model that allows for custom reducers to be registered
import { CustomApplicationViewModel } from "./app";

// This is our custom viewer template
import SampleLayoutTemplate from "./templates/sample-template";

// These are our custom components
import DemoComponent from "./components/demo";
import MessagesComponent from "./components/messages";

import {
    bootstrap,
    registerLayout,
    AjaxViewerLayout,
    SidebarLayout,
    AquaTemplateLayout,
    GenericLayout,
    TurquoiseYellowTemplateLayout,
    LimeGoldTemplateLayout,
    SlateTemplateLayout,
    MaroonTemplateLayout,
    registerComponentFactory,
    registerCommand,
    SPRITE_INVOKE_SCRIPT,
    CommandConditions,
    initDefaultCommands,
    registerDefaultComponents,
    getRelativeIconPath,
    setAssetRoot,
    LayoutCapabilities,
    registerMapGuideComponents,
    initMapGuideCommands,
    DefaultComponentNames,
    MapGuideMapProviderContext,
    MapProviderContextProvider,
    MapViewer
} from "mapguide-react-layout";

import { MapAgentRequestBuilder } from 'mapguide-react-layout/lib/api/builders/mapagent';
import { addFormatDriver } from "mapguide-react-layout/lib/api/layer-manager/driver-registry";
import { FormatDriver } from "mapguide-react-layout/lib/api/layer-manager/format-driver";
import { CsvFormatDriver, CSV_COLUMN_ALIASES } from "mapguide-react-layout/lib/api/layer-manager/csv-driver";
import { registerRequestBuilder } from "mapguide-react-layout/lib/api/builders/factory";

import GeoJSON from 'ol/format/GeoJSON';
import TopoJSON from 'ol/format/TopoJSON';
import KML from 'ol/format/KML';
import GPX from 'ol/format/GPX';
import IGC from 'ol/format/IGC';


// This will pull in and embed the core stylesheet into the viewer bundle
require("mapguide-react-layout/src/styles/index.css");
// Pull in required thirdparty css
import "ol/ol.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "react-splitter-layout/lib/index.css";

// Sets up the required core libraries
bootstrap();

// Register default format drivers to use for the External Layer Manager tool
// If you have no intention of using this tool or using the Layer Manager APIs
// you can comment these lines out
addFormatDriver(new CsvFormatDriver(CSV_COLUMN_ALIASES));
addFormatDriver(new FormatDriver("GeoJSON", new GeoJSON()));
addFormatDriver(new FormatDriver("TopoJSON", new TopoJSON()));
addFormatDriver(new FormatDriver("KML", new KML(), "EPSG:4326"));
addFormatDriver(new FormatDriver("GPX", new GPX(), "EPSG:4326"));
addFormatDriver(new FormatDriver("IGC", new IGC()));

// Register the templates we intend to provide in this viewer. Below is the standard set
//
// If you don't intend to use certain templates, you can remove the registration call
// (and their respective import statement above), and the templates will not be included
// in the viewer bundle (with some size reduction as a result)
const DEFAULT_CAPS: LayoutCapabilities = {
    hasTaskPane: true
};
registerLayout("ajax-viewer", () => <AjaxViewerLayout />, DEFAULT_CAPS);
registerLayout("sidebar", () => <SidebarLayout />, DEFAULT_CAPS);
registerLayout("aqua", () => <AquaTemplateLayout />, DEFAULT_CAPS);
registerLayout("turquoise-yellow", () => <TurquoiseYellowTemplateLayout />, DEFAULT_CAPS);
registerLayout("limegold", () => <LimeGoldTemplateLayout />, DEFAULT_CAPS);
registerLayout("slate", () => <SlateTemplateLayout />, DEFAULT_CAPS);
registerLayout("maroon", () => <MaroonTemplateLayout />, DEFAULT_CAPS);
registerLayout("generic", () => <GenericLayout />, {
    hasTaskPane: false
});

// Register our custom viewer template
registerLayout("sample-template", () => <SampleLayoutTemplate />, DEFAULT_CAPS);

// Register the default set of commands (zoom/pan/etc/etc) to the command registry
initDefaultCommands();
initMapGuideCommands();

// Register the default set of components
registerDefaultComponents();
registerMapGuideComponents();

// Register our MapGuide-specific viewer implementation
const PROVIDER_IMPL = new MapGuideMapProviderContext();
registerComponentFactory(DefaultComponentNames.Map, (props) => <MapProviderContextProvider value={PROVIDER_IMPL}>
    <MapViewer {...props} />
</MapProviderContextProvider>);

// Register our custom component. Registering a custom component allows the component to be:
//
//  1. Usable and accessible by name in a PlaceholderComponent (generally required if building custom viewer templates)
//  2. An eligible candidate component when using component:// pseudo-URIs. You can create an InvokeURL commmand with 
//     the URL of component://DemoComponent and running the command will render the DemoComponent into the TaskPane or new window
registerComponentFactory("DemoComponent", () => <DemoComponent />);
registerComponentFactory("MessagesComponent", () => <MessagesComponent />);

// Registers a custom script command. This is the InvokeScript replacement. An InvokeScript command of a Web Layout or
// Application Definition will invoke this command if it has the same name. This viewer ignores any script content defined
// in the origial command definition
registerCommand("ViewAsKml", {
    //It will look for this icon under the standard asset path
    icon: getRelativeIconPath(SPRITE_INVOKE_SCRIPT),
    //Or you can comment the line above and uncomment the line below to reference the sprite directly
    //iconClass: SPRITE_INVOKE_SCRIPT,

    //This function controls whether the command is in a "selected" state, since this command
    //has no such notion, it always returns false
    selected: () => false,
    //This function controls whether the command is enabled. CommandConditions is a helper class
    //that provides common conditions where a command could be enabled/disabled
    enabled: CommandConditions.isNotBusy,
    //This function is invoked when the command (referenced in a toolbar or menu) is clicked.
    //
    //It receives 4 parameters:
    //
    // dispatch - The redux dispatcher function, call this with a pre-defined action creator (anything under lib/actions)
    //            to push new state to the redux application state tree. Components connected to the redux store will
    //            automatically update in response to the new state
    // getState - A helper function to get the current application state tree. Everything you want to know about the current
    //            state of the application (eg. Do we have a selection, Is the viewer busy, what is the current base layer, etc, etc)
    //            is in this state
    // viewer   - The viewer API. Use this to perform map-related actions. However if an equivalent redux action exists as well, 
    //            it is preferable to use that instead as connected components will be able to auto-update in response.
    // parameters - Any additional parameters. If you have loaded an Application Definition, this is generally the widget's
    //              parsed extension properties
    invoke: (dispatch, getState, viewer, parameters) => {
        const state = getState();
        const mapState = state.mapState;
        const activeMapName = state.config.activeMapName;
        if (activeMapName) {
            const map = mapState[activeMapName].mapguide?.runtimeMap;
            if (map) {
                const mapDefId = map.MapDefinition;
                const url = `../mapagent/mapagent.fcgi?USERNAME=Anonymous&OPERATION=GetMapKml&VERSION=1.0.0&MAPDEFINITION=${mapDefId}`;
                window.open(url);
            }
        }
    }
});

//Register the default mapagent request builder (that can be replaced later on if desired)
registerRequestBuilder("mapagent", (agentUri, locale) => new MapAgentRequestBuilder(agentUri, locale));

// The following statements below are required if you wish to provide the same browser globals API 
// that the default viewer bundle provides. 

// Export external libraies under the MapGuide.Externals namespace
export const Externals = {
    proj4: proj4,
    React: React,
    ReactDOM: ReactDOM
};

// Export the MapGuide.Application entry point class. Note that we're exporting our custom application model
// instead of the standard ApplicationViewModel as CustomApplicationViewModel introduces custom application
// state reducers that are demonstrated by the sample application using this bundle
export { CustomApplicationViewModel as Application };

export { setAssetRoot };