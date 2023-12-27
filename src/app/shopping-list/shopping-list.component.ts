import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit,OnDestroy {
      ingredients: Ingredient[];
      ingredientsChangesSub: Subscription
      constructor(private shoppingListService: ShoppingListService){
      }
      ngOnInit(): void {
        this.ingredients = this.shoppingListService.getIngredients();
        this.ingredientsChangesSub=this.shoppingListService.ingredientsChanged.subscribe(
          (ingredients: Ingredient[]) => {
            this.ingredients = ingredients
          }
        );
      }
      ngOnDestroy(): void {
        this.ingredientsChangesSub.unsubscribe();
      }

      onEditItem(i:number){
        this.shoppingListService.startedEditing.next(i);
      }

     
    
}
