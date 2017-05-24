import * as React from "react";
import { connect } from "react-redux";
import { ReduxDispatch, IApplicationState } from "mapguide-react-layout/lib/api/common";

export interface IDemoComponentOwnProps {

}

export interface IDemoComponentProps {

}

export interface IDemoComponentDispatch {

}

export type DemoComponentProps = Partial<IDemoComponentOwnProps> & Partial<IDemoComponentProps> & Partial<IDemoComponentDispatch>;

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: Readonly<IDemoComponentOwnProps>): Partial<IDemoComponentProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IDemoComponentDispatch> {
    return {

    };
}

export class DemoComponent extends React.Component<DemoComponentProps, object> {
    constructor(props: DemoComponentProps) {
        super(props);
    }
    render(): JSX.Element {
        return <div>
            <div>
                <p>If you are seeing this message. Congratulations! You have just rendered this component through the use of existing InvokeURL commands</p>
                <p>This component was rendered with from clicking an InvokeURL command with a URI of <strong>component://DemoComponent</strong></p>
                <p>This component is connected the redux application state tree. Watch this component automatically update in response to various change in application state</p>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoComponent);