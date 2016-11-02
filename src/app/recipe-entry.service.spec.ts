/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecipeEntryService } from './recipe-entry.service';

describe('Service: RecipeEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeEntryService]
    });
  });

  it('should ...', inject([RecipeEntryService], (service: RecipeEntryService) => {
    expect(service).toBeTruthy();
  }));
});
