import { USER } from "../types/types";
export const setUser = (user: USER, type: string) => {
  const newUser = {
    ...user,
    type,
  };

  const jsonUser = JSON.stringify(newUser);
  localStorage.setItem("currentUser", jsonUser);
};

export const getUser = () => {
  const jsonUser = localStorage.getItem("currentUser");
  if (jsonUser) {
    const user = JSON.parse(jsonUser!);

    return {
      user,
    };
  }

  return {
    user: null,
  };
};

export const clearData = () => {
  localStorage.clear();
};
