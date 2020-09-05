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
  
    const oneClickTxSignIn = async () => {
      flux.oneClickTxSignIn();
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
        const allowance = await flux.getAllowance(id, CONTRACT_ID);
        const user = {
          id,
          balance,
          allowance
        }
        setUser(user);
      }
    };

    // TODO: make sure this updates users / balance globally
    const updateBalance = async () => {
      const balance = await flux.getBalance(user.id);
      setUser({...user, balance});
    }

    useEffect(() => {
      if (flux.connected) {
        setUserFromWallet();
      }
    }, [flux.connected]);

    return [user, login, logout, oneClickTxSignIn, updateBalance]
};
