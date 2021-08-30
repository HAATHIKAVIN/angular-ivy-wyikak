import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { PostService } from './post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  namesearch :string = '';
  loadedposts  = [];
  isfetching = false;
  error = null;

  alert : boolean = false;
  private errorSub :  Subscription;

constructor( private http : HttpClient , private postservice : PostService,private authservice : AuthService ){

}  
ngOnInit(){
  this.errorSub =  this.postservice.error.subscribe(errormessage =>{
     this.error = errormessage;
   });
 
 }  
 onfetchposts(){
  this.isfetching = true;
  this.postservice.fetchpost().subscribe(posts =>{
    this.isfetching = false;
  this.loadedposts =posts;
  },error =>{
    this.isfetching= false;
     this.error = error.message;
     console.log(error);
  });
}

onclearposts(){
  if(confirm('Are you sure want to Clear Employee Table')){
  this.postservice.ondeletepost().subscribe(()=>{
    this.loadedposts =[];
    this.alert=true;
  })
  }
}
ngOnDestroy(){
  this.errorSub.unsubscribe();
}
onHandleError(){
  this.error=null;
}
ondeletepost(id){
  if(confirm('Are you sure want to Delete Employee Details')){
     console.log('https://simsangular-default-rtdb.asia-southeast1.firebasedatabase.app/post/'+id+'.json')
    this.http.delete('https://simsangular-default-rtdb.asia-southeast1.firebasedatabase.app/post/'+id+'.json').subscribe(()=>{
            this.onfetchposts();
    })
  }
  // this.loadedposts.splice(post.Empid,1);
  // this.postservice.deletepost(post.Empid).subscribe((result)=>{
  //       console.log(result);
  // })
  // this.alert=true; 
}
closealert(){
  this.alert=false;
}
oneditpost(id,index){
    // console.log(this.loadedposts[index]);
    // // this.form.setValue({
    // //   Empid: this.loadedposts[index].Empid,
    // //   Empname : this.loadedposts[index].Empname,
    // //   Empage : this.loadedposts[index].Empage,
    // //   Empaddress :this.loadedposts[index].Empaddress,
    // //   Emppincode : this.loadedposts[index].Emppincode,
    // //   Comment : this.loadedposts[index].Comment
    // // })
    // this.http.get('https://simsangular-default-rtdb.asia-southeast1.firebasedatabase.app/post/'+id+'.json')
}
}