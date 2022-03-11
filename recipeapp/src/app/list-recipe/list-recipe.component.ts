import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/Recipe';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.css']
})
export class ListRecipeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: RecipeServiceService) { }

  selectedRecipe: Recipe;
  recipes: Recipe[] =[ ];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.service.getRecipes((recipes:Recipe[]) =>
      {
          this.recipes = recipes;
      });
    });
  }
  
  onSelectedRecipe(recipe: Recipe){
    this.selectedRecipe = recipe
    
  }

}
