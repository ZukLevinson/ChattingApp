const initialState = "light";

interface Action {
  type: string;
  payload: string;
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "changeTheme":
      switch (state) {
        case "light":
          return "purple";
        case "purple":
          return "dark";
        case "dark":
          return "light";
      }
      break;
    default:
      return state;
  }
};

export default reducer;
