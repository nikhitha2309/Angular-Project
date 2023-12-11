import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputValue: ElementRef;
  @ViewChild('amountInput') amountInputValue: ElementRef;
  @Output()
  shoppingDataAdded = new EventEmitter<Ingredient>();
  addShoppingData(){  
      this.shoppingDataAdded.emit(new Ingredient(this.nameInputValue.nativeElement.value,this.amountInputValue.nativeElement.value));
      this.nameInputValue.nativeElement.value='';
      this.amountInputValue.nativeElement.value='';

  }
}
