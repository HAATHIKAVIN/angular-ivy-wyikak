import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { send } from './send.model';

@Injectable({providedIn : 'root'})
export class SendService {
  error = new Subject<string>();
  constructor(private http : HttpClient) { }
    
sendemail( Empname : string, PhoneNumber : string, Query : string)
{
   const senddata  : send = {Empname : Empname,PhoneNumber :PhoneNumber,
    Query:Query }
   this.http.post<{[name : string] : send }>('https://simsangular-default-rtdb.asia-southeast1.firebasedatabase.app/emai.json',senddata).subscribe(responseData => {
     
    console.log(responseData)
 },error=>{
   this.error.next(error.message);
 });
 
}   
}