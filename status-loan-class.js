const Web3 = require('web3');
const provider = 'https://polygon-rpc.com/';

class Web3Helper {
  constructor() {
    this.web3 = new Web3(provider);
    require('dotenv').config();
    this.WALLET_SECRET = process.env.WALLET_SECRET;
    this.USDCAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'; // USDC polygon
  }

  async getMaticBalance() {
         //const address =  new this.web3.eth.accounts.privateKeyToAccount(this.WALLET_SECRET).address;
         const senderAddress = '0xD065833450C9AB16C35BEe9377593800628fC29A';
         const balance = await this.web3.eth.getBalance(senderAddress);
         console.log('saldo MATIC:', this.web3.utils.fromWei(balance, 'ether'));
         return balance;
    }

    async reserveBalance() {
      //const address =  new this.web3.eth.accounts.privateKeyToAccount(this.WALLET_SECRET).address;
      const senderAddress = '0x82dF0F428325B889a3f4Aa993485A262dc51f05d';
      const balance = await this.web3.eth.getBalance(senderAddress);
     // console.log('saldo MATIC:', this.web3.utils.fromWei(balance, 'ether'));
      //return balance;
      return await this.web3.utils.fromWei(balance, 'ether')
 }

  async getUSDCBalance() {
    const contractABI = require('./abi-check-balance.js');
    const contract = new this.web3.eth.Contract(contractABI, this.USDCAddress);
    const address = this.web3.eth.accounts.privateKeyToAccount(this.WALLET_SECRET).address;
    const res = await contract.methods.balanceOf(address).call();
    /*
    let a = res;
    a = a.toString();
    a = a.substring(0, a.length - 6) + '.' + a.substring(1, a.length);
    console.log('saldo USDC dengan koma =' + a);
    return a;
    */
   return res
  }

  async getStatus() {
    const contractAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD'; // proxy address
    const contractABI = require('./abi-borrow-USDC.js');
    const contractAAVE = new this.web3.eth.Contract(contractABI, contractAddress);
    const address = this.web3.eth.accounts.privateKeyToAccount(this.WALLET_SECRET).address;
    const res = await contractAAVE.methods.getUserAccountData(address).call();
    /*
    const rasioSita = res.currentLiquidationThreshold.slice(0, -2);
    console.log('rasio utang ke jaminan kalau disita ==> ' + rasioSita + '% dari nilai jaminan');
    const rasioNgutangMaximum = res.ltv.slice(0, -2);
    console.log('rasio utang ke jaminan yang bisa dipake ==> ' + rasioNgutangMaximum + '% dari nilai jaminan');
    const rasioUtangSaatIni = parseFloat(res.totalDebtBase) / parseFloat(res.totalCollateralBase) * 100;
    const tampilanSimple = rasioUtangSaatIni.toFixed(1);
    console.log('rasio utang saat ini  ==> ' + tampilanSimple + '% dari nilai jaminan');
    */
    const nilaiJaminan = res.totalCollateralBase;
    const nilaiUtang = res.totalDebtBase;
    const allowanceUtang = res.availableBorrowsBase;
    const rasioSita = res.currentLiquidationThreshold.slice(0, -2);
    const rasioNgutangMaximum = res.ltv.slice(0, -2);
     const rasioUtangSaatIni = parseFloat(res.totalDebtBase) / parseFloat(res.totalCollateralBase) * 100;
     const perbandinganJaminanUtang = '100% : '+rasioUtangSaatIni.toFixed(1)+'% '
     return { 
        nilaiJaminan: nilaiJaminan,
        nilaiUtang: nilaiUtang,
        allowanceUtang: allowanceUtang,
        perbandinganJaminanUtang: perbandinganJaminanUtang,
        rasioSita: rasioSita,
        rasioNgutangMaximum: rasioNgutangMaximum,
        rasioUtangSaatIni: rasioUtangSaatIni.toFixed(1)
     };
  }
}

module.exports = Web3Helper;
