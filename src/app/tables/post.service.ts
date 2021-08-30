import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { post } from "./post.model";
import {catchError, map} from 'rxjs/operators'
import { BehaviorSubject, Subject, throwError } from "rxjs";

@Injectable({providedIn : 'root'})
export class PostService{
  error = new Subject<string>();
  post = new BehaviorSubject<post>(null);
constructor( private http : HttpClient ){
    }
  
    fetchpost(){
      return this.http.get<{[key : string] : post }>('https://simsangular-default-rtdb.asia-southeast1.firebasedatabase.app/post.json')
       .pipe(map(responseData=>{
           const postsArray : post[]= [];
          for( const key in responseData){
            if( responseData.hasOwnProperty(key) ){
                  postsArray.push({...responseData[key],id : key})
            }
          }
          return postsArray;
         }),catchError(errorRes =>{
              return throwError(errorRes);
         })
         
         );
     }
 
     ondeletepost(){
       return this.http.delete('https://simsangular-default-rtdb.asia-southeast1.firebasedatabase.app/post.json')
     }
     deletepost(){
      // return this.http.delete(`${'https://simsangular-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json/'}/${i}`)
    }
     }
   
 