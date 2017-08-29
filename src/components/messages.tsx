import * as React from "react";
import { connect } from "react-redux";
import { ICustomApplicationState } from "../reducers/message";
import { ReduxDispatch } from "mapguide-react-layout/lib/api/common";

export interface IMessagesComponentOwnProps {

}

export interface IMessagesComponentProps {
    messages: string[];
}

export interface IMessagesComponentDispatch {

}

export type MessagesComponentProps = IMessagesComponentOwnProps & Partial<IMessagesComponentProps> & Partial<IMessagesComponentDispatch>;

function mapStateToProps(state: Readonly<ICustomApplicationState>): Partial<IMessagesComponentProps> {
    return {
        messages: state.message.messages
    }
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IMessagesComponentDispatch> {
    return {

    };
}

// This component is a connected component that subscribes to our custom messages state branch
// messages are pushed to this branch from the Demo component through dispatched message actions
export class MessagesComponent extends React.Component<MessagesComponentProps, any> {
    constructor(props: MessagesComponentProps) {
        super(props);
    }
    render(): JSX.Element {
        const { messages } = this.props;
        return <div style={{ padding: 6 }}>
            <p>All messages sent from the Demo component are shown here</p>
            <textarea readOnly rows={10} style={{ width: "100%" }} value={(messages || []).join("\n")} />
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesComponent);