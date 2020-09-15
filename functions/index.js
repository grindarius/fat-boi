'use strict';

const functions = require('firebase-functions');

function getRandom(min, max) {Math.floor(Math.random() * (max - min)) + min;}

const {WebhookClient, Payload} = require('dialogflow-fulfillment');

const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://thomas-the-bus.firebaseio.com"
});

const db = admin.firestore();

/* this function is made to get current bus position and the whole firebase array
then compute the position of the bus backwards. if they find the bus. return that bus 
if not, return something like i don't find it
*/


process.env.DEBUG = 'dialogflow:debug';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({request, response});
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function selectBusRoute(agent) {
    const codegot = request.body.queryResult.parameters.number;

    var currentBusPosition = '';
    var docNumber = 0;
    var pplAmt = 0;

    //determining if the input is whether red bus or blue or yellow.
    if (codegot >= 100 && codegot <= 121) {
      docNumber = Math.floor(Math.random() * (121 - 100)) + 100;
      pplAmt = Math.floor(Math.random() * (50 - 0)) + 0;
      return db.collection('busRed').doc(String(docNumber)).get().then(snapshot => {
        currentBusPosition = snapshot.data().name;
        if (docNumber > codegot) {
          return agent.add(`รถบัสผ่านคุณไปแล้ว! อยู่ที่ ${currentBusPosition} พร้อมกับคน ${pplAmt} คนบนรถ`);
        } 
        else {
          return agent.add(`รถบัสกำลังมาถึงคุณ! อยู่ที่ ${currentBusPosition} พร้อมกับคน ${pplAmt} คนบนรถ`);
        }
      }).catch(err => {console.log(err)});
    }

    else if (codegot >= 200 && codegot <= 222) {
      docNumber = Math.floor(Math.random() * (122 - 100)) + 100;
      pplAmt = Math.floor(Math.random() * (50 - 0)) + 0;
      return db.collection('busYellow').doc(String(docNumber)).get().then(snapshot => {
        currentBusPosition = snapshot.data().name;
        if (docNumber + 100 > codegot) {
          return agent.add(`รถบัสผ่านคุณไปแล้ว! อยู่ที่ ${currentBusPosition} พร้อมกับคน ${pplAmt} คนบนรถ`);
        }
        else {
          return agent.add(`รถบัสกำลังมาถึงคุณ! อยู่ที่ ${currentBusPosition} พร้อมกับคน ${pplAmt} คนบนรถ`);
        }
      }).catch(err => {console.log(err)});
    }

    else if (codegot >= 300 && codegot <= 301) {
      docNumber = Math.floor(Math.random() * (991 - 990)) + 990;
      pplAmt = Math.floor(Math.random() * (50 - 0)) + 0;
      return db.collection('busBlue').doc(String(docNumber)).get().then(snapshot => {
        currentBusPosition = snapshot.data().name;
        if (docNumber === codegot + 660) {
          return agent.add(`รถบัสผ่านคุณไปแล้ว! อยู่ที่ ${currentBusPosition} พร้อมกับคน ${pplAmt} คนบนรถ`);
        }
        else {
          return agent.add(`รถบัสกำลังมาถึงคุณ! อยู่ที่ ${currentBusPosition} พร้อมกับคน ${pplAmt} คนบนรถ`);
        }
      }).catch(err => {console.log(err)});
    }

    else {
      return agent.add(`เราไม่ทราบว่าท่านกำลังพูดถึงจุดไหน`);
    }
  }

  function showPromotion(agent) {
    let temp = {
      "type": "sticker",
      "stickerId": "51626519",
      "packageId": "11538"
    }
    let toReturn = new Payload(agent.LINE, temp, {sendAsMessage: true});
    agent.add(toReturn);
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('SelectBusRoute', selectBusRoute);
  intentMap.set('showPromotion', showPromotion);
  return agent.handleRequest(intentMap);
});