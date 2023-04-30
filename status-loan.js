const Web3 = require('web3');
const provider = 'https://polygon-rpc.com/';

const web3 = new Web3(provider);
require('dotenv').config()
const WALLET_SECRET = process.env.WALLET_SECRET
const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD';  // proxy address
const USDCAddress ='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'   // USDC polygon
// cari ABI yang dibawah ada di "write as proxy" link nya berisi :ABI for the implementation contract at 0xdd9185db084f5c4fff3b4f70e7ba62123b812226,
const contractABI = require('./abi-borrow-USDC.js');
const abi =  require('./abi-check-balance.js');


const contract = new web3.eth.Contract(abi, USDCAddress);
const contractAAVE = new web3.eth.Contract(contractABI, contractAddress);

const address = web3.eth.accounts.privateKeyToAccount(WALLET_SECRET).address;

web3.eth.getBalance(address, function(error, balance) {
  if (!error) {
    console.log('Balance:', web3.utils.fromWei(balance, 'ether'));
    getBalance();
    getStatus();
  } else {
    console.log(error);
  }
});

const getBalance = async () => {
  const res = await contract.methods.balanceOf(address).call();

  console.log("saldo USDC tanpa koma="+res);
  let a = res;
  a = a.toString();
  
    a = a.substring(0, a.length - 6) + "." + a.substring(1, a.length );
  
  
  console.log("saldo USDC dengan koma ="+a);
  
}

const getStatus = async () => {
    const res = await contractAAVE.methods.getUserAccountData(address).call();
    //const format = web3.utils.fromWei(res);
    //console.log("saldo USDC ="+format);
   // "informasi LTV="+
    console.log("===========================================");
   //console.log(res);
    console.log("nilai jaminan ==> "+res.totalCollateralBase);
    console.log("nilai utang ==> "+res.totalDebtBase);
    console.log("bisa ngutang lagi senilai ==> "+res.availableBorrowsBase);
    const rasioSita = res.currentLiquidationThreshold.slice(0, -2)
    console.log("rasio utang ke jaminan kalau disita ==> "+rasioSita+"% dari nilai jaminan");

    const rasioNgutangMaximum = res.ltv.slice(0, -2)
    console.log("rasio utang ke jaminan yang bisa dipake ==> "+rasioNgutangMaximum+"% dari nilai jaminan");

    const rasioUtangSaatIni = parseFloat(res.totalDebtBase) / parseFloat(res.totalCollateralBase) *100
    const tampilanSimple = rasioUtangSaatIni.toFixed(1)
    console.log("rasio utang saat ini  ==> "+tampilanSimple+"% dari nilai jaminan");
    console.log("===========================================");
  
    
  }