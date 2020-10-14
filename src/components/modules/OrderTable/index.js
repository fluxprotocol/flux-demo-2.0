import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { toDenom, toShares, fromShares } from '../../../helpers/numberUtils';
import Paragraph from '../../common/Paragraph';
import Button from '../../common/Button';
import { FluxContext } from '../../../context/FluxProvider';
import LoaderButton from '../../common/LoaderButton';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 1em;
  width: 99%;
`;

const OrderBookWrapper = styled.table`
  width: 100%;
`;

const OrderBookDetails = styled.tr`
  & > th:first-of-type, & > td:first-of-type {
    text-align: left;
  }
`;

const OrderBookDetail = styled.th`
  padding: .5em;
  font-size: 1rem;
  font-weight: ${props => props.fontWeight ? props.fontWeight : 'auto'};
  text-align: right;
  color: white;
`;

const OrderTable = props => {
	const {title, market, headers, dataGetter, orderbookData} = props;
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [flux] = useContext(FluxContext);

	const cancelOrder = async (entry) => {
		setLoading({id: entry.id, outcome: entry.outcome});
		await flux.cancelOrder(market.id, entry.outcome, entry.id, entry.price)		
		setLoading(false);
	}
	
	useEffect(() => {
		dataGetter().then(res => {
			setData(res);
		})
	}, [orderbookData])

  	const outcomeTags = market.outcomes > 2 ? market.outcome_tags : ["NO", "YES"]

	const getOpenOrderBody = () => data.map((entry,i) => {
		return (
			<OrderBookDetails key={i}>

				<OrderBookDetail
					fontWeight="800"
				>
					{outcomeTags[entry.outcome]}
				</OrderBookDetail>
				<OrderBookDetail
					fontWeight="800"
				>
					$0.{entry.price}
				</OrderBookDetail>
				<OrderBookDetail
					fontWeight="800"
				>
					{fromShares(entry.shares)}
				</OrderBookDetail>
				<OrderBookDetail
					fontWeight="800"
				>
					{(fromShares(entry.shares_filled) / fromShares(entry.shares) * 100).toFixed(2)}%
				</OrderBookDetail>
				<OrderBookDetail
					fontWeight="800"
				>
				<LoaderButton
					color='pink'
					loading={loading.id == entry.id && loading.outcome == entry.outcome}
					onClick={() => cancelOrder(entry)}
					small
				>cancel</LoaderButton>
				</OrderBookDetail>
			</OrderBookDetails>
		)
	})

	const getPositionBody = () => data.map((entry,i) => {
		return (
			<OrderBookDetails key={i}>

				<OrderBookDetail
					fontWeight="800"
				>
					{outcomeTags[entry.outcome]}
				</OrderBookDetail>
				<OrderBookDetail
					fontWeight="800"
				>
					$0.{Math.round(parseInt(entry.avg_price_per_share))}
				</OrderBookDetail>
				<OrderBookDetail
					fontWeight="800"
				>
					{fromShares(entry.balance)}
				</OrderBookDetail>

				<OrderBookDetail
					fontWeight="800"
				>
					{/* <Button
						color='pink'
						small
					> 
						cancel
					</Button> */}
				</OrderBookDetail>
			</OrderBookDetails>
		)
	})

  return (
		<>
			<Paragraph
				margin={props.marginTop ? "50px 0 0 0" : "0"}
				size="1.5rem"
				fontWeight="bold"
				maxWidth="55rem"
			>
				{title}
			</Paragraph>
			<FlexWrapper>
				<OrderBookWrapper>
					<tbody>
						<OrderBookDetails>

						{headers.map((header, index) => (
							<OrderBookDetail
								fontWeight="300"
								key={index}
							>
								{header}
							</OrderBookDetail>
						))}

						</OrderBookDetails>

						{market.outcome_tags && title === "Your Open Orders" ? getOpenOrderBody() : getPositionBody()}

					</tbody>
				</OrderBookWrapper>
			</FlexWrapper>
		</>
  );
}

export default OrderTable;
