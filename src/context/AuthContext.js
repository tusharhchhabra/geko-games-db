import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const logout = () => {
    fetch("/api/logout")
      .then((res) => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
      });
  };

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error("An error occurred while fetching the user:", error);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isModalOpen, openModal, closeModal, user, setUser, logout }}
    >
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
