import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { post } from "./post.model";
import { Subject, throwError } from "rxjs";

@Injectable({providedIn : 'root'})
export class PostService{
  error = new Subject<string>();

    constructor( private http : HttpClient ){
    }

    createandstorepost( Empid : string, Empname : string, Empage : string, Empaddress : string, Emppincode : string, Comment : string)
    {
       const postdata  : post = {Empid : Empid,Empname: Empname,Empage:Empage,Empaddress : Empaddress,Emppincode : Emppincode,Comment : Comment}
       this.http.post<{[name : string] : post }>('https://simsangular-default-rtdb.asia-southeast1.firebasedatabase.app/post.json',postdata).subscribe(responseData => {
         
        console.log(responseData)
     },error=>{
       this.error.next(error.message);
     });
     
    }   
}