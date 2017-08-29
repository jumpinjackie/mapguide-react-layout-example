// This module contains redux actions to manipulate our custom "messages" state branch

import * as Actions from "../constants/actions";

export function addMessage(message: string) {
    return {
        type: Actions.ADD_MESSAGE,
        payload: message
    }
}

export function clearMessages() {
    return {
        type: Actions.CLEAR_MESSAGES
    }
}