import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id:number
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route : ActivatedRoute,
    private router:Router,
      private recipeService: RecipeService){}
  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null;
        this.initForm()
      }
    );
    
  }
  onSubmit(){

    let ingredients: Ingredient[] = [];
    for(let ingredient of this.recipeForm.value.ingredients){
      ingredients.push(new Ingredient(ingredient.name,ingredient.amount))
    }
    let recipe : Recipe = new Recipe(
      this.recipeForm.value.recipename,this.recipeForm.value.recipeDescription,
      this.recipeForm.value.path,ingredients
    )

    if(this.editMode){
      this.recipeService.editRecipe(this.id,recipe);
    }else{
      this.recipeService.addRecipe(recipe)
    }
    this.recipeForm.reset();
    this.navigateToRecipes();
  }
  onAddIngredient(){
    const control = new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount': new FormControl(null,[
        Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(control);  
  }

  initForm(){
    if(!this.editMode){
      this.recipeForm = new FormGroup({
        'recipename' : new FormControl(null,Validators.required),
        'recipeDescription' : new FormControl(null,Validators.required),
        'path': new FormControl(null,Validators.required),
        'ingredients' : new FormArray([]),

      });
    }else{
      let recipe: Recipe = this.recipeService.getRecipesByIndex(this.id);
      let recipeIngredients = new FormArray([]);
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name' : new FormControl(ingredient.name,Validators.required),
            'amount': new FormControl(ingredient.amount,[
              Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
      this.recipeForm = new FormGroup({
        'recipename' : new FormControl(recipe.name,Validators.required),
        'recipeDescription' : new FormControl(recipe.description,Validators.required),
        'path': new FormControl(recipe.imagePath,Validators.required),
        'ingredients': recipeIngredients

      });
    }
  }

  getIngredients(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  navigateToRecipes(){
      this.router.navigate(["../"],{relativeTo:this.route})
  }
  onCancel(){
    this.navigateToRecipes()
  }

  onDeleteIngredient(index:number){
     ( <FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
