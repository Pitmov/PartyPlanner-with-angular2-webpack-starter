/* tslint:disable:no-unused-variable */
import {
  beforeEachProviders,
  describe,
  expect, it, inject, tick, fakeAsync
} from '@angular/core/testing';
import { TopButtonComponent } from './top-button.component';
import { Renderer, provide, ElementRef } from '@angular/core';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

beforeEachProviders(() => {
  return [
    TopButtonComponent,
    Renderer,
    provide(ElementRef, { useClass: MockElementRef })
  ];
});

describe('App: Top button component tests', () => {

  it('Move top test', () => {
    inject([TopButtonComponent], fakeAsync((TBC) => {
      TBC.windowScrollPosition = 1000;
      expect(TBC.windowScrollPosition).toBe(1000);
      TBC.moveTop(1000);
      tick();
      expect(TBC.windowScrollPosition).toBe(0);

    }));
  });
  // others function tests here
});
