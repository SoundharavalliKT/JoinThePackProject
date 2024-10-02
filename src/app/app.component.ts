import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projectDemo';
  constructor(private router: Router){ }

  ngOnInit(){
    // this.router.navigate(['/page1']);
    // this.router.navigate(['/page2']);
    // this.router.navigate(['/page3']);
  }

  goToPage1(){
    this.router.navigate(['/page1']);
  }
}
