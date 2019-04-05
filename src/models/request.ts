import * as Knex from 'knex';

export class RequestModel {

  saveRequest(db: Knex, data: any) {
    return db('request')
      .insert(data);
  }

  getRequestStatus(db: Knex, registerId: any) {
    return db('request')
      .where('register_id', registerId)
      .orderBy('request_id', 'DESC')
      .limit(1);
  }

  updateStatus(db: Knex, requestId: any, status: any) {
    return db('request')
      .where('request_id', requestId)
      .update({ status: status });
  }

  updateLatLng(db: Knex, requestId: any, data: any) {
    return db('request')
      .where('request_id', requestId)
      .update(data);
  }

  getRequest(db: Knex) {
    return db('request as r')
      .select(
        'r.request_date',
        'r.request_time',
        'r.status',
        'r.symptom',
        'r.request_id',
        'r.register_id',
        'r.lat',
        'r.lng',
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