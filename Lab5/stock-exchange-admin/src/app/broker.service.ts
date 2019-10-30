import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Broker } from './broker';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
}) 
export class BrokerService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private apiUrl = 'http://localhost:8888/brokers';
  constructor(
    private http: HttpClient) { }

  getBrokers(): Observable<Broker[]>{
    return this.http.get<Broker[]>(this.apiUrl);
  }

  getBroker<Data>(name: string): Observable<Broker> {
    const url = `${this.apiUrl}/${name}`;
    return this.http.get<Broker>(url);
  }

  addBroker (broker: Broker): Observable<Broker[]> {
    return this.http.post<Broker[]>(this.apiUrl, broker, this.httpOptions);
  }

  deleteBroker (broker: Broker | string): Observable<Broker[]> {
    const name = typeof broker === 'string' ? broker : broker.name;
    return this.http.delete<Broker[]>(this.apiUrl+"/"+name, this.httpOptions);
  }

  updateBroker (broker: Broker): Observable<any> {
    return this.http.put(this.apiUrl, broker, this.httpOptions);
  }

}
