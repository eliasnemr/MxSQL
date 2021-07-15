import { MinimaService } from './../services/minima.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonTextarea } from '@ionic/angular';
import { SqlCallBackResponse } from 'minima';

interface QueryResponse {
  status?: boolean;
  message?: string;
  error?: boolean;
  rows?: any[];
  results?: boolean;
  json?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('queryTextArea', {static: false}) queryTextArea: IonTextarea;
  queryForm: FormGroup;
  queryResponse: QueryResponse;

  constructor(private formBuilder: FormBuilder, private mService: MinimaService) {
    this.queryResponse = { status: false };
  }

  ngOnInit() {
    // this.queryResponse.status = false;
    this.queryForm = this.formBuilder.group({
      query: ['SELECT * FROM txpowlist']
    });
  }

  async runQuery(_q: string) {
    // console.log(_q);
    const res: SqlCallBackResponse | string = await this.mService.sql(_q);
    // console.log(res);
    if (typeof res === 'string') {
      /* We have a response, set to true */
      this.queryResponse.status = true;
      /* Assign error message */
      this.queryResponse.message = res;
      /* Set error to true */
      this.queryResponse.error = true;
      /* Set JSON */
      this.queryResponse.json = '';
    } else if (typeof res === 'object') {
      /** Any row data? */
      if (!res.response.results) {
      /* We have a response, set to true */
      this.queryResponse.status = true;
      /* Assign response message */
      this.queryResponse.message = JSON.stringify(res.response.status);
      /* Set error to true */
      this.queryResponse.error = false;
      /* Set JSON */
      this.queryResponse.json = JSON.stringify(res);
      } else if (res.response.results) {
        /* We have a response, set to true */
        this.queryResponse.status = true;
        /* Assign data */
        this.queryResponse.rows = res.response.rows;
        /* Set error to true */
        this.queryResponse.error = false;
        /* Set results to true */
        this.queryResponse.results = true;
        /* Set row count */
        this.queryResponse.message = 'Rows found: ' + res.response.count;
        /* Set JSON */
        this.queryResponse.json = JSON.stringify(res);
      }
    }
  }
  get query() {
    return this.queryForm.get('query');
  }
}
