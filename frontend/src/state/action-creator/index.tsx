export const changeTheme = (selectedTheme : string) => {
    return (dispatch: any) => {
        dispatch({
            type: "changeTheme",
            payload: selectedTheme
        });
    }
}