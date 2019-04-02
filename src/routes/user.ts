import * as express from 'express';
import { Router, Request, Response } from 'express';
import { Jwt } from '../models/jwt';

import { UserModel } from '../models/user';

import * as HttpStatus from 'http-status-codes';

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

export default router;