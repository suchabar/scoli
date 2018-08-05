import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APPCONFIG } from '../entity/config';
import { Child } from '../entity/Child';
import { Injectable } from '@angular/core';

@Injectable()
export class ChildService {
  private baseUrl = APPCONFIG.API_URL;

  constructor(private http: HttpClient) {
  }

  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  createChild(child: Child): Observable<Child> {
    return this.http.post<Child>(this.baseUrl + '/child', JSON.stringify(child), {headers: this.getHttpHeaders()});
  }

  updateChild(child: Child): Observable<Child> {
    return this.http.put<Child>(this.baseUrl + '/child/' + child.id, JSON.stringify(child), {headers: this.getHttpHeaders()});
  }

  deleteChild(id: string): Observable<any> {
    return this.http.delete<Child>(this.baseUrl + '/child/' + id, {headers: this.getHttpHeaders()});
  }

  getChild(id: string): Observable<any> {
    console.log(this.baseUrl + '/child/' + id);
    return this.http.get<Child>(this.baseUrl + '/child/' + id, {headers: this.getHttpHeaders()});
  }
}
