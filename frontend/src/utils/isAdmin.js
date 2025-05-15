export const isAdmin = () => {
  // Later, you'll want to decode the JWT to verify the role
  const token = localStorage.getItem("token");
  // Simplified version (secure with server-side role checks)
  return !!token;
};
