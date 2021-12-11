//test are inspired by the code in LAB 8
describe('Basic user flow for Website', () => {
  beforeAll(async () => {
    await page.goto('https://fervent-goldberg-7618a0.netlify.app/public/searchpage');
  });


  //Checking that filter toggle works
  it('Checking toggle works', async () => {
    let toggleWorks = true;
    const filter = await page.$('button[id="filterToggle"]');
    await filter.click();

    const popUp = await page.$('button[id="applyFilters"]');

    if(popUp == null){
      toggleWorks = false;
    }

    expect(toggleWorks).toBe(true);
  }, 2500);


  //Testing to see if all recipe card results showed up for a valid entry
 it('Search Page Results - Check for all results', async () => {
    //changing search value to
    resultCards = true; 
    const searchInput = await page.evaluate(() => {
        const input = document.getElementById('searchInput');
        input.value = "egg";
        return input;
    });

    //pressing enter for input box
    const filter = await page.$('button[id="filterToggle"]');
    await filter.click();
    await filter.click();

    const apply = await page.$('button[id="applyFilters"]');
    await apply.click();

    const n = await apply.getProperty('value');

    // //check that results were fetched
    const resultCard = await page.$$('result-card');
    expect(resultCards).toBe(true);
  },2500);

  //Testing to see that no recipe card results showed up for a entry with no results
  it('Search Page Results - Check for no results', async () => {

    //changing search value to make sure it is ""
    resultCards = true; 
    const searchInput = await page.evaluate(() => {
        const input = document.getElementById('searchInput');
        input.value = "";
        return input;
    });

    //pressing enter for input box
    const input = await page.$('input[id="searchInput"]');
    await input.press('Enter');

    // //check that results were not fetched
    const resultCard = await page.$$('result-card');

    expect(resultCard.length).toBe(0);
  },2500);

  //Testing to see if the input was filled in properly 
  it('Value should be populated for search input', async () => {
    //changing search value to egg
    resultCards = true; 
    const searchInput = await page.evaluate(() => {
      const input = document.getElementById('searchInput');
      input.value = "egg";
      return input.value;
    });

    //pressing enter for input box
    if(searchInput != 'egg'){
      resultCards = false; 
    }
    expect(resultCards).toBe(true);
  }, 2500);

    //Testing to see if the filter was filled in properly 
    it('Values should be populated for filter options', async () => {
      //changing search value to egg
      resultCards = true; 
      const cuisine = await page.evaluate(() => {
        const c = document.getElementById('cuisine');
        c.value = 'italian';
        return c.value;
      });

      const diet = await page.evaluate(() => {
        const d = document.getElementById('diet');
        d.value = 'vegan';
        return d.value;
      });

      const ingredients = await page.evaluate(() => {
        const i = document.getElementById('ingredients');
        i.value = 'tomato';
        return i.value;
      });

  
      //pressing enter for input box
      if(cuisine != 'italian' && diet != 'vegan' && ingredients != tomato){
        resultCards = false; 
      }
      
      expect(resultCards).toBe(true);
    }, 2500);

});


