import { useEffect, useState, useContext } from 'react';

// context
import { FluxContext } from '../context/FluxProvider';

export const useAuth = () => {
    const [flux, ] = useContext(FluxContext);
    const [user, setUser] = useState(null);

    const login = () => {
      flux.signInProtocol();
    };

    const logout = () => {
      flux.signOutProtocol();
      setUser(null);
    };

    const setUserFromStorage = () => {
      // const user = localStorage.getItem('flux_fungible_token.flux-dev_wallet_auth_key');
      if (user) setUser(user);
    };

    useEffect(() => {
      setTimeout(() => {
        setUserFromStorage();
      }, 500)
      
    }, []);
    return [user, login, logout]
};
