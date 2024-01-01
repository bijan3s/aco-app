export const login = (userData: { userId: number; userName: string }) => {
  return {
    type: "LOGIN",
    payload: userData,
  };
};
