import { useEffect, useState, useContext } from 'react';

// context
import { FluxContext } from '../context/FluxProvider';

// constants
import { CONTRACT_ID } from '../constants';

export const useAuth = () => {
    const [flux, ] = useContext(FluxContext);
    const [user, setUser] = useState(null);

    const login = async () => {
      flux.signIn();
    };

    const logout = () => {
      flux.signOut();
      setUser(null);
    };

    const setUserFromWallet = async () => {
      const signedIn = flux.isSignedIn();
      if (signedIn) {
        const id = await flux.getAccountId();
        const balance = await flux.getBalance(id);
        const getAllowance = await flux.getAllowance(CONTRACT_ID);
        const user = {
          id,
          balance,
          getAllowance
        }
        setUser(user);
      }

      console.log('hello', user);
    };

    useEffect(() => {
      if (flux.connected) {
        setUserFromWallet();
      }
    }, [flux.connected]);

    return [user, login, logout]
};
