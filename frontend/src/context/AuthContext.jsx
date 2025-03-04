import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Simuler une connexion réussie avec détection du type d'utilisateur
    const isOrganizer = email.includes('organizer');
    setUser({
      email,
      userType: isOrganizer ? 'organizer' : 'player',
      username: email.split('@')[0],
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
  };


  
  export function useAuth() {
    return useContext(AuthContext);
  }