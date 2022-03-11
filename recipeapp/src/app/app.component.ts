import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recipe Application';
  version = 3.0;

  constructor(private router: Router ){ }

  displayRecipeList() {
    console.log("In App Component");
    this.router.navigate(['list-recipe'], { queryParams: { data: new Date()} });
    }
    
  displayVersion(){
    alert("Version " + this.version);
  }
}
