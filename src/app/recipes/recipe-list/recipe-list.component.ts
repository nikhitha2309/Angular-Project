import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output()
  sendDataToRecipeDetail = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("test Recipe1",'this a test recipe','https://www.budgetbytes.com/wp-content/uploads/2013/07/How-to-Calculate-Recipe-Costs-H.jpg'),
    new Recipe("test Recipe2",'this a test recipe2','https://www.budgetbytes.com/wp-content/uploads/2013/07/How-to-Calculate-Recipe-Costs-H.jpg')

  ];

  loadRecipeDeatils(recipe: Recipe){
    this.sendDataToRecipeDetail.emit(recipe);
  }

}
