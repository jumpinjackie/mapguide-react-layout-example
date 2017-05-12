/**
 * main.tsx
 *
 * This is the primary entry point of your custom mapguide-react-layout viewer bundle
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import proj4 from "proj4";

import { AjaxViewerLayout } from "mapguide-react-layout/lib/layouts/ajax-viewer";
import { SidebarLayout } from "mapguide-react-layout/lib/layouts/sidebar";
import { AquaTemplateLayout } from "mapguide-react-layout/lib/layouts/aqua";
import { TurquoiseYellowTemplateLayout } from "mapguide-react-layout/lib/layouts/turquoise-yellow";
import { LimeGoldTemplateLayout } from "mapguide-react-layout/lib/layouts/limegold";
import { SlateTemplateLayout } from "mapguide-react-layout/lib/layouts/slate";
import { MaroonTemplateLayout } from "mapguide-react-layout/lib/layouts/maroon";
import { SampleLayoutTemplate } from "./templates/SampleTemplate";

import { initDefaultCommands } from "mapguide-react-layout/lib/api/default-commands";
import { ApplicationViewModel } from "mapguide-react-layout/lib/entries/application";
import { CommandConditions, registerCommand } from "mapguide-react-layout/lib/api/registry/command";
import { registerLayout } from "mapguide-react-layout/lib/api/registry/layout";
import { registerDefaultComponents } from "mapguide-react-layout/lib/api/default-components";
import { bootstrap } from "mapguide-react-layout/lib/api/bootstrap";

// This will pull in and embed the core stylesheet into the viewer bundle
require("mapguide-react-layout/src/styles/index.css");

// Sets up the required core libraries
bootstrap();

// Register the templates we intend to provide in this viewer. Below is the standard set
registerLayout("ajax-viewer", () => <AjaxViewerLayout />);
registerLayout("sidebar", () => <SidebarLayout />);
registerLayout("aqua", () => <AquaTemplateLayout />);
registerLayout("turquoise-yellow", () => <TurquoiseYellowTemplateLayout />);
registerLayout("limegold", () => <LimeGoldTemplateLayout />);
registerLayout("slate", () => <SlateTemplateLayout />);
registerLayout("maroon", () => <MaroonTemplateLayout />);

// Register our custom viewer template
registerLayout("sample-template", () => <SampleLayoutTemplate />);

// Registers a custom script command. This is the InvokeScript replacement. An InvokeScript command of a Web Layout or
// Application Definition will invoke this command if it has the same name. This viewer ignores any script content defined
// in the origial command definition
registerCommand("ViewAsKml", {
    //It will look for this icon under stdicons
    icon: "invoke-script.png",
    //This function controls whether the command is in a "selected" state, since this command
    //has no such notion, it always returns false
    selected: () => false,
    //This function controls whether the command is enabled. CommandConditions is a helper class
    //that provides common conditions where a command could be enabled/disabled
    enabled: CommandConditions.isNotBusy,
    //This function is invoked when the command (referenced in a toolbar or menu) is clicked.
    //
    //It receives 3 parameters:
    //
    // dispatch - The redux dispatcher function, call this with a pre-defined action creator (anything under lib/actions)
    //            to push new state to the redux application state tree. Components connected to the redux store will
    //            automatically update in response to the new state
    // getState - A helper function to get the current application state tree. Everything you want to know about the current
    //            state of the application (eg. Do we have a selection, Is the viewer busy, what is the current base layer, etc, etc)
    //            is in this state
    // viewer   - The viewer API. Use this to perform map-related actions. However if a redux action exists as well, it is preferable
    //            to use that instead.
    invoke: (dispatch, getState, viewer) => {
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

// Export external libraies under the MapGuide.Externals namespace
export const Externals = {
    proj4: proj4,
    React: React,
    ReactDOM: ReactDOM
};

// Export the MapGuide.Application entry point class
export { ApplicationViewModel as Application };