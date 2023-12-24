import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputValue: ElementRef;
  @ViewChild('amountInput') amountInputValue: ElementRef;
  constructor(private shoppingListService : ShoppingListService){}
  addShoppingData(){  
      this.shoppingListService.addShoppingData(
        new Ingredient(this.nameInputValue.nativeElement.value,this.amountInputValue.nativeElement.value)
      )
      this.nameInputValue.nativeElement.value='';
      this.amountInputValue.nativeElement.value='';

  }
}
