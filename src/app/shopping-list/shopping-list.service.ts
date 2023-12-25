import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>()
    private ingredients: Ingredient[]=[
        new Ingredient('Apples', 5),
    new Ingredient('Oranges',10)];

    getIngredients(){
        return this.ingredients.slice();
    }
    addShoppingData(shoppingData:Ingredient){
        this.ingredients.push(shoppingData);
        this.ingredientsChanged.next(this.ingredients.slice())
      }
    addIngredientsToShoppingList(RecipeIngredients: Ingredient[]){
        this.ingredients.push(...RecipeIngredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}