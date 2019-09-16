import * as React from "react";
import { connect } from "react-redux";
import * as Constants from "mapguide-react-layout/lib/constants";
import { DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "mapguide-react-layout/lib/components/toolbar";
import ToolbarContainer from "mapguide-react-layout/lib/containers/toolbar";
import { PlaceholderComponent, DefaultComponentNames } from "mapguide-react-layout/lib/api/registry/component";
import { IApplicationState, ReduxDispatch } from "mapguide-react-layout/lib/api/common";
import FlyoutRegionContainer from "mapguide-react-layout/lib/containers/flyout-region";
import ViewerApiShim from "mapguide-react-layout/lib/containers/viewer-shim";
import ModalLauncher from "mapguide-react-layout/lib/containers/modal-launcher";

const SIDEBAR_WIDTH = 250;
const TASKPANE_HEIGHT = 500;

/**
 * This interface defines any props that can be passed into the component
 *
 * @export
 * @interface ISampleLayoutTemplateProps
 */
export interface ISampleLayoutTemplateProps {

}

/**
 * This interface defines observable redux state that is automatically updated when new state is
 * dispatched to the redux store. This is how the component can automatically render/update based
 * on change of state in the redux store.
 *
 * The function mapStateToProps is used to project the redux state tree to the properties defined
 * in this interface
 *
 * @export
 * @interface ISampleLayoutTemplateState
 */
export interface ISampleLayoutTemplateState {
    isBusy: boolean;
    locale: string;
}

/**
 * This interfaces defines actions that can push new state to the redux store
 *
 * The function mapDispatchToProps is used to map the actions to invoke the redux
 * dispatcher that is passed
 *
 * @export
 * @interface ISampleLayoutTemplateDispatch
 */
export interface ISampleLayoutTemplateDispatch {

}

/**
 * The react component consists of props and state. As the above interface are all part of the component's props, this type alias
 * is a convenient descriptor of the props as a whole, an intersection type of the above interfaces. The Partial<> type wrapper
 * means that all members of this intersection type are optional.
 */
export type SampleLayoutTemplateProps = Partial<ISampleLayoutTemplateProps & ISampleLayoutTemplateState & ISampleLayoutTemplateDispatch>;

/**
 * This function projects parts of the redux state tree into the target properties of our component state interface
 *
 * @param {IApplicationState} state The redux state tree
 * @returns {Partial<ISampleLayoutTemplateState>}
 */
function mapStateToProps(state: IApplicationState) : Partial<ISampleLayoutTemplateState> {
    return {
        isBusy: state.viewer.busyCount > 0,
        locale: state.config.locale
    };
}

/**
 * This function maps actions of our component dispatch interface to calls to the provided
 * redux action dispatcher function.
 *
 * As this component does not push any state, this interface has no actions and thus this
 * function returns an empty object
 *
 * @param {ReduxDispatch} dispatch
 * @returns {ISampleLayoutTemplateDispatch}
 */
function mapDispatchToProps(dispatch: ReduxDispatch): ISampleLayoutTemplateDispatch {
    return {

    };
}

/**
 * This react component represents our example viewer template. It subscribes to state in
 * the redux store via the connect() function below
 *
 * @export
 * @class SampleLayoutTemplate
 * @extends {React.Component<SampleLayoutTemplateProps, any>}
 */
class SampleLayoutTemplate extends React.Component<SampleLayoutTemplateProps, any> {
    constructor(props: SampleLayoutTemplateProps) {
        super(props);
    }
    render(): JSX.Element | null {
        const { locale, isBusy } = this.props;
        return <div style={{ width: "100%", height: "100%" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: SIDEBAR_WIDTH }}>
                <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: TASKPANE_HEIGHT, overflowY: "auto" }}>
                    {/* This is the legend component */}
                    <PlaceholderComponent id={DefaultComponentNames.Legend} locale={locale} componentProps={{ inlineBaseLayerSwitcher: true }} />
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: TASKPANE_HEIGHT }}>
                    {/* This is the task pane component */}
                    <PlaceholderComponent id={DefaultComponentNames.TaskPane} locale={locale} />
                </div>
            </div>
            {/* This is the primary toolbar */}
            <ToolbarContainer id={Constants.WEBLAYOUT_TOOLBAR} containerStyle={{ position: "absolute", left: SIDEBAR_WIDTH, top: 0, right: 0, zIndex: 100, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />
            <div style={{ position: "absolute", left: SIDEBAR_WIDTH, top: DEFAULT_TOOLBAR_SIZE, bottom: 0, right: 0 }}>
                {/* The map component */}
                <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
                {/* The navigator (zoom slider) component */}
                <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />
                {/* The mouse coordinates display component */}
                <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                {/* The scale display component */}
                <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
            </div>
            {/*
            This component automatically installs polyfill APIs for the AJAX viewer and partial support for the Fusion API, such APIs
            are accessible from Task Pane content.
                */}
            <ViewerApiShim />
            {/*
            This component services modal content display requests and displays such content in floating modal dialogs when requested
            */}
            <ModalLauncher />
            {/*
            This component services request for displaying flyout menus
            */}
            <FlyoutRegionContainer />
        </div>
    }
}

/**
 * This connects to the redux store and returns the decorated viewer template component
 */
export default connect(mapStateToProps, mapDispatchToProps)(SampleLayoutTemplate);