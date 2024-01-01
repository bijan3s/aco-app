interface AuthState {
  isAuthenticated: boolean;
  userId: number | null;
  userName: string | null;
}

interface AuthAction {
  type: string;
  payload?: {
    userId: number;
    userName: string;
  };
}
const initialState = {
  isAuthenticated: false,
  userId: null,
  userName: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload?.userId ?? state.userId,
        userName: action.payload?.userName ?? state.userName,
      };
    case "AuthSTATE":
      return {
        ...state,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};
