var gcm = require('node-gcm');

var sender = new gcm.Sender('AAAAXRONlJI:APA91bHwhQfsoiWOxrScgihGcHlG6OcCWhOalyL0ubltQH4Gbde7RKmzzaTy4FE5DcJfkmgLuryc3qUPAFhN0mBRExkf1rE5mk7jp4EfcRtpGk62ANlXr0jKjQIkaIrhl6JnBbsOQBIK');

var message = new gcm.Message({
  contentAvailable: true,
  notification: {
    sound: 'default',
    title: "สวัสดี",
    body: "ทดสอบส่ง PushNotify"
  },
  data: { key1: 'msg1' }
});

var regTokens = ['cRotaWTpir4:APA91bGa17q7FNt4zpNkN7jmRwV6T1h_CQsDFtzRetHvYuPxRnBDpMw7Qar3ccvLnGqbEdVPD8N7DUqi0gleKTlf4GzhwPkhBP-6ANoiBxhXN6YyagbWroqZgJOAnCDcbp2wHHNaYRvj'];

sender.send(message, { registrationTokens: regTokens }, function (err, response) {
  if (err) console.error(err);
  else console.log(response);
});