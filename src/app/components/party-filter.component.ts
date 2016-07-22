import { Component, Output, EventEmitter } from '@angular/core';
import { partyFiltersActions } from '../reducers/partyFilterReducer';

@Component({
  selector: 'party-filter',
  templateUrl: 'party-filter.component.html'
})
export class PartyFilterComponent {
  public filters = [
    {friendly: 'All', action: partyFiltersActions.SHOW_ALL},
    {friendly: 'Attending', action: partyFiltersActions.SHOW_ATTENDING},
    {
      friendly: 'Attending with Guests',
      action: partyFiltersActions.SHOW_WITH_GUESTS
   }
  ];
  @Output() updateFilter: EventEmitter<string> = new EventEmitter<string>();
}
