import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'person-input',
  templateUrl: 'person-input.component.html'
})
export class PersonInputComponent {
  @Output() addPerson = new EventEmitter();

  add(element: HTMLInputElement) {
    if (element.value.trim()) {
      this.addPerson.emit(element.value.trim());
      element.value = ''; // clear after creation
    }
  }
}
