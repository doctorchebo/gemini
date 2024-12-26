import * as HomeActions from "./home.actions"
export interface State {
    isDarkMode: boolean;
}
const initialState: State = {
    isDarkMode: false
}
export function homeReducer(state=initialState, action: HomeActions.HomeActions){
    switch(action.type){
        case HomeActions.SET_DARK_MODE:
            return {
                ...state,
                isDarkMode: action.payload
            }
        default:
            return {
                ...state
            }
    }
}