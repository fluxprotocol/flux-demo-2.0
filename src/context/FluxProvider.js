import React, {useReducer} from 'react';
import Flux from 'flux-sdk';
import { CONTRACT_ID } from '../constants';

const initialState = new Flux();
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
  await initialState.connect(CONTRACT_ID);
  return initialState;
}

export const FluxContext = React.createContext(initialState)

export const FluxProvider = ({children}) => {
	const [flux, dispatch] = useReducer(reducer, initialState)

	return(
		<FluxContext.Provider value={[flux, dispatch]}>{children}</FluxContext.Provider>
	)
}