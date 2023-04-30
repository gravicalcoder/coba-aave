/*
import 'whatwg-fetch';

fetch('https://api.polygonscan.com/api?module=account&action=balance&address=0xD065833450C9AB16C35BEe9377593800628fC29A&apikey=16I3FNUGNN1CBPG6Y9X835JYJ3D78N4RAZ')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));


  */

  let url = 'https://api.polygonscan.com/api?module=account&action=txlist&address=0xD065833450C9AB16C35BEe9377593800628fC29A&startblock=0&endblock=99999999&page=1&offset=25&sort=asc&apikey=16I3FNUGNN1CBPG6Y9X835JYJ3D78N4RAZ'


  let url2 = 'https://api.polygonscan.com/api?module=account&action=txlist&address=0xD065833450C9AB16C35BEe9377593800628fC29A&startblock=0&endblock=99999999&page=1&offset=25&sort=desc&apikey=16I3FNUGNN1CBPG6Y9X835JYJ3D78N4RAZ'
  
  
  
  const superagent = require('superagent');

superagent
  //.get('https://api.polygonscan.com/api?module=account&action=balance&address=0xD065833450C9AB16C35BEe9377593800628fC29A&apikey=16I3FNUGNN1CBPG6Y9X835JYJ3D78N4RAZ')
  .get(url2)
 // .query({param1: 'value1', param2: 'value2'})
  .end((err, res) => {
    if (err) {
      console.error(err);
    } else {
      //console.log(res.body);
      //console.log(res.body.result[0]);
      //console.log(res.body.result.length);
      console.log(res.body.result[23].functionName);
    }
  });

