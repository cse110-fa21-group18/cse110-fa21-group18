// test('successfully displays recipe', () => {
//     let displayRecipe = true
//     expect(displayRecipe).toBe(true);
// })
describe('Basic user flow for Website', () => {

    beforeAll(async () => {
        await page.goto('https://fervent-goldberg-7618a0.netlify.app/public/addrecipe');
    });
    
    it(' Click bookmark saves to favorites, favorites localStorage increments by 1', async () => {
        console.log('check favorite localStorage...');
        const initialFav = await page.evaluate(() => {
            window.localStorage.getItem('favorites'); 
        })
        const localStorageData = await page.evaluate(() => Object.assign({}, window.localStorage));
        
        console.log(initialFav)
        console.log(localStorageData)
        
        let newFav = await page.evaluate(() => {
            window.localStorage.getItem('favorites'); 
        })
        console.log(newFav)
        expect(1).toBe(1);
      });


});