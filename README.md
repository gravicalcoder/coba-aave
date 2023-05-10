# coba-aave

this is my code to learn web3js and use it in polygon network using node js

some features is:

1. checking balance file:  balance.js  n\
    it checking MATIC balance and USDC balance in polygon network mainnet
    
    
2. checking matic price using chainlink.   file:  check-harga.js

3. sending MATIC token to another account.    file:  send-MATIC.js

4.sending USDC token to another account.  file : send-USDC.js

5. deposit MATIC to Aave lending protocol.  file :   deposit-5.js

6. borrow USDC from Aave borrowing protocol. file : borrow-token.js

7. repay USDC you borrow to Aave protocol. file : repay-token.js

8. withdraw MATIC from Aave lending protocol. file : withdraw.js

9. swap MATIC to USDC using uniswap protocol on polygon network.   file: swap-2.js

10. swapping USDC to MATIC using uniswap protocol on polygon network.  file : swap-USDC-MATIC.js   n\
     swapping USDC to matic require 2 step ==> swap USDC to WMATIC then to withdraw WMATIC to MATIC
     
11. checking status in Aave lending-borrowing protocol. file status-loan.js

12. creating wallet address and wallet private using node js.  file: create-account.js

13. tracking transaction using polygonscan account .  file : tracking/pake-api.js  n\
    replace "0xD065833450C9AB16C35BEe9377593800628fC29A" with your wallet address or wallet you want to track   n\
    repalce " 16I3FNUGNN1CBPG6Y9X835JYJ3D78N4RAZ" wityh your API key in polygonscan
    
14. sample contract containing simple database. file: deploy/database.sol  n\
      actually I deploy this in remix.ethereum.org   because my node js skill for deploying still fail XD
      
15. sample code interaction to intercat with database.sol and add data     file: deploy/setData.js

16. sample code interaction to intercat with database.sol and call data     file: deploy/interact.js






to use all file above write file named: .env   
contain:

WALLET_ADDRESS= "your 0x wallet adress"  n\
WALLET_SECRET= "your 0x secret key"

WALLET_ADDRESS2= "your another 0x wallet adress for reserve"  n\
WALLET_SECRE2T= "your another 0x secret keyaddress for reserve"

replace all address contain: "0xD065833450C9AB16C35BEe9377593800628fC29A"  with your public wallet address because address "0xD065833450C9AB16C35BEe9377593800628fC29A"  is mine whe I training to use code


all code interaction from point 1, 3-10     has simplified fuction with prefix  use-  with impleementation suffix  -class   for instance  use-balance.js    require file  balance-class.js   n\
then file  balance-class.js  require abi-check-balance.js  n\
all of this to make code short for using

some console log using indonesian because I'm indonesian and it help me to comprehend when testing code. feel free to edit it in your own cloned code if you using this
