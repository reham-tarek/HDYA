import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
// import {} from '@';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient ) { }
  // createAuthorizationHeader(headers: Headers) {
  //   headers.append('Authorization', 'Basic ' +
  //     btoa('username:password')); 
  // }

  login(email:string,password:string):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/auth/token/login/` , {email:email , password : password})
  }

  register( username:string,email:string , password:string ,re_password:string, first_name:string , last_name:string  , mobile:string ):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/auth/users/` , { username:username, email:email , password : password , re_password : re_password , first_name:first_name , last_name:last_name , mobile:mobile})
  }


  logout() {

    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post(`${environment.apiUrl}/auth/token/logout/`,{}, requestOptions);

  }


  userProfile():Observable<any>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any>(`${environment.apiUrl}/auth/users/me/`, requestOptions)
  }

}
