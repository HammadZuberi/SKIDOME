import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements ControlValueAccessor {

  @Input() type ='text';
  @Input() label ='';

  constructor(@Self() private controlDir:NgControl){
this.controlDir.valueAccessor=this;
  }
  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

  get control():FormControl{

    return this.controlDir.control as FormControl; 
  }
}
