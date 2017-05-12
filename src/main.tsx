/**
 * main.tsx
 *
 * This is the primary entry point of your custom mapguide-react-layout viewer bundle
 */
import * as React from "react";
import * as ReactDOM from "react-dom";

import { initDefaultCommands } from "mapguide-react-layout/lib/api/default-commands";
import { ApplicationViewModel } from "mapguide-react-layout/lib/entries/application";
import { AjaxViewerLayout } from "mapguide-react-layout/lib/layouts/ajax-viewer";
import { SidebarLayout } from "mapguide-react-layout/lib/layouts/sidebar";
import { AquaTemplateLayout } from "mapguide-react-layout/lib/layouts/aqua";
import { TurquoiseYellowLayoutTemplate } from "mapguide-react-layout/lib/layouts/turquoise-yellow";
import { LimeGoldLayoutTemplate } from "mapguide-react-layout/lib/layouts/limegold";
import { SlateTemplateLayout } from "mapguide-react-layout/lib/layouts/slate";
import { MaroonTemplateLayout } from "mapguide-react-layout/lib/layouts/maroon";
import { SampleLayoutTemplate } from "./templates/SampleTemplate";
import { registerLayout } from "mapguide-react-layout/lib/api/registry/layout";
import { registerDefaultComponents } from "mapguide-react-layout/lib/api/default-components";
import { bootstrap } from "mapguide-react-layout/lib/api/bootstrap";

require("mapguide-react-layout/src/styles/index.css");

bootstrap();
registerLayout("ajax-viewer", () => <AjaxViewerLayout />);
registerLayout("sidebar", () => <SidebarLayout />);
registerLayout("aqua", () => <AquaTemplateLayout />);
registerLayout("turquoise-yellow", () => <TurquoiseYellowLayoutTemplate />);
registerLayout("limegold", () => <LimeGoldLayoutTemplate />);
registerLayout("slate", () => <SlateTemplateLayout />);
registerLayout("maroon", () => <MaroonTemplateLayout />);
registerLayout("sample-template", () => <SampleLayoutTemplate />);
initDefaultCommands();
registerDefaultComponents();

export { ApplicationViewModel as Application };