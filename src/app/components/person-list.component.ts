import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'person-list',
  templateUrl: 'person-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonListComponent {
  @Input() people;
  @Output() addGuest = new EventEmitter();
  @Output() removeGuest = new EventEmitter();
  @Output() removePerson = new EventEmitter();
  @Output() toggleAttending = new EventEmitter();
}
