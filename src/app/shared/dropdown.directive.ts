import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  isDropdownVisible : boolean = true;
  constructor(private elementRef: ElementRef , private renderer: Renderer2) { }
  @HostListener('click') onClickDropdown(){
    this.isDropdownVisible = !this.isDropdownVisible;
    if(this.isDropdownVisible){
      this.renderer.addClass(this.elementRef.nativeElement,"open");
    }else{
      this.renderer.removeClass(this.elementRef.nativeElement,"open");
    }
    
  }

}
