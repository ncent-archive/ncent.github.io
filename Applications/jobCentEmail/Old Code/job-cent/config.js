///////////////////////// users /////////////////////////

const intervalBetweenRegistrations = 10; //in seconds

///////////////////////// incentive daemon params /////////////////////////

const useRecursiveReward = true;
const intervalBetweenPayments = 10; //in seconds

///////////////////////// game setup params /////////////////////////

const tokenName = 'nCntDevCoin1';
const rewardName = 'nCntDollar01';
const initialBankFunding = '100000000000'; // 100G; needs to be a string
const initialRedeemFunding = '100000000000'; // 100G; needs to be a string
const rewardAmt = 5000;
const initSeedStr = '10';

///////////////////////// exports /////////////////////////

module.exports = {
    intervalBetweenRegistrations: intervalBetweenRegistrations,
    useRecursiveReward: useRecursiveReward,
    intervalBetweenPayments: intervalBetweenPayments, 
    tokenName: tokenName,
    rewardName: rewardName,
    initSeedStr: initSeedStr,
    initialBankFunding: initialBankFunding,
    initialRedeemFunding: initialRedeemFunding,
    rewardAmt: rewardAmt
}
