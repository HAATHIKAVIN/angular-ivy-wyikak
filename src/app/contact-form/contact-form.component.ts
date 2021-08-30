import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { send } from './send.model';
import { SendService } from './send.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @ViewChild('postForm') form : NgForm;

   defaultoption ='haathikanchana99@gmail.com';

  constructor( private sendservice : SendService) { }
  submitted = false;
  ngOnInit() {
  }
  onsendemail( senddata : send ){
    if(confirm('Are you sure want to Send Email'))
  {
  this.sendservice.sendemail(senddata.Empname,senddata.PhoneNumber,senddata.Query)
  }
  this.submitted = true;
  this.form.reset();
  this.submitted = false;
  }
}