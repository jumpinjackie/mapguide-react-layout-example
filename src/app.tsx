import { ApplicationViewModel } from "mapguide-react-layout/lib/entries/application";
import { messageReducer } from "./reducers/message";

//CustomApplicationViewModel replaces ApplicationViewModel as the default application export for this
//viewer bundle. It is still exported to browser global scope as MapGuide.Application, so it looks the
//same from the point of view of any template entry point HTML page
export class CustomApplicationViewModel extends ApplicationViewModel {
    constructor() {
        super();
    }
    getExtraReducers(): any {
        //This sample adds a new custom state branch called "messages", the messageReducer function
        //is assigned to handle actions for this branch
        return {
            message: messageReducer
        };
    }
}