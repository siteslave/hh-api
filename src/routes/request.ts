/// <reference path="../../typings.d.ts" />

import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';

import * as express from 'express';
import { Router, Request, Response } from 'express';

import { RequestModel } from '../models/request';

const requestModel = new RequestModel();
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    var rs: any = await requestModel.getRequest(req.db);
    res.send({ ok: true, rows: rs });
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

  try {
    await requestModel.saveRequest(req.db, data);
    req.mqttClient.publish('request/notify', 'new request', { qos: 0, retain: false });
    res.send({ ok: true, code: HttpStatus.OK });
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.OK });
  }

});

export default router;