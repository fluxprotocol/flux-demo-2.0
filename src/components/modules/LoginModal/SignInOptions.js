import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FluxContext } from '../../../context/FluxProvider';
import { FlexWrapper } from '../../common/Flex';
import { useAuth } from '../../../hooks/useAuth';

const SignInButton = styled.button`
	background: rgba(15,14,37,100);
	color: white;
	font-size: 1rem;
	border-radius: 10px;
	border: none;
	outline: none;
	padding: 1rem 2rem;
	cursor: pointer;
	margin-top: 5rem;
	width: 49%;

`
const StretchFlexWrapper = styled(FlexWrapper)`
	justify-content: space-between;
`


const SignInOptions = props => {
	const [user, login, ,oneClickTxSignIn] = useAuth();

  	return (
		<StretchFlexWrapper>
			<SignInButton onClick={login}>Sign in</SignInButton>
			<SignInButton onClick={oneClickTxSignIn}>One click tx sign in (dangerous)</SignInButton>
		</StretchFlexWrapper>
    )
  
}

export default SignInOptions;