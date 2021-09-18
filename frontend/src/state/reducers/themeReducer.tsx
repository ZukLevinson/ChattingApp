const initialState = "light";

interface Action {
    type : string
    payload : string
}

const reducer = (
    state = initialState,
    action : Action
) => {
    switch (action.type) {
        case "changeTheme":
            return action.payload;
        default:
            return state
    }
}

export default reducer;