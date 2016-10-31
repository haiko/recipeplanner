/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecipeEntryServiceService } from './recipe-entry-service.service';

describe('Service: RecipeEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeEntryServiceService]
    });
  });

  it('should ...', inject([RecipeEntryServiceService], (service: RecipeEntryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
