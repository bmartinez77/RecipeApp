import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  hostname = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  public getRecipes(callback: any){
    this.http.get<Recipe[]>(this.hostname + "/recipes")
    .subscribe((data) => {
      let recipes: Recipe[] = [];
      for(let x = 0; x < data.length; x++) {
        recipes.push(new Recipe(data[x]['id'], data[x]['name'],data[x]['instructions'], data[x]['difficulty'], data[x]['date']));
      }
      callback(recipes);
    })
  }

  public getRecipe(id: number, callback: any){
    this.http.get<Recipe>(this.hostname + "/recipe/" + id)
    .subscribe((data) => {
      let recipe: Recipe = new Recipe(data['id'], data['name'],data['instructions'], data['difficulty'], data['date']);

      callback(recipe);
    })

  }

  public createRecipe(recipe: Recipe, callback: any) {
    // Add a new Album to the list of Albums
    this.http.post<Recipe>(this.hostname + "/recipes", recipe)
      .subscribe((data) => {
        callback(data);
      });
  }

  public updateRecipe(recipe: Recipe, callback: any) {
    // Search for the Album in the list of Albums and replace it in the list
    this.http.put<Recipe>(this.hostname + "/recipes", recipe)
      .subscribe((data) => {
        callback(data);
      });
  }

  public deleteRecipe(id: number, callback: any) {
    // Search for the Album in the list of Albums and delete from the list
    this.http.delete(this.hostname + "/recipes/" + id)
      .subscribe((data) => {
        callback(data);
      });

  }

}
