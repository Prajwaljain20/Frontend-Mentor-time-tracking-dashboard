import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDataModel } from '../model/IDataModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<IDataModel[]> {
    return this.http.get(this.url) as Observable<IDataModel[]>;
  }
}
