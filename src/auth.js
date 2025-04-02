const isAuthenticated = () => !!localStorage.getItem("token");

const getUserEmail = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const decoded = JSON.parse(atob(token.split(".")[1]));
  return decoded.email;
};

export { isAuthenticated, getUserEmail };
