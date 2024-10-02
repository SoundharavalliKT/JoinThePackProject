import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss'
})

export class Page2Component {

  public srcUrl = "https://dog.ceo/api/breeds/image/random";
  public srcArr: any[]=[];
  
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {     
    for(let i=0;i<10;i++){
      this.http.get<any>(this.srcUrl).subscribe(data => {
        //console.log(data.message);
        this.srcArr.push(data.message);
      });
    }
  }  

  goToPage3(){
    this.router.navigate(['/page3']);
  }

}
