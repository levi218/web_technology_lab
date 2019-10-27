import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from './settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private apiUrl = 'http://localhost:3000/settings';
  constructor(private http: HttpClient) { }
    
  getSettings(): Observable<Settings>{
    return this.http.get<Settings>(this.apiUrl);
  }

  updateStock (settings: Settings): Observable<any> {
    return this.http.put(this.apiUrl, settings, this.httpOptions);
  }
}
