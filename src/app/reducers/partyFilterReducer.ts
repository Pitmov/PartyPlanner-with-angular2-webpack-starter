import { ActionReducer, Action } from '@ngrx/store';

export const partyFiltersActions = {
  SHOW_ATTENDING: 'SHOW_ATTENDING',
  SHOW_ALL: 'SHOW_ALL',
  SHOW_WITH_GUESTS: 'SHOW_WITH_GUESTS'
};

export const partyFilter: ActionReducer<any> = ( state = person => person, action) => {
  switch (action.type) {
    case partyFiltersActions.SHOW_ATTENDING:
      return person => person.attending;
    case partyFiltersActions.SHOW_ALL:
      return person => person;
    case partyFiltersActions.SHOW_WITH_GUESTS:
      return person => person.guests && person.attending;
    default:
      return state;
  }
};
