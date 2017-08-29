import * as Actions from "../constants/actions";
import { IApplicationState } from "mapguide-react-layout/lib/api/common";

export interface IMessageReducerState {
    messages: string[];
}

export interface ICustomApplicationState extends IApplicationState {
    message: IMessageReducerState;
}

export const MESSAGE_INITIAL_STATE: IMessageReducerState = {
    messages: []
}

//This reducer function handles our custom redux actions made to our custom state branch
export function messageReducer(state = MESSAGE_INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {
        case Actions.ADD_MESSAGE:
            const messages = [...state.messages, action.payload];
            return { ...state, ...{ messages: messages } };
        case Actions.CLEAR_MESSAGES:
            return { ...state, ...{ messages: [] } };
    }
    return state;
}