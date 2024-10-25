import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = "red";
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | undefined | null) {

    this._errors = value;
    console.log(this._errors)
    this.setErrorMessage();

  }

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.htmlElement = elementRef;
    this.htmlElement.nativeElement.innerHTML = "Hola mundo"
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }
  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = "";
      return;
    };

    const errors = Object.keys(this._errors);
    console.log(errors)
    if (errors.includes("required")) {
      this.htmlElement.nativeElement.innerText = "Este campo es requerido";
      return;
    }
    if (errors.includes("minlength")) {
      const min = this._errors!["minlength"]["requiredLength"];
      this.htmlElement.nativeElement.innerText = `Este campo requiere un numero minimo de ${min} caracteres`;
      return;
    }
    if (errors.includes("email")) {
      this.htmlElement.nativeElement.innerText = "Este campo debe ser un email";
      return;
    }


  }
}
