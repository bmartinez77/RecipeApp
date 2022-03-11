import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/Recipe';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-display-recipe',
  templateUrl: './display-recipe.component.html',
  styleUrls: ['./display-recipe.component.css']
})
export class DisplayRecipeComponent implements OnInit {
  @Input()
  recipe: Recipe;
  
  constructor(private route: ActivatedRoute, private service: RecipeServiceService ) { }


  ngOnInit(): void {
    console.log(this.recipe.Name+ " " + this.recipe.Id)
  }

}
