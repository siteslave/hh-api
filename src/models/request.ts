import * as Knex from 'knex';

export class RequestModel {

  saveRequest(db: Knex, data: any) {
    return db('request')
      .insert(data);
  }

  getRequest(db: Knex) {
    return db('request as r')
      .select(
        'r.request_date',
        'r.request_time',
        'r.status',
        'r.symptom',
        'p.cid',
        'p.hn',
        'p.first_name',
        'p.last_name',
        'p.sex',
        'p.birthdate'
      )
      .innerJoin('register as rx', 'rx.register_id', 'r.register_id')
      .innerJoin('patient as p', 'p.cid', 'rx.cid')
      .orderByRaw('r.request_date, r.request_time DESC')
  }

}