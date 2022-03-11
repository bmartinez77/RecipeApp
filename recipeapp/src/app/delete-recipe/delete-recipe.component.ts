import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.css']
})
export class DeleteRecipeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: RecipeServiceService) { }
  recipeId: number;

  ngOnInit(): void {
   this.route.paramMap.subscribe(
     params => {
       this.recipeId = parseInt(params.get('recipeId'));
      // let id = params.get('id');
      // this.recipeId = parseInt(id);
      // console.log("ID = " + id)
    });
      this.service.deleteRecipe(this.recipeId, console.log);

  }

}
