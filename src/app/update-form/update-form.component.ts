import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit  {
 
  Empaddresses = ['SELECT','TamilNadu','AndhraPradesh','Karnataka','Kerala','Goa','MadhyaPradesh','WestBengal','Delhi'];


  loadedposts : post[] =  [];
  alert :boolean = false;

  userForm = new FormGroup({
    Empid : new FormControl(''),
    Empname : new FormControl(''),
 Empage : new FormControl(''),
 Empaddress : new FormControl(''),
 Emppincode : new FormControl(''),
 Comment : new FormControl('')
});

constructor( private postservice : PostService, private route: ActivatedRoute,private router : Router){
}  

ngOnInit() : void{

      this.postservice.getCurrentData(this.route.snapshot.params.id).subscribe((result)=>{
         this.userForm = new FormGroup({
              Empid : new FormControl(result['Empid']),
              Empname : new FormControl(result['Empname']),
              Empage : new FormControl(result['Empage']),
              Empaddress : new FormControl(result['Empaddress']),
              Emppincode : new FormControl(result['Emppincode']),
              Comment : new FormControl(result['Comment'])
            });
      });
}  

closealert(){
   this.alert = false;
}
onFormSubmit(){
//   this.postservice.editData(this.route.snapshot.params.id , this.userForm.value).subscribe((result)=>{
//           console.log(result,'data updated Successfully')
// }
     if(confirm('Are you sure want to update Employee Details')){
      this.postservice.editData(this.route.snapshot.params.id,this.userForm.value).subscribe((result)=>{
        console.log(result,'data updated Successfully')
      })}
      this.router.navigate(['/Tables'])

}
}