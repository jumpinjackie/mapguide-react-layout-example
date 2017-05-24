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
        return <noscript />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoComponent);