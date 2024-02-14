import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { Application } from '../Interfaces/applications.interface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  userUrl = 'https://mean-stack-jobhunter.vercel.app/user/';
  boardDetails: Application[] = [];

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Application[]> {
    return this.httpClient.get<Application[]>(`${this.userUrl}applications`)
  }

  create(formValues: Application): Observable<Application>{
    return this.httpClient.post<Application>(`${this.userUrl}application`, formValues);
  }

  getById(appId: string): Observable<Application> {
      return this.httpClient.get<Application>(`${this.userUrl}/applications/${appId}`)
  }

  update(appId: string, formValues: Application): Observable<Application> {
    return this.httpClient.put<Application>(`${this.userUrl}/applications/${appId}`, formValues)
  }

  remove(appId: string): Observable<Application> {
    return this.httpClient.delete<Application>(`${this.userUrl}/application/${appId}`);
  }

 










}
