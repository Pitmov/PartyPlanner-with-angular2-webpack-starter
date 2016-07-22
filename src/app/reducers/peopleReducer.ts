import { ActionReducer, Action } from '@ngrx/store';
import { User } from '../models/userModel';

export const peopleActionMap = {
  ADD_GUEST: 'ADD_GUEST',
  REMOVE_GUEST: 'REMOVE_GUEST',
  TOGGLE_ATTENDING: 'TOOGLE_ATTENDING',
  ADD_PERSON: 'ADD_PERSON',
  REMOVE_PERSON: 'REMOVE_PERSON'
};

const details = (state, action) => {
  switch (action.type) {
    case peopleActionMap.ADD_GUEST:
      if (state.id === action.payload) {
        return Object.assign(
          {},
          state,
          { guests: state.guests + 1 }
        );
      }
      return state;
    case peopleActionMap.REMOVE_GUEST:
      if (state.id === action.payload && state.guests > 0) {
        return Object.assign(
          {},
          state,
          { guests: state.guests - 1 }
        );
      }
      return state;
    case peopleActionMap.TOGGLE_ATTENDING:
      if (state.id === action.payload) {
        return Object.assign(
          {},
          state,
          { attending: !state.attending }
        );
      }
      return state;

    default:
      return state;
  }
};

export const peopleReducer: ActionReducer<User[]> = (state: User[] = [], action) => {
  switch (action.type) {
    case peopleActionMap.ADD_PERSON:
      return [
        ...state,
        new User(
          action.payload.id,
          action.payload.name,
          0,
          false
        )
      ];
    case peopleActionMap.REMOVE_PERSON:
      return state.filter(person => person.id !== action.payload);
    case peopleActionMap.ADD_GUEST:
      return state.map(person => details(person, action));
    case peopleActionMap.REMOVE_GUEST:
      return state.map(person => details(person, action));
    case peopleActionMap.TOGGLE_ATTENDING:
      return state.map(person => details(person, action));
    default:
      return state;
  }
};
