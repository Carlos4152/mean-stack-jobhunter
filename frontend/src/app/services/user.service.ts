import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Registration } from '../Interfaces/register.interface';
import { Login, LoginResponse } from '../Interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //userUrl = 'https://job-hunter-api-acjc.onrender.com/user';  
  userUrl = 'https://mean-stack-jobhunter.vercel.app/user';  
  constructor(private httpClient: HttpClient) { }

  createUser(formValues: Registration): Observable<Registration> {
    return this.httpClient.post<Registration>(`${this.userUrl}/registration`, formValues)
  }

  login(formValues: Login): Observable<LoginResponse>{
    return  this.httpClient.post<LoginResponse>(`${this.userUrl}/login`, formValues);
  }

 




}
