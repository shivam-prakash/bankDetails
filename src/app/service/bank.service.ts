import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { BankData } from '../models/bank-data';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BankService {
  readonly BaseURI = environment.BaseURI;

  constructor(private http: HttpClient) { }

  getBankDetails() {
    return this.http.get(this.BaseURI);
  }

}
