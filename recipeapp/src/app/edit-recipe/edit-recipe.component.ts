import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/Recipe';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  id: number;
  name: string;
  difficulty: any;
  instruction: string;
  date: string;

  constructor(private route: ActivatedRoute, private service: RecipeServiceService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      params => {
        this.id = parseInt(params.get('recipeId'));
  });
}
onSubmit(form: any){
  
  this.service.updateRecipe(new Recipe(this.id, this.name, this.instruction, this.difficulty,
  this.date), console.log);

  alert("Recipe Edited")
  
}

editRecipe(){
  console.log()
}

}
