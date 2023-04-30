
const PriceFeed = require('./check-harga-class');

 (async ()=> {
    
  const roundData = await new PriceFeed().getLatestRoundData();
  console.log("harga 1 matic = ", roundData.answer, 'dalam dolar dengan 8 digit dibelakang koma')
  
})()



