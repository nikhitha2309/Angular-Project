import { Component, NgModule } from "@angular/core"
import { Router, RouterModule, Routes } from "@angular/router"
import { HeaderComponent } from "./header/header.component"
import { RecipesComponent } from "./recipes/recipes.component"
import { ShoppingListComponent } from "./shopping-list/shopping-list.component"
import { AppComponent } from "./app.component"
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component"
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component"
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component"
import { RecipeResolverService } from "./recipes/recipes-resolver.service"

const appRoutes:Routes = [
    {path:'recipes', component: RecipesComponent , children:[
        {path:'',component: RecipeStartComponent , pathMatch:'full'},
        {path:'new',component:RecipeEditComponent },         
            {path:':id',component: RecipeDetailComponent,resolve:[RecipeResolverService]},
            {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService] }

    ]},
    {path:'shopping-list', component: ShoppingListComponent},
    {path:'',redirectTo:'/recipes',pathMatch:'full'},

]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}