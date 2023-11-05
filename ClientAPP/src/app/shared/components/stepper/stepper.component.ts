import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper {
  @Input() linerModeSelected = true;

  ngOnInit(): void {
    this.linear = this.linerModeSelected;
  }

  OnClick(index: number) {
    this.selectedIndex = index;
  }
}
