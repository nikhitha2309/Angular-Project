import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>()
    startedEditing = new Subject<number>()

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
    addShoppingDataAtIndex(shoppingData:Ingredient,index:number){
        this.ingredients[index] = shoppingData;
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    deleteShoppingData(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
       
    }

}