import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrl: './page3.component.scss'
})
export class Page3Component {
  public data: any={
    username : '',
    age: '',
    city: '',
    email: '',
    petName: '',
    petBreed: '',
    petAge:'',
    specifications:''
  };
  constructor(public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {     

  }  

  onSubmit(){
    if(this.data.username==''){
      this.snackBar.open('User Name should not be empty!','',{
        duration: 2000
      }); 
    }
    else if(this.data.email==''){
      this.snackBar.open('User Email should not be empty!','',{
        duration: 2000
      }); 
    }
    else if(this.data.petName==''){
      this.snackBar.open('Pet Name should not be empty!','',{
        duration: 2000
      }); 
    }
    else if(this.data.petBreed==''){
      this.snackBar.open('Pet Breed should not be empty!','',{
        duration: 2000
      }); 
    }
    else{
      console.log(this.data);
      this.snackBar.open('User Account successfully created # Happy Petting #','',{
        duration: 2000
      });
    }
  }

  goToPage2(){
    this.router.navigate(['/page2']);
  }
  
}
