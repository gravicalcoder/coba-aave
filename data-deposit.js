const Web3Helper = require('./status-loan-class');
const PriceFeed = require('./check-harga-class');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com/"));

const web3Helper = new Web3Helper();
console.log(" ");
console.log(" ");
web3Helper.getMaticBalance();




const mainMatic = 0.5
const reserveMatic = 0.5

const feeDeposit = 0.05 //  dari 0.02 + 0.03 
const feeWithdraw = 0.08// dari 0.05 + 0.03

const feeBorrow = 0.05 // dari 0.02 + 0.03
const feeRepay = 0.06 // dari 0.03 + 0.03

const feeSwapToUSDC = 0.06 // dari 0.03 + 0.03 
const feeSwapToMtic = 0.08 // dari 0.04 + 0.01 + 0.03


const feeSendMATIC = 0.008 // dari 0.005 + 0.003
const feeSendUSDC = 0.04 // dari 0.01 + 0.03




//interaksi dan penggunaannya
const DepositETH = require('./deposit-class');
const Withdrawal = require('./withdraw-class.js');
const USDC = require('./send-USDC-class');
const SwapUSDCtoMATIC = require('./swap-USDC-MATIC-class');  //*** */
const SwapMATICtoUSDC = require('./swap-MATIC-USDC-class'); 
const USDCreserve = require('./send-USDC-reserve-class'); 
const Borrow = require('./borrow-USDC-class.js');
const MaticReserveSender = require('./send-reserve-class');
const MaticSender = require('./send-MATIC-class');
const RepayLoan = require('./repay-token-class.js');





// penggunaan
//new DepositETH().deposit(3.3);// deposit matic
//new Withdrawal(3.5).withdraw();
//new USDC().sendUSDC(1200000);
//new SwapUSDCtoMATIC().swap(3587869);
//new SwapMATICtoUSDC(2.55).swap();
//new USDCreserve().sendUSDC(1600000);
//new Borrow().borrow(3000000);  // meminjam USDC
//new MaticReserveSender(0.85).sendMATIC()
//new MaticSender(0.75).sendMATIC() //  berfungsi untuk mengirim MATIC dari akun utama ke akun reserve
//new RepayLoan().repay(2300000);




//modalawal = saldo utama - mainMatic

   // reserve = modalawal / 2
  //     modalawal = modalUtama + reserve
   // USDCreserve = reserve => swap to USDC+fee ==> sendTo reserve account    // perkiraan fee  => 0.06  + 0.008  =  0.068

// one cycle deposit => deposit matic ==> borrow usdc ==> swap usdc to matic ==> redeposit matic  // perkiraan fee  => 0.05 + 0.05 + 0.08  + 0.05 = 0.23
   // fee minimum => 0.02 + 0.02 + 0.05 +  0.02  = 0.11

//control deposit ==> kalau harga naik lebih dari fee (withdraw matic + swap to usdc + repay(0.08 + 0.08 + 0.06  = 0.22  min 0.05+ 0.05+0.03 = 0.13 )) ==>
/*
   jika deposit sudah lebih dari 1 hari ==> bayarPakeJaminan  ==> lalu keuntungan ditampung ke reserve
   jika harga naik lebih dari 5 persen ==> bayar pake jaminan  ==> lalu keuntungan ditampung ke reserve
*/

/*
   jika rasio utang ke jaminan lebih dari 65% gunakan reserve  ==> send USDC dari reserve akun lalu repay ke 60% // perkiraan fee ==> 0.008  + 0.06 = 0.068 

*/

/*
   jika keuntungan sudah mencapai 300% dari asset, kurangi reserve  sebanyak 100% lalu jadikan asset
*/

/*

if (margin > transactionFee) {
  if (timeToWait > 1) {
    // do repay
  } else if (marginSurge > 0.15) {
    // do repay
  }
} else {
  if (priceFall > -0.3) {
    // do borrow
  } else if (price < threshold) {
    // use reserve
  }
}
*/

require('dotenv').config()
var modalawal
var reserve
var reserveAddress = process.env.WALLET_ADDRESS2;
var modalUtama

function DelapanBelastoKoma(num){

  let count = num.length;
  
  if (count == 18) {
   
   let result = "0." + num;
    return result
  } else if (count < 18) {
   
    let zeros = '0'.repeat(18 - count);
    let str = zeros + num;
    const newStr = '0.' + str;
    return newStr

  } else {
      let result = num.substring(0, count - 18) + "." + num.substring(count - 18);
      return result;

  }
}



function enamToKoma(num){
  
  /*
  if(num !== null){
    let a = num;
    a = a.toString();
    a = a.substring(0, a.length - 6) + '.' + a.substring(1, a.length);

    return a;
  }
  else {
    let b = "kosong"
    return b;

  }
  */

  let result = num !== null ? (num.toString().substring(0, num.toString().length - 6) + '.' + num.toString().substring(1, num.toString().length)) : "kosong";
  return result;

}



async function persiapan(saldoUtama){
  
  let saldoReserve = await web3Helper.reserveBalance();
  let isiWallet = await web3Helper.getMaticBalance();
  let saldoAktif = parseFloat(isiWallet) - 500000000000000000;
  let status = parseFloat(saldoReserve) > 1 ? "sudah ada cadangan \n":"belum ada duid cadangan"
  let rencanaReserve = parseFloat(saldoUtama)/2

  let saldoMoving = DelapanBelastoKoma(saldoAktif.toString())

  console.log('dengan saldo aktif setelah dikurangi setengah MATIC  -->'+ saldoMoving  )

  console.log('dengan rencana reserve -->'+ DelapanBelastoKoma(rencanaReserve.toString()) )

  console.log('saldo reserve senilai ==>'+saldoReserve)

  reserve = parseFloat(saldoReserve) - mainMatic

  console.log('clean reserve senilai ==>'+ reserve)

  let setengahMoving = parseFloat(saldoMoving/2)

  console.log('nilai setengah moving =======>>>>> '+setengahMoving )

  let diff = Math.abs(parseFloat(saldoMoving)- reserve);

  console.log('perbedaan nilai saldo utama dan reserve ===> '+ diff)

  //if((reserve > 1  && reserve < parseFloat(saldoMoving/2)  && diff > 0.1) || (reserve < 1  && reserve < parseFloat(saldoMoving/2) ) ){ 
  if((reserve > 1  && diff > 0.1 && reserve < parseFloat(saldoMoving/2)) || (reserve < 1  && reserve < parseFloat(saldoMoving/2) ) ){ 
    console.log('belum rata saldonya')

    let gabungan = reserve + parseFloat(saldoMoving)

    console.log('saldo gabungan ====> '+ gabungan)

    let pembersihan = gabungan - 0.02

    console.log('saldo pembersihan ====> '+ gabungan)

    let kekuranganReserve = (pembersihan/2) - reserve

    console.log('kekurangan saldo di reserve ===> '+  kekuranganReserve )

    new MaticSender(kekuranganReserve).sendMATIC()

    console.log('dilakukan transfer ke reserve senilai ----- '+ kekuranganReserve  + 'MATIC')
  
  } else if(diff < 0.1){ 
    console.log('sudah waktunya melakukan deposit')
    depositModal(saldoMoving)
    console.log('======================================================')
  }  else if(reserve > saldoMoving){ 
    console.log('sedang melakukan deposit...... let be bullish')
    let input = parseFloat(saldoMoving) - 1.5
   

     if (input.toString().indexOf('-') === -1) {  // jika hasil pengurangan angkanya gak minus artinya sudah gak bisa deposit lagi
        console.log("Input does not contain negative sign");
        let formattedNumber = parseFloat(input.toFixed(3)); 
        console.log('input   ===========================================================>'+  formattedNumber )
        new DepositETH().deposit(formattedNumber);  // harus ada reserve lebih dari 1 matic
        //new DepositETH().deposit(3.154)

        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
      } else {
        console.log(" ");
        console.log("Input contains negative sign \n berarti waktunya pinjam USDC");  // cabang lain jika bagian atas kena stop mendadak
        //new Borrow().borrow(3000000); 
        let status = await web3Helper.getStatus();
        console.log('nilai jaminan:', status.nilaiJaminan, 'nilai dollar dengan delapan digit dibelakang koma');
        console.log('nilai utang ke protocol :', status.nilaiUtang, 'nilai dollar dengan delapan digit dibelakang koma');
        let ngutang = parseFloat(status.nilaiUtang)
        let pinjam = (parseFloat(status.nilaiJaminan) * 0.6) - ngutang 
        

        console.log('rencana pinjam senilai ====> '+ pinjam )

        let numStr = pinjam.toString();
        let numParts = numStr.split('.');// remove angka setelah koma
        let wholeNum = parseInt(numParts[0]);  
        let result = Math.floor(wholeNum  / 100); // ngurangain 2 angka karena USDC hanya punya 6 digit di belakan koma
        let jadiFloat = parseFloat(result )

        console.log('angka persiapan pinjam ===>>> '+ jadiFloat)

        let utang = parseFloat(status.nilaiUtang) 

        let selisih = Math.abs(jadiFloat - utang);

        if (selisih < 80000000) {    /// wah ini harus di definisan ulang saat sudah deposit seharusnya utang gak equal to pinjam

           console.log(' Utang is equal to Pinjam \n watunya tukar USDC ke MATIC \n nilai USDC yang dimiliki senilai ===>>>>'+ utang);
           let saldoUSDC = await web3Helper.getUSDCBalance()

           console.log('saldo USDC hasil ngutang : '+ saldoUSDC )
          console.log('saldo USDC hasil ngutang dengan Koma : '+ enamToKoma(saldoUSDC) )


           if(saldoUSDC > 1000000){
              try {
                let result = await new SwapUSDCtoMATIC().swap(saldoUSDC);;
                console.log(result);
              } catch (error) {
                console.log('gagal tukar USDC ke MATIC');
              }
           } else { console.log("=============  deposit ulang kayaknya ========= ")}
          
           


        } else {
           console.log('Utang is not equal to Pinjam');
           console.log('karena Utang senilai ===> '+ utang  +' dan nilai pinjaman senilai ==>'+ wholeNum );
           console.log('jadi bener nih masih harus pinjem USDC');

              
          
            try {
             let result = await new Borrow().borrow(jadiFloat);

            console.log(result);
              // harusnya ada next move kalau script nya berhasil
              if(result){  // kalau berhasil pinjam
                try {
                  let result = await new SwapUSDCtoMATIC().swap(saldoUSDC);;
                  console.log(result);
                } catch (error) {
                  console.log('gagal tukar USDC ke MATIC');
                }
              } else { console.log("=============  deposit ulang kayaknya ========= ")}   
              
              
           } catch (error) {
            console.log('gagal pinjam');
           }
           

          
        }




        console.log(" ");
      }

   
  } else {console.log('sepertinya aku tersesat')}


  let transferFee = 0.01
  
  console.log( 'transfer fee ==>> '+ transferFee)
  console.log('modal awal ==> '+ DelapanBelastoKoma(modalawal))


  return {status,rencanaReserve}
 

}

