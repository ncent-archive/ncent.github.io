import { OnInit, OnChanges, SimpleChanges } from '@angular/core';

export class LifecycleHooks implements OnInit, OnChanges {
  private inputs: Array<string> = [];
  private inputsReadyOnce = false;
  constructor() {
  }

  protected addInput(inputKey: string) {
    this.inputs.push(inputKey);
  }

  protected checkInputs(): boolean {
    let allInputsReady = true;
    if (!this.inputsReadyOnce) {

      this.inputs.map(input => {
        if ((!this.hasOwnProperty(input) || this[input] === undefined || this[input] === null)) {
          console.error('missing input: ' + input, this[input]);
          allInputsReady = false;
        }
      });

      this.inputsReadyOnce = allInputsReady;

      if (this.inputsReadyOnce) {
        this.onAllInputsReady();
      }
    }

    return allInputsReady;
  }

  public ngAfterViewInit(): void {
    if (!this.inputsReadyOnce) {
      this.checkInputs();
    }
  }

  public ngOnInit(): void {
  }

  public ngDoCheck(): void {
    if (!this.inputsReadyOnce) {
      this.checkInputs();
    }
  }

  public ngAfterContentChecked(): void {
    if (!this.inputsReadyOnce) {
      this.checkInputs();
    }
  }

  public ngAfterViewChecked(): void {
    if (!this.inputsReadyOnce) {
      this.checkInputs();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.inputsReadyOnce) {
      this.checkInputs();
    }
  }

  protected onAllInputsReady(): void {
    // TODO override
  }
}
