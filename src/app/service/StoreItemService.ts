import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APPCONFIG } from '../entity/config';
import { StoreItem } from '../entity/StoreItem';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreItemService {
  private baseUrl = APPCONFIG.API_URL;

  constructor(private http: HttpClient) {
  }

  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  createStoreItem(storeItem: StoreItem): Observable<StoreItem> {
    return this.http.post<StoreItem>(this.baseUrl + '/storeItem', JSON.stringify(storeItem), {headers: this.getHttpHeaders()});
  }

  // updateStoreItem(storeItem: StoreItem): Observable<StoreItem> {
  //   return this.http.put<StoreItem>(this.baseUrl + '/storeItem/' + storeItem.id, JSON.stringify(storeItem), {headers: this.getHttpHeaders()});
  // }

  deleteStoreItem(id: string): Observable<any> {
    return this.http.delete<StoreItem>(this.baseUrl + '/storeItem/' + id, {headers: this.getHttpHeaders()});
  }

  getStoreItem(id: string): Observable<StoreItem> {
    return this.http.get<StoreItem>(this.baseUrl + '/storeItem/' + id, {headers: this.getHttpHeaders()});
  }
}