async function depositModal(saldoMoving){

  console.log('jumlah yang akan didepositkan  ==> '+ saldoMoving)

  //new DepositETH().deposit(parseFloat(saldoMoving));
  let nilaiNonString = parseFloat(saldoMoving) - 0.5

  console.log('jumlah yang akan didepositkan setelah dikurangi setengah  ==> '+ nilaiNonString)
  //new DepositETH().deposit(nilaiNonString);



}

async function main() {

  let saldoUSDC = await web3Helper.getUSDCBalance()

  console.log('saldo USDC tanpa Koma : '+ saldoUSDC )
  console.log('saldo USDC dengan Koma : '+ enamToKoma(saldoUSDC) )

   var saldoAwal =  await web3Helper.getMaticBalance();
   var modal = parseFloat(saldoAwal) - mainMatic
   console.log('modal raw  ===>'+ modal+ ' termasuk delapan belas digit di belakang koma')
   var modalKoma = modal.toString();
  // console.log('modal gua ===>'+ modal+ ' delapan belas digit di belakang koma')
   //console.log('modal gua ===>'+ DelapanBelastoFloat(modal) + ' delapan belas digit di belakang koma')
      
  // modalKoma = modalKoma.substring(0, modalKoma.length - 18) + "." + modalKoma.substring(1, modalKoma.length );
   console.log('modal gua ===>'+ DelapanBelastoKoma(modalKoma) + ' delapan belas digit di belakang koma yang dipisahkan pake function')
    //const web3Helper = new Web3Helper();
    const status = await web3Helper.getStatus();
    const roundData = await new PriceFeed().getLatestRoundData();
    const jumlahMatic =parseFloat(status.nilaiJaminan) / parseFloat(roundData.answer)
    
    console.log("===========================================");
    console.log(" ");
    console.log('nilai jaminan:', status.nilaiJaminan, 'nilai dollar dengan delapan digit dibelakang koma');
    console.log('jumlah MATIC yang didepositkan = ',jumlahMatic, ' MATIC')
    console.log(" ");
    console.log('nilai utang:', status.nilaiUtang);
    console.log('bisa ngutang lagi senilai :', status.allowanceUtang);
    console.log('perbandingan jaminan ke utang ===> '+ status.perbandinganJaminanUtang)
    console.log(" ");
    console.log('rasio utang ke deposit jika di sita berkisar ', status.rasioSita,'% dari nilai jaminan');
    console.log('rasio bisa Ngutang Maximum:', status.rasioNgutangMaximum,'% dari nilai jaminan');
    console.log('rasio Utang Saat Ini senilai', status.rasioUtangSaatIni,'% dari nilai jaminan');
    console.log(" ");
    console.log("===========================================");

    modalawal = modalKoma;
    let siap = await persiapan(modalKoma) // modalKoma akan menjadi variable referensi
    console.log('status persiapan => '+ siap.status + ' dengan rencana reserve senilai ==> '+ DelapanBelastoKoma(siap.rencanaReserve.toString()) + ' MATIC' )
    console.log('modal awal sebelum proses==> '+ DelapanBelastoKoma(modalawal)+ ' MATIC')
    //console.log('reserve senilai= '+ DelapanBelastoKoma(reserve)+ ' MATIC')
  }

 
  
  main();