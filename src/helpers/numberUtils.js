import BigNumber from "big-number";


export const toDenom = (num, decimals = 0) => {
	const multiplier = BigNumber(10).pow(18 - decimals);
	const demimalCalc = decimals > 0 ? 10 ** decimals : 1;
	return BigNumber(num * demimalCalc).multiply(multiplier).toString();
}

export const toShares = (num, decimals = 0) => {
	const multiplier = BigNumber(10).pow(16 - decimals);
	const demimalCalc = decimals > 0 ? 10 ** decimals : 1;
	return BigNumber(num * demimalCalc).multiply(multiplier).toString();
}

export const fromShares = (num, decimals = 0) => {
	const multiplier = BigNumber(10).pow(16 - decimals);
	const demimalCalc = BigNumber(10).pow(decimals).toString()
	return parseInt(BigNumber(num).divide(multiplier).toString()) / parseInt(demimalCalc);
}

export const fromDenom = (num, decimals = 0) => {
	const multiplier = BigNumber(10).pow(18 - decimals);
	const demimalCalc = BigNumber(10).pow(decimals).toString()
	return parseInt(BigNumber(num).divide(multiplier).toString()) / parseInt(demimalCalc);
}