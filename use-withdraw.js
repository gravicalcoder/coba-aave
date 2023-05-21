const Withdrawal = require('./withdraw-class.js');

new Withdrawal(3.01).withdraw();
var number = 7.9

/*
async function withdrawUntilSuccess() {
    while (true) {
      try {
        const withdrawal = new Withdrawal(number);
        await withdrawal.withdraw();
        console.log('Withdrawal successful!');
        break; // Exit the loop if the withdrawal was successful
      } catch (error) {
        console.error('Withdrawal failed:', error);
        // Wait for a few seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
  
  withdrawUntilSuccess();

  */
