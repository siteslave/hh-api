import * as Knex from 'knex';

export class UserModel {

  saveUser(db: Knex, data: any) {
    return db('register')
      .insert(data);
  }

  checkPincode(db: Knex, cid: any, pincode: any) {
    return db('register')
      .where('cid', cid)
      .where('pincode', pincode);
  }

}