import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { fromDenom, toDenom } from '../../../helpers/numberUtils';
import { FluxContext } from '../../../context/FluxProvider';
import { CONTRACT_ID } from '../../../constants';
import { useHistory } from 'react-router-dom';
import ContentWrapper from '../../common/ContentWrapper';
import InlineContentWrapper from '../../common/InlineContentWrapper';

const UserBalanceContainer = styled.span`
  margin-left: 1rem;
  color: ${props => props.locked ? props.theme.gray : props.theme.green};
	display: inline-block;
`;

const Lock = styled.span`
	display: inline-block;
	margin-left: 7px;
	cursor: pointer;
`;

const LockInfo = styled.span`
	position: relative;
	display: inline-block;
	margin-left: 7px;
	color: ${props => props.theme.pink};
`;

const LockInfoText = styled.span`
	position: absolute;
	top: 1.5rem;
	right: -12rem;
	width: 15rem;
	padding: 0.7rem;
	font-size: 0.8rem;
	background-color: ${props => props.theme.pink};
	color: white;
	text-align: center;
`;

const UserName = styled.span`
  position: relative;
  margin-right: 1rem;
  color: white;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: -1rem;
    transform: translateY(-50%);
    height: 2rem;
    width: 1px;
    background-color: white;
    opacity: 0.5;
  }
`;

const UserBalance = ({user}) => {
	const history = useHistory();
	const [flux, ] = useContext(FluxContext);
	const balance = fromDenom(user.balance, 2);
	const allowance = fromDenom(user.allowance, 2);
	const locked = allowance < balance;
	const [showTooltip, setShowTooltip] = useState(false);

	const handleProfileClick = (id) => {
    history.push(`/settings`);
  };
	
	const handleSetAllowance = async () => {
		const allowanceToSet = locked ? balance : 0;
		await flux.setAllowance(CONTRACT_ID, toDenom(allowanceToSet, 2))

	}

	return (

		<ContentWrapper
			cursor="pointer"
			textAlign="right"
		>
			<InlineContentWrapper cursor="pointer" onClick={handleProfileClick}>
				<UserName>{user.id ? user.id : '' }</UserName>
				<UserBalanceContainer locked={locked}>{user.balance ? `$${balance}` : '' }</UserBalanceContainer>
			</InlineContentWrapper>
			<Lock onClick={handleSetAllowance}>{locked ? "unlock" : "lock"}</Lock>
			<LockInfo
				onMouseEnter={() => {
					setShowTooltip(true);
				}}
				onMouseLeave={() => {
					setShowTooltip(false);
				}}
			>
				?
				
				{showTooltip &&
					<LockInfoText>
						This is some explanation regarding the lock/unlocking of the account
					</LockInfoText>
				}

			</LockInfo>
		</ContentWrapper>

	)
}

export default UserBalance;