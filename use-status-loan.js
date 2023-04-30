const Web3Helper = require('./status-loan-class');

const web3Helper = new Web3Helper();
console.log(" ");
console.log(" ");
web3Helper.getMaticBalance();
web3Helper.getBalance();



//web3Helper.getStatus();

async function main() {
    //const web3Helper = new Web3Helper();
    const status = await web3Helper.getStatus();
    
    console.log("===========================================");
    console.log(" ");
    console.log('nilai jaminan:', status.nilaiJaminan, 'nilai dollar dengan delapan digit dibelakang koma');
    console.log('nilai utang:', status.nilaiUtang);
    console.log('bisa ngutang lagi senilai :', status.allowanceUtang);
    console.log('perbandingan jaminan ke utang ===> '+ status.perbandinganJaminanUtang)
    console.log(" ");
    console.log('rasio utang ke deposit jika di sita berkisar ', status.rasioSita,'% dari nilai jaminan');
    console.log('rasio bisa Ngutang Maximum:', status.rasioNgutangMaximum,'% dari nilai jaminan');
    console.log('rasio Utang Saat Ini senilai', status.rasioUtangSaatIni,'% dari nilai jaminan');
    console.log(" ");
    console.log("===========================================");
  }
  
  main();
