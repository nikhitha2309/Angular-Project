import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

@Injectable({
    providedIn:'root'
})
export class DataStorageService{
    constructor(private http: HttpClient,
        private recipeService : RecipeService,
        private authService : AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipesArray();
        this.http.put('https://angular-course-project-912c3-default-rtdb.firebaseio.com/recipes.json',
        recipes).subscribe(
            response => {
                console.log(response)
            }
        )
    }

    fetchRecipes(){
            console.log("entered fetch recipes")
            return this.http.get<Recipe[]>
            ('https://angular-course-project-912c3-default-rtdb.firebaseio.com/recipes.json',
            ).pipe(map(
            recipes => {
                return recipes.map(recipe => {
                    return {...recipe,ingredients:recipe.ingredients ? recipe.ingredients: []
                     }
                });
            
            }),tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }))
        
        
    }

}