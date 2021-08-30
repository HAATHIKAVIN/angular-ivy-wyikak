import { Component, OnInit, ViewChild } from '@angular/core';
import { post } from './post.model';
import { PostService } from './post.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  submitted = false;
  @ViewChild('postForm') form : NgForm;
  Empaddresses = ['SELECT','TamilNadu','AndhraPradesh','Karnataka','Kerala','Goa','MadhyaPradesh','WestBengal','Delhi'];
defaultoption = 'SELECT';
  loadedposts : post[] =  [];
  alert :boolean = false;

constructor(  private postservice : PostService){
}  

ngOnInit(){

}  

oncreatepost(postdata : post ){
  if(confirm('Are you sure want to Submit Form'))
  {
  this.postservice.createandstorepost(postdata.Empid,postdata.Empname,postdata.Empage,postdata.Empaddress,postdata.Emppincode,postdata.Comment)
  }
  this.alert = true;
  this.submitted = true;
  this.form.reset();
  this.submitted = false;
}
closealert(){
   this.alert = false;
}
onReset(){
 
}
}




