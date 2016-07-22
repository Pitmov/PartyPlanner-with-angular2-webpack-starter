/* tslint:disable:no-unused-variable */
import {
  beforeEachProviders,
  describe,
  expect, it, inject, tick, fakeAsync
} from '@angular/core/testing';
import { App } from './app.component';
import { provideStore } from '@ngrx/store';
import { peopleReducer } from '../reducers/peopleReducer';
import { partyFilter } from '../reducers/partyFilterReducer';
import { partyFiltersActions } from '../reducers/partyFilterReducer';

beforeEachProviders(() => [App,
  provideStore({ people: peopleReducer, partyFilter: partyFilter })]);

describe('App: App component tests', () => {
  it('should create the app',
    inject([App], (app) => {
      expect(app).toBeTruthy();
    }));

  it('add person function test',
    inject([App], fakeAsync((app) => {
      app.addPerson('Pitmov');
      tick();
      expect(app.model.people[0].name).toBe('Pitmov');
    })));

  it('remove person function test',
    inject([App], fakeAsync((app) => {
      app.addPerson('Pitmov');
      tick();
      let id = app.model.people[0].id;
      app.addPerson('Test person');
      tick();
      expect(app.model.people.length).toBe(2);
      app.removePerson(id);
      tick();
      expect(app.model.people[0].name).toBe('Test person');
      app.removePerson(app.model.people[0].id);
      tick();
      expect(app.model.people.length).toBe(0);
    })));

  it('add guest function test', inject([App], fakeAsync((app) => {
    app.addPerson('Pitmov');
    tick();
    let id = app.model.people[0].id;
    app.addGuest(id);
    app.addGuest(id);
    app.addGuest(id);
    app.addGuest(id);
    app.addGuest(id);
    tick();
    expect(app.model.people[0].guests).toBe(5);
  })));

  it('remove guest function test', inject([App], fakeAsync((app) => {
    app.addPerson('Pitmov');
    tick();
    let id = app.model.people[0].id;
    app.addGuest(id);
    app.addGuest(id);
    app.addGuest(id);
    app.addGuest(id);
    tick();
    expect(app.model.people[0].guests).toBe(4);
    app.removeGuest(id);
    app.removeGuest(id);
    tick();
    expect(app.model.people[0].guests).toBe(2);
  })));

  it('toggle attending on event', inject([App], fakeAsync((app) => {
    app.addPerson('Pitmov');
    tick();
    let id = app.model.people[0].id;
    app.addGuest(id);
    tick();
    expect(app.model.people[0].attending).toBe(false);
    app.toggleAttending(id);
    tick();
    expect(app.model.people[0].attending).toBe(true);
    app.toggleAttending(id);
    tick();
    expect(app.model.people[0].attending).toBe(false);
  })));

  it('filter actions', inject([App], fakeAsync((app) => {
    let id,
        filterActions = partyFiltersActions;
    app.addPerson('Pitmov');
    tick();
    id = app.model.people[0].id;
    app.addGuest(id);
    app.toggleAttending(id);
    app.addPerson('Pitmov 2');
    tick();
    app.addPerson('Pitmov 3');
    tick();
    id = app.model.people[app.model.people.length - 1].id;
    app.toggleAttending(id);
    tick();
    app.updateFilter(filterActions.SHOW_ATTENDING);
    tick();

    expect(app.model.people.every((user) => {
      return user.attending;
    })).toBe(true);

    app.updateFilter(filterActions.SHOW_WITH_GUESTS);
    tick();

    expect(app.model.people.every((user) => {
      return user.guests > 0;
    })).toBe(true);

    app.updateFilter(filterActions.SHOW_ALL);
    tick();

    expect(app.model.people.length).toBe(3);

  })));

  // others function tests here
});
