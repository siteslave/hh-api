import * as Knex from 'knex';

export class UserModel {

  saveUser(db: Knex, data: any) {
    return db('register')
      .insert(data);
  }

}