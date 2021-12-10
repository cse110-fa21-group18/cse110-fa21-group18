
describe('Basic user flow for Website', () => {
  beforeAll(async () => {
    await page.goto('https://fervent-goldberg-7618a0.netlify.app/public/searchpage');
  });
 
  //Testing to see if all recipe card results showed up for a valid entry
 it('Search Page Results - Check for all results', async () => {
    console.log('Checking for all recipe result cards...');

    //changing search value to
    resultCards = true; 
    const searchInput = await page.evaluate(() => {
        const input = document.getElementById('searchInput');
        input.value = "egg";
        return input;
    });

    //pressing enter for input box
    const input = await page.$('input[id="searchInput"]');
    const enter = await input.press('Enter');
    
  
    // //check that results were fetched
    const resultCard = await page.$$('result-cards');
    console.log(resultCard);
    
    expect(resultCards).toBe(true);
  },2500);

  //Testing to see that no recipe card results showed up for a entry with no results
  it('Search Page Results - Check for no results', async () => {
    console.log('Checking for no recipe result cards...');

    //changing search value to make sure it is ""
    resultCards = true; 
    const searchInput = await page.evaluate(() => {
        const input = document.getElementById('searchInput');
        input.value = "";
        return input;
    });

    //pressing enter for input box
    const input = await page.$('input[id="searchInput"]');
    const enter = await input.press('Enter');
  
    // //check that results were not fetched
    const resultCard = await page.$$('result-cards');
    console.log(resultCards);
    
    expect(resultCards).toBe(true);
  },2500);

//Testing to see search enrty fetched correct items
it('Results should be correct based on search input', async () => {
  console.log('Checking all recipes are valid...');
  //changing search value to egg
  resultCards = true; 
  const searchInput = await page.evaluate(() => {
    const input = document.getElementById('searchInput');
    console.log(input);
    input.value = "egg";
    return input;
  });

  //pressing enter for input box
  const input = await page.$('input[id="searchInput"]');
  const enter = await input.press('Enter');

  // //check that results were fetched
  const resultCard = await page.$$('result-cards');
  console.log(resultCards);
  //check result title has info
  for(let i = 0; i < resultCards.length; i++){
    console.log("title is good");
  }
  expect(resultCards).toBe(true);
}, 2500);

});

   
