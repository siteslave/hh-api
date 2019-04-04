import * as Knex from 'knex';

export class UserModel {

  saveUser(db: Knex, data: any) {
    return db('register')
      .insert(data);
  }

  updateDeviceToken(db: Knex, cid: any, deviceToken: any) {
    return db('register')
      .where('cid', cid)
      .update({
        device_token: deviceToken
      });
  }

  checkPincode(db: Knex, cid: any, pincode: any) {
    return db('register')
      .where('cid', cid)
      .where('pincode', pincode);
  }

  getDeviceToken(db: Knex, registerId: any) {
    return db('register')
      .select('device_token')
      .where('register_id', registerId);
  }

}