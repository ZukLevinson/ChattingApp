export const changeTheme = (selctedTheme : string) => {
    return (dispatch: any) => {
        dispatch({
            type: "changeTheme",
            payload: selctedTheme
        });
    }
}