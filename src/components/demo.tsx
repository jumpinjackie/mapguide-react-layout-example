import * as React from "react";
import { connect } from "react-redux";
import * as MapActions from "mapguide-react-layout/lib/actions/map";
import { ReduxDispatch, IApplicationState, ActiveMapTool } from "mapguide-react-layout/lib/api/common";
import { Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";

export interface IDemoComponentOwnProps {

}

export interface IDemoComponentProps {
    activeMapName: string;
    scale: number;
    selectedFeatureCount: number;
    selectedLayerCount: number;
    activeTool: ActiveMapTool;
    tooltipsEnabled: boolean;
}

export interface IDemoComponentDispatch {
    setActiveTool: (tool: ActiveMapTool) => void;
    setTooltipsEnabled: (enabled: boolean) => void;
}

export type DemoComponentProps = Partial<IDemoComponentOwnProps> & Partial<IDemoComponentProps> & Partial<IDemoComponentDispatch>;

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: Readonly<IDemoComponentOwnProps>): Partial<IDemoComponentProps> {
    const activeMapName = state.config.activeMapName;
    let scale;
    let selectedFeatureCount;
    let selectedLayerCount;
    let activeTool;
    if (activeMapName) {
        const mapState = state.mapState[activeMapName];
        if (mapState.currentView) {
            scale = mapState.currentView.scale;
        }
        if (mapState.selectionSet && mapState.selectionSet.FeatureSet) {
            selectedFeatureCount = mapState.selectionSet.FeatureSet.Layer.map(layer => layer.Class.ID.length).reduce((a, b) => a + b, 0);
            selectedLayerCount = mapState.selectionSet.FeatureSet.Layer.length;
        }
    }
    return {
        activeMapName: activeMapName,
        scale: scale,
        selectedFeatureCount: selectedFeatureCount,
        selectedLayerCount: selectedLayerCount,
        activeTool: state.viewer.tool,
        tooltipsEnabled: state.viewer.featureTooltipsEnabled
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IDemoComponentDispatch> {
    return {
        setActiveTool: (tool) => dispatch(MapActions.setActiveTool(tool)),
        setTooltipsEnabled: (enabled) => dispatch(MapActions.setFeatureTooltipsEnabled(enabled))
    };
}

export class DemoComponent extends React.Component<DemoComponentProps, object> {
    private fnSetSelect: () => void;
    private fnSetPan: () => void;
    private fnSetZoom: () => void;
    private fnToggleTooltips: () => void;
    constructor(props: DemoComponentProps) {
        super(props);
        this.fnSetSelect = this.onSetSelect.bind(this);
        this.fnSetPan = this.onSetPan.bind(this);
        this.fnSetZoom = this.onSetZoom.bind(this);
        this.fnToggleTooltips = this.onToggleTooltips.bind(this);
    }
    private onSetSelect() {
        if (this.props.setActiveTool) {
            this.props.setActiveTool(ActiveMapTool.Select);
        }
    }
    private onSetPan() {
        if (this.props.setActiveTool) {
            this.props.setActiveTool(ActiveMapTool.Pan);
        }
    }
    private onSetZoom() {
        if (this.props.setActiveTool) {
            this.props.setActiveTool(ActiveMapTool.Zoom);
        }
    }
    private onToggleTooltips() {
        if (this.props.setTooltipsEnabled) {
            this.props.setTooltipsEnabled(!!!this.props.tooltipsEnabled);
        }
    }
    render(): JSX.Element {
        const {
            activeMapName,
            scale,
            selectedLayerCount,
            selectedFeatureCount,
            activeTool,
            tooltipsEnabled
        } = this.props;
        const popoverContent = (
            <div>
                <h5>About</h5>
                <p>If you are seeing this message. Congratulations! You have just rendered this component through the use of existing InvokeURL commands.</p>
                <p>This component was rendered from clicking an InvokeURL command with a URI of <strong>component://DemoComponent</strong></p>
                <p>This component is connected the redux application state tree. Watch this component automatically update in response to various change in application state</p>
                <p>The toolbar buttons in this component dispatch redux actions to push new application state, causing components connected to the redux application state tree (including this one) to automatically update</p>
                <button className="pt-button pt-popover-dismiss">Dismiss</button>
            </div>
        );
        return <div>
            <div className="pt-card">
                <Popover
                    content={popoverContent}
                    interactionKind={PopoverInteractionKind.CLICK}
                    popoverClassName="pt-popover-content-sizing"
                    position={Position.BOTTOM_LEFT}>
                    <button className="pt-button pt-intent-primary">About</button>
                </Popover>
            </div>
            <div className="pt-card">
                <p>Map Name: {activeMapName ? activeMapName : "<not set>"}</p>
                <p>Current Scale: {scale ? `${scale}` : "<not set>"}</p>
                <p>Selected: {selectedLayerCount && selectedFeatureCount ? `${selectedFeatureCount} features in ${selectedLayerCount} layers` : "none"}</p>
                <p>Active Tool: {activeTool ? ActiveMapTool[activeTool] : "none"}</p>
            </div>
            <div className="pt-card">
                <div className="pt-button-group pt-large">
                    <a onClick={this.fnSetSelect} title="Select" className={`pt-button pt-icon-select ${activeTool == ActiveMapTool.Select ? "pt-active" : ""}`} role="button"></a>
                    <a onClick={this.fnSetZoom} title="Zoom" className={`pt-button pt-icon-zoom-in ${activeTool == ActiveMapTool.Zoom ? "pt-active" : ""}`} role="button"></a>
                    <a onClick={this.fnSetPan} title="Pan" className={`pt-button pt-icon-hand ${activeTool == ActiveMapTool.Pan ? "pt-active" : ""}`} role="button"></a>
                    <a onClick={this.fnToggleTooltips} title="Feature Tooltips Enabled" className={`pt-button pt-icon-comment ${!!tooltipsEnabled ? "pt-active" : ""}`} role="button"></a>
                </div>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoComponent);