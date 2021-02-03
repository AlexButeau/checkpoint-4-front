import React, { createContext } from 'react';
import useLocalStorage from 'use-local-storage';

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [userDetails, setUserDetails] = useLocalStorage('user_info', {});
  const [isLogged, setIsLogged] = useLocalStorage('isLogged', false);

  const { children } = props;

  // useEffect(() => {
  //   setIsLogged(false);
  //   getCollection('currentUser').then((infos) => {
  //     setIsLogged(true);
  //     setUserDetails(infos);
  //   });
  // }, []);
  return (
    <LoginContext.Provider
      value={{ isLogged, setIsLogged, userDetails, setUserDetails }}
    >
      {children}
    </LoginContext.Provider>
  );
};
