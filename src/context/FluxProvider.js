import React, {useReducer} from 'react';
import Flux from 'flux-sdk';
import { CONTRACT_ID, FUN_TOKEN_CONTRACT_ID } from '../constants';

const initialState = new Flux({
	tokenContractId: FUN_TOKEN_CONTRACT_ID,
	protocolContractId: CONTRACT_ID,
});

const reducer = (state, action) => {
	switch(action.type) {
		case 'connected': {
			return state = action.payload.flux 
		}
		default : {
			return state;
		}
	}
}

export const connect = async () => {
	const flux = new Flux({
		tokenContractId: FUN_TOKEN_CONTRACT_ID,
		protocolContractId: CONTRACT_ID,
	});

	window.flux = flux;

	await flux.connect();
  return flux;
}

export const FluxContext = React.createContext(initialState)

export const FluxProvider = ({children}) => {
	const [flux, dispatch] = useReducer(reducer, initialState)
	return(
		<FluxContext.Provider value={[flux, dispatch]}>{children}</FluxContext.Provider>
	)
}