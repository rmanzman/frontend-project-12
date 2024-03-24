import React, {
  createContext, useMemo, useContext, useState,
} from 'react';
import axios from 'axios';
import { endpoints } from '../api/endpoints';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser);

  const context = useMemo(() => {
    const login = async (userdata) => {
      const { data } = await axios.post(endpoints.login(), userdata);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    };

    const logout = (key) => {
      localStorage.removeItem(key);
      setUser(null);
    };

    const isLoggedIn = Boolean(user);

    return ({ login, logout, isLoggedIn });
  }, [user]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth };
export default AuthProvider;

// const useAuth = () => {
//   const {
//     user, addUser, removeUser, setUser,
//   } = useUser();
//   const { getItem } = useLocalStorage();

//   useEffect(() => {
//     const currUser = getItem('user');
//     if (currUser) {
//       addUser(JSON.parse(currUser));
//     }
//   }, [addUser, getItem]);

//   const login = (currUser) => {
//     addUser(currUser);
//   };

//   const logout = () => {
//     removeUser();
//   };

//   return {
//     user, login, logout, setUser,
//   };
// };

// export default useAuth;
