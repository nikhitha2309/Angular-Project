import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  @ViewChild('f') shoppingDataForm: NgForm;
  subscription: Subscription;
  constructor(private shoppingListService : ShoppingListService){}
  editMode = false;
  editedItemIndex: number;
  itemEdited:Ingredient;
  
  addShoppingData(){ 
    const nameContent  = this.shoppingDataForm.value.name;  
    const amountContent = this.shoppingDataForm.value.amount; 
      if(this.editMode){
        this.shoppingListService.addShoppingDataAtIndex
        (new Ingredient(nameContent,amountContent),
        this.editedItemIndex);
        this.editMode = false;
      }else{        
        this.shoppingListService.addShoppingData(
          new Ingredient(nameContent,amountContent)
        )
      }
     this.shoppingDataForm.reset();

  }

  onClear(){
    this.shoppingDataForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteShoppingData(this.editedItemIndex);
    this.shoppingDataForm.reset()
    this.editMode = false;
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number)=> {
        this.editMode = true;
        this.editedItemIndex = index;
         let itemEdited:Ingredient = this.shoppingListService.getIngredients()[index]
        this.shoppingDataForm.setValue({
          'name': itemEdited.name,
          'amount': itemEdited.amount
        })
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
