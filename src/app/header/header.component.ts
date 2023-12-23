import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html'
  })
export class HeaderComponent{
    @Output()
    clickedRecipes = new EventEmitter<{}>();
  @Output()
  clickedShoppingList = new EventEmitter<{}>();

  onRecepiesClick(){
    this.clickedRecipes.emit();
    
    
  }
  onShoppingListClick(){
    this.clickedShoppingList.emit();
  }
}