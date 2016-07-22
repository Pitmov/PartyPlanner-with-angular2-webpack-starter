import { Component } from '@angular/core';
import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';
import { User } from '../models/userModel';
import { Store } from '@ngrx/store';
import { peopleActionMap } from '../reducers/peopleReducer';
import { PersonListComponent } from './person-list.component';
import { PersonInputComponent } from './person-input.component';
import { PartyFilterComponent } from './party-filter.component';
import { PartyStatsComponent } from './party-stats.component';
import { Observable } from 'rxjs/Rx';
import {
  partyModel,
} from '../models/partyModelSelectors';
import { MaterializeDirective } from 'angular2-materialize';
import { TopButtonComponent } from './top-button.component';

interface AppState {
  people: User[];
  partyFilter: any;
}

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  directives: [
    StoreLogMonitorComponent,
    PersonListComponent,
    PersonInputComponent,
    PartyStatsComponent,
    PartyFilterComponent,
    MaterializeDirective,
    TopButtonComponent
  ]
})
export class App {
  model: any;
  counter: number = 0;
  private subscription;

  constructor(private _store: Store<AppState>) {
    this.subscription = Observable.combineLatest(
      _store.select('people'),
      _store.select('partyFilter')
    ).let(partyModel()).subscribe(model => this.model = model);
  }

  id() {
    this.counter++;
    return Date.now() + this.counter;
  }

  updateFilter(filterAction) {
    this._store.dispatch({
      type: filterAction
    });
  }

  addPerson(name) {
    this._store.dispatch(
      {
        type: peopleActionMap.ADD_PERSON,
        payload: new User(this.id(), name, 0, false)
      }
    );
  }

  removePerson(id) {
    this._store.dispatch(
      {
        type: peopleActionMap.REMOVE_PERSON,
        payload: id
      }
    );
  }

  addGuest(id) {
    this._store.dispatch(
      {
        type: peopleActionMap.ADD_GUEST,
        payload: id
      }
    );
  }

  removeGuest(id) {
    this._store.dispatch(
      {
        type: peopleActionMap.REMOVE_GUEST,
        payload: id
      }
    );
  }

  toggleAttending(id) {
    this._store.dispatch(
      {
        type: peopleActionMap.TOGGLE_ATTENDING,
        payload: id
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
