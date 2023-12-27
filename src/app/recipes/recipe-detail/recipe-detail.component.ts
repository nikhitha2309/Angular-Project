import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  //@Input('recipeData')
  recipeDetails: Recipe;
  id:number
  constructor(private shoppingListService: ShoppingListService,
   private route : ActivatedRoute,
   private router: Router,
   private recipeService: RecipeService ){}
  addToShoppingListClick(){
    this.shoppingListService.addIngredientsToShoppingList(this.recipeDetails.ingredients);
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=> {
        this.id = +params['id']
        this.recipeDetails = this.recipeService.getRecipesByIndex(this.id);
      }
    )
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
