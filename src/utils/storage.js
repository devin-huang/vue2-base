export const getToken = () => {
  return localStorage.getItem("tfw-token") || null;
};

export const setToken = (value) => {
  return localStorage.setItem("tfw-token", value) || null;
};
