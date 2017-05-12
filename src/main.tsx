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
import { TurquoiseYellowLayoutTemplate } from "mapguide-react-layout/lib/layouts/turquoise-yellow";
import { LimeGoldLayoutTemplate } from "mapguide-react-layout/lib/layouts/limegold";
import { SlateTemplateLayout } from "mapguide-react-layout/lib/layouts/slate";
import { MaroonTemplateLayout } from "mapguide-react-layout/lib/layouts/maroon";
import { SampleLayoutTemplate } from "./templates/SampleTemplate";

import { initDefaultCommands } from "mapguide-react-layout/lib/api/default-commands";
import { ApplicationViewModel } from "mapguide-react-layout/lib/entries/application";
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
registerLayout("turquoise-yellow", () => <TurquoiseYellowLayoutTemplate />);
registerLayout("limegold", () => <LimeGoldLayoutTemplate />);
registerLayout("slate", () => <SlateTemplateLayout />);
registerLayout("maroon", () => <MaroonTemplateLayout />);

// Register our custom viewer template
registerLayout("sample-template", () => <SampleLayoutTemplate />);

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