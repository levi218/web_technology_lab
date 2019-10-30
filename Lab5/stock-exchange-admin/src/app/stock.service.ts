import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private apiUrl = 'http://localhost:8888/stocks';
  constructor(private http: HttpClient) { }
    
  getStocks(): Observable<Stock[]>{
    return this.http.get<Stock[]>(this.apiUrl);
  }

  getStock<Data>(name: string): Observable<Stock> {
    const url = `${this.apiUrl}/${name}`;
    return this.http.get<Stock>(url);
  }

  addStock (Stock: Stock): Observable<Stock[]> {
    return this.http.post<Stock[]>(this.apiUrl, Stock, this.httpOptions);
  }

  deleteStock (stock: Stock | string): Observable<Stock[]> {
    const symbol = typeof stock === 'string' ? stock : stock.symbol;
    return this.http.delete<Stock[]>(this.apiUrl+"/"+symbol, this.httpOptions);
  }

  updateStock (Stock: Stock): Observable<any> {
    return this.http.put(this.apiUrl, Stock, this.httpOptions);
  }
}
