import { v1, v2 } from '@aave/protocol-js';

// Fetch poolReservesData from GQL Subscription
// Fetch rawUserReserves from GQL Subscription
// Fetch ethPriceUSD from GQL Subscription

let userAddress = "0xD065833450C9AB16C35BEe9377593800628fC29An"

let userSummary = v2.formatUserSummaryData(poolReservesData, rawUserReserves, userAddress.toLowerCase(), Math.floor(Date.now() / 1000))
