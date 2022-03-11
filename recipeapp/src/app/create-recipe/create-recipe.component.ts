import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/Recipe';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: RecipeServiceService) { }
  id: number;
  name: string;
  difficulty: any;
  instruction: string;
  date: any;

  ngOnInit(): void {
    // this.service.createRecipe(new Recipe(0, this.name, this.instruction, this.difficulty, this.date), console.log);
    // console.log("Album Created");

  }

  onSubmit(form: any){
    // this.selectedAlbum.Tracks = this.tracks;
    this.service.createRecipe(new Recipe(0, this.name, this.instruction, this.difficulty,
      this.date), console.log);

    alert("Album Created")
    
  }

  createRecipe() {
    console.log("Create album");
  }
}
