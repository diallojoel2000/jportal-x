export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const hasToken = () => {
  const token = getToken();
  if (token === null || token === undefined) {
    return false;
  }
  return true;
};
