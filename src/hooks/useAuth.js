import { useEffect, useState, useContext } from 'react';

// context
import { FluxContext } from '../context/FluxProvider';

export const useAuth = () => {
    const [flux, ] = useContext(FluxContext);
    const [user, setUser] = useState(null);

    const login = async () => {
      flux.signInProtocol();
    };

    const logout = () => {
      flux.signOutProtocol();
      setUser(null);
    };

    const setUserFromWallet = async () => {
      const signedIn = flux.isSignedInProtocol();
      if (signedIn) {
        const id = await flux.getAccountId();
        const balance = await flux.getBalance(id);
        const user = {
          id,
          balance,
        }
        setUser(user);
      }
    };

    useEffect(() => {
      if (flux.connected) {
        setUserFromWallet();
      }
    }, [flux.connected]);

    return [user, login, logout]
};
