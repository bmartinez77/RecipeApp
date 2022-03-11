import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { ListRecipeComponent } from './list-recipe/list-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { DisplayRecipeComponent } from './display-recipe/display-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    EditRecipeComponent,
    CreateRecipeComponent,
    ListRecipeComponent,
    DeleteRecipeComponent,
    DisplayRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
