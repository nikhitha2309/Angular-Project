import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>()

    // private recipes: Recipe[] = [
    //     new Recipe("test Recipe1",'this a test recipe','https://www.budgetbytes.com/wp-content/uploads/2013/07/How-to-Calculate-Recipe-Costs-H.jpg',
    //     [new Ingredient("french fries" , 15) , new Ingredient("bun",1)]),
    //     new Recipe("test Recipe2",'this a test recipe2','https://www.budgetbytes.com/wp-content/uploads/2013/07/How-to-Calculate-Recipe-Costs-H.jpg',
    //     [new Ingredient("I2" , 3)])  
    //   ];

      private recipes: Recipe[] = [];
    
    getRecipesArray(){
        return this.recipes.slice();
    }
    getRecipesByIndex(i: number){
        return this.recipes[i];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }
    editRecipe(index:number,recipe:Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice())

    }

    deleteRecipe(index : number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice())

    }
    setRecipes(recipes : Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }
}