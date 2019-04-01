import * as Knex from 'knex';

declare module 'express' {
  interface Request {
    db: any;
    knex: Knex;
    decoded: any;
    mqttClient: any;
  }
}