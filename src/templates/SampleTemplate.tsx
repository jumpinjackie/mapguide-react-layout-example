import * as React from "react";
import { connect } from "react-redux";
import * as Constants from "mapguide-react-layout/lib/constants";
import { DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "mapguide-react-layout/lib/components/toolbar";
import { ToolbarContainer } from "mapguide-react-layout/lib/containers/toolbar";
import { PlaceholderComponent, DefaultComponentNames } from "mapguide-react-layout/lib/api/registry/component";
import { IApplicationState, ReduxDispatch } from "mapguide-react-layout/lib/api/common";
import { FlyoutRegionContainer } from "mapguide-react-layout/lib/containers/flyout-region";
import { ViewerApiShim } from "mapguide-react-layout/lib/containers/viewer-shim";
import { ModalLauncher } from "mapguide-react-layout/lib/containers/modal-launcher";

const SIDEBAR_WIDTH = 250;
const TASKPANE_HEIGHT = 500;

export interface ISampleLayoutTemplateProps {

}

export interface ISampleLayoutTemplateState {
    isBusy: boolean;
    locale: string;
}

export interface ISampleLayoutTemplateDispatch {

}

export type SampleLayoutTemplateProps = Partial<ISampleLayoutTemplateProps & ISampleLayoutTemplateState & ISampleLayoutTemplateDispatch>;

function mapStateToProps(state: IApplicationState) : Partial<ISampleLayoutTemplateState> {
    return {
        isBusy: state.viewer.busyCount > 0,
        locale: state.config.locale
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): ISampleLayoutTemplateDispatch {
    return {

    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class SampleLayoutTemplate extends React.Component<SampleLayoutTemplateProps, any> {
    constructor(props: SampleLayoutTemplateProps) {
        super(props);
    }
    render(): JSX.Element  | null {
        const { locale, isBusy } = this.props;
        return <div style={{ width: "100%", height: "100%" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: SIDEBAR_WIDTH }}>
                <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: TASKPANE_HEIGHT, overflowY: "auto" }}>
                    <PlaceholderComponent id={DefaultComponentNames.Legend} locale={locale} componentProps={{ inlineBaseLayerSwitcher: true }} />
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: TASKPANE_HEIGHT }}>
                    <PlaceholderComponent id={DefaultComponentNames.TaskPane} locale={locale} />
                </div>
            </div>
            <ToolbarContainer id={Constants.WEBLAYOUT_TOOLBAR} containerStyle={{ position: "absolute", left: SIDEBAR_WIDTH, top: 0, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />
            <div style={{ position: "absolute", left: SIDEBAR_WIDTH, top: DEFAULT_TOOLBAR_SIZE, bottom: 0, right: 0 }}>
                <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
                <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />
                <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
                <ViewerApiShim />
                <ModalLauncher />
                <FlyoutRegionContainer />
            </div>
        </div>
    }
}