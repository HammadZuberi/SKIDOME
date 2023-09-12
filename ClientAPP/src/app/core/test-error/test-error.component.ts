import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent {
validationerror: string [] =[];
  baseUrl = environment.apiUrl;
  constructor(private http : HttpClient){
    
  }
  
  get404Error(){

    this.http.get(this.baseUrl+'products/43').subscribe({
      next: response => { console.log(response);},
      error : e=> console.error(e)
      
    })
  }
  
  get500Error(){

    this.http.get(this.baseUrl+'buggy/servererror').subscribe({
      next: response => { console.log(response);},
      error : e=> console.error(e)
      
    })
  }
  
  get400Error(){

    this.http.get(this.baseUrl+'buggy/badrequest').subscribe({
      next: response => { console.log(response);},
      error : e=> console.error(e)
      
    })
  }

  get400ValidationError(){

    this.http.get(this.baseUrl+'products/fortytwo').subscribe({
      next: response => { console.log(response);},
      error : e=> {console.error(e); this.validationerror= e.errors;}
      
      });
      
    }
  }

