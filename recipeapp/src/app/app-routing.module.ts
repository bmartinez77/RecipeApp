import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayRecipeComponent } from './display-recipe/display-recipe.component';
import { ListRecipeComponent } from './list-recipe/list-recipe.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';


const routes: Routes = [
{ path: 'create', component: CreateRecipeComponent },
{ path: 'list-recipe', component: ListRecipeComponent },
{ path: 'display/:id', component: DisplayRecipeComponent },
{ path: 'edit/:recipeId', component: EditRecipeComponent },
{ path: 'delete/:recipeId', component: DeleteRecipeComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
