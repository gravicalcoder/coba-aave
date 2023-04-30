function DelapanBelastoKoma(num){
    let count = num.length;
  
    if (count == 18) {
     
     // let result = "0." + num.substring(1);
     let result = "0." + num;
      //console.log(result);
      return result
    } else if (count < 18) {
     
      let zeros = '0'.repeat(18 - count);
      let str = zeros + num;
      const newStr = '0.' + str;
      //console.log(newStr);
      return newStr
    } else {
        let result = num.substring(0, count - 18) + "." + num.substring(count - 18);
        return result;

    }
  }
  
 console.log(DelapanBelastoKoma('12345678901234567898989'));
  