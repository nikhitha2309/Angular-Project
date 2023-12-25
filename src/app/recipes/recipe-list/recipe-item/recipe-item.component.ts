import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit {
  @Input("recipe")
  recipe:Recipe;
  @Input("index")
  i:number;

  constructor(private recipeService: RecipeService,
    private router: Router){}
  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipesByIndex(this.i);
  }

  
}
