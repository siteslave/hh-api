import * as express from 'express';
import { Router, Request, Response } from 'express';
import { Jwt } from '../models/jwt';

import { UserModel } from '../models/user';

import * as HttpStatus from 'http-status-codes';
import { NextFunction } from 'connect';

const jwt = new Jwt();
const userModel = new UserModel();

const router: Router = Router();

// localhost:3000/user/save
router.post('/save', async (req: Request, res: Response) => {
  var pincode = req.body.pincode; // hn
  var telephone = req.body.telephone;
  var cid = req.body.cid;
  var emi = req.body.emi;

  if (pincode && telephone && cid) {
    try {
      var data: any = {};
      data.cid = cid;
      data.pincode = pincode;
      data.telephone = telephone;
      data.emi = emi;

      await userModel.saveUser(req.db, data);
      res.send({ ok: true });
    } catch (error) {
      console.log(error);
      res.send({ ok: false, message: error.message });
    }
  } else {
    res.send({ ok: false, message: 'ข้อมูลไม่ครบ' });
  }

});

// localhost:3000/user/login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  var pincode = req.body.pincode;
  var cid = req.body.cid;
  var deviceToken = req.body.deviceToken || null;

  if (pincode && cid) {
    try {
      var rs: any = await userModel.checkPincode(req.db, cid, pincode);
      if (rs.length) {
        var registerId = rs[0].register_id;

        var payload = {
          id: registerId
        }

        if (deviceToken) {
          await userModel.updateDeviceToken(req.db, cid, deviceToken);
        }

        var token = await jwt.sign(payload);
        res.send({ ok: true, token: token });

      } else {
        res.send({ ok: false, message: 'Login failed!' })
      }
    } catch (error) {
      res.send({ ok: false, message: error.message })
    }
  } else {
    res.send({ ok: false, message: 'ข้อมูลไม่ครบ' })
  }

});

export default router;