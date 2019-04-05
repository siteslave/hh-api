/// <reference path="../../typings.d.ts" />

import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';

import * as express from 'express';
import { Router, Request, Response } from 'express';

import { RequestModel } from '../models/request';
import { UserModel } from '../models/user';

const userModel = new UserModel();
const requestModel = new RequestModel();
const router: Router = Router();

const gcm = require('node-gcm');

router.get('/', async (req: Request, res: Response) => {
  try {
    var rs: any = await requestModel.getRequest(req.db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, message: error.message });
  }
});

router.get('/status', async (req: Request, res: Response) => {
  try {
    var registerId = req.decoded.id;

    var rs: any = await requestModel.getRequestStatus(req.db, registerId);
    var status = rs.length ? rs[0].status : 0;

    res.send({ ok: true, status: status, registerId: registerId });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, message: error.message });
  }
});

// localhost:3000/request/status/1/8
router.put('/status/:registerId/:requestId', async (req: Request, res: Response) => {
  try {

    var sender = new gcm.Sender(process.env.FCM_KEY);

    var status = req.body.status;
    var registerId = req.params.registerId;
    var requestId = req.params.requestId;

    await requestModel.updateStatus(req.db, requestId, status);

    var statusMessage = status === '1' ? 'รอการตรวจสอบ'
      : status === '2' ? 'ตรวจสอบแล้ว'
        : status === '0' ? 'ถูกยกเลิก'
          : status === '5' ? 'เสร็จสิ้นการให้บริการ'
            : 'ไม่ทราบสถานะ';

    var message = new gcm.Message({
      contentAvailable: true,
      notification: {
        sound: 'default',
        title: "HELPING HAND",
        body: "คำขอของคุณอยู่ในสถานะ " + statusMessage
      }
    });

    var rs: any = await userModel.getDeviceToken(req.db, registerId);
    var deviceToken = rs.length ? rs[0].device_token : null;

    if (deviceToken) {
      var regTokens = [deviceToken];

      sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if (err) console.error(err);
        else console.log(response);
      });
    }

    var topic = `request/status/${registerId}`;
    req.mqttClient.publish(topic, 'update status', { qos: 0, retain: false });
    res.send({ ok: true });

  } catch (error) {
    console.log(error);
    res.send({ ok: false, message: error.message });
  }
});

// save new request
router.post('/', async (req: Request, res: Response) => {
  let symptom = req.body.symptom;
  let lat = req.body.lat;
  let lng = req.body.lng;

  let id = req.decoded.id;

  let requestDate = moment().format('YYYY-MM-DD');
  let requestTime = moment().format('HH:mm:ss');

  let data: any = {};
  data.symptom = symptom;
  data.lat = lat;
  data.lng = lng;
  data.register_id = id;
  data.request_date = requestDate;
  data.request_time = requestTime;
  data.status = 1;

  try {
    await requestModel.saveRequest(req.db, data);
    req.mqttClient.publish('request/notify', 'new request', { qos: 0, retain: false });
    res.send({ ok: true, code: HttpStatus.OK });
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.OK });
  }

});

// update request
router.post('/update-latlng', async (req: Request, res: Response) => {
  let lat = req.body.lat;
  let lng = req.body.lng;

  let registerId = req.decoded.id;

  let data: any = {};
  data.lat = lat;
  data.lng = lng;

  try {

    var rs: any = await requestModel.getRequestStatus(req.db, registerId);
    var requestId = rs.length ? rs[0].request_id : null;

    if (requestId) {
      await requestModel.updateLatLng(req.db, requestId, data);
      res.send({ ok: true, code: HttpStatus.OK });
    } else {
      res.send({ ok: false, message: 'ไม่พบรายการที่ต้องการอัปเดท' });
    }

  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.OK });
  }

});

export default router;