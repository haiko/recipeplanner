import { RecipeplannerClientPage } from './app.po';

describe('recipeplanner-client App', function() {
  let page: RecipeplannerClientPage;

  beforeEach(() => {
    page = new RecipeplannerClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
