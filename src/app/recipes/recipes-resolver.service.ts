import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn:'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService : DataStorageService, 
        private recipeService: RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.recipeService.getRecipesArray().length != 0){
            return this.recipeService.getRecipesArray();
        }
        return this.dataStorageService.fetchRecipes();
    }
}