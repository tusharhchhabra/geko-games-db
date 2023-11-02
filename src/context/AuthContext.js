import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log("Searching for cookie");
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="));
    if (token) {
      const user = jwt.decode(token.split("=")[1]);
      setUser(user);
      console.log("User set", user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const user = useAuth();
    if (!user) {
      return <div>Loading...</div>;
    }
    return <Component {...props} user={user} />;
  };
}
