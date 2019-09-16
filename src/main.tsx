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

// This is the "kitchen sink" import, whether you are importing everything or only a handful
// of types, in the eyes of webpack you will be bringing in the whole mapguide-react-layout
// module
/*
import {
    bootstrap,
    registerLayout,
    AjaxViewerLayout,
    SidebarLayout,
    AquaTemplateLayout,
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
    getRelativeIconPath
} from "mapguide-react-layout";
*/
// This is the alternate way to import the same types from mapguide-react-layout

// Import the standard templates for registration
//
// If you don't intend to use certain templates, you can remove the import
// statements and their template registrations, and the templates will not
// be included in the viewer bundle (with some size reduction as a result)
import AjaxViewerLayout from "mapguide-react-layout/lib/layouts/ajax-viewer";
import SidebarLayout from "mapguide-react-layout/lib/layouts/sidebar";
import AquaTemplateLayout from "mapguide-react-layout/lib/layouts/aqua";
import TurquoiseYellowTemplateLayout from "mapguide-react-layout/lib/layouts/turquoise-yellow";
import LimeGoldTemplateLayout from "mapguide-react-layout/lib/layouts/limegold";
import SlateTemplateLayout from "mapguide-react-layout/lib/layouts/slate";
import MaroonTemplateLayout from "mapguide-react-layout/lib/layouts/maroon";

import { initDefaultCommands } from "mapguide-react-layout/lib/api/default-commands";
import { CommandConditions, registerCommand } from "mapguide-react-layout/lib/api/registry/command";
import { registerLayout } from "mapguide-react-layout/lib/api/registry/layout";
import { registerDefaultComponents } from "mapguide-react-layout/lib/api/default-components";
import { registerComponentFactory } from "mapguide-react-layout/lib/api/registry/component";
import { bootstrap } from "mapguide-react-layout/lib/api/bootstrap";
import { getRelativeIconPath } from "mapguide-react-layout/lib/utils/asset";
import { SPRITE_INVOKE_SCRIPT } from "mapguide-react-layout/lib/constants/assets";

// This will pull in and embed the core stylesheet into the viewer bundle
require("mapguide-react-layout/src/styles/index.css");

// Sets up the required core libraries
bootstrap();

// Register the templates we intend to provide in this viewer. Below is the standard set
//
// If you don't intend to use certain templates, you can remove the registration call
// (and their respective import statement above), and the templates will not be included
// in the viewer bundle (with some size reduction as a result)
registerLayout("ajax-viewer", () => <AjaxViewerLayout />);
registerLayout("sidebar", () => <SidebarLayout />);
registerLayout("aqua", () => <AquaTemplateLayout />);
registerLayout("turquoise-yellow", () => <TurquoiseYellowTemplateLayout />);
registerLayout("limegold", () => <LimeGoldTemplateLayout />);
registerLayout("slate", () => <SlateTemplateLayout />);
registerLayout("maroon", () => <MaroonTemplateLayout />);

// Register our custom viewer template
registerLayout("sample-template", () => <SampleLayoutTemplate />);

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
            const map = mapState[activeMapName].runtimeMap;
            if (map) {
                const mapDefId = map.MapDefinition;
                const url = `../mapagent/mapagent.fcgi?USERNAME=Anonymous&OPERATION=GetMapKml&VERSION=1.0.0&MAPDEFINITION=${mapDefId}`;
                window.open(url);
            }
        }
    }
});

// Register the default set of commands (zoom/pan/etc/etc) to the command registry
initDefaultCommands();

// Register the default set of components
registerDefaultComponents();

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

export { setAssetRoot } from "mapguide-react-layout/lib/utils/asset";