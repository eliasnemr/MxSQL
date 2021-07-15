import { Injectable } from '@angular/core';
import { Minima, SqlCallBackResponse } from 'minima';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinimaService {

  $nodeStatus: Subject<boolean>;

  constructor() {
    this.$nodeStatus = new ReplaySubject<boolean>(1);
    this.$nodeStatus.next(false);
    this.initMinima();
  }

  initMinima() {
    Minima.init((msg: any) => {
      if (msg.event === 'connected') {
        console.log('Minima is connected..');
        this.$nodeStatus.next(true);
      }
    });
  }
  sql(_query: string): Promise<SqlCallBackResponse | string> {
    try {
      return new Promise((resolve, reject) => {
        Minima.sql(_query, (res: SqlCallBackResponse) => {
          if (res.status) {
            if (res.response.status) {
              resolve(res);
            } else {
              resolve(res.response.message);
            }
          } else {
            reject('Sql status:' + res.status);
          }
        });
      });
    } catch(err) {
      Minima.log(err);
    }
  }
}
