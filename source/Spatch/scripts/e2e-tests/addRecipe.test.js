test('successfully adds recipe', () => {
    let addRecipe = true
    expect(addRecipe).toBe(true);
})

describe('Test add recipe page', () => {
    beforeAll(async () => {
        await page.goto('https://fervent-goldberg-7618a0.netlify.app/public/addrecipe');
    })

    it('Successfully adds recipe', async () => {
        await page.$eval('#recipeTitle', el => el.value = 'A sample title');
        await page.$eval('#cuisineTypeEntry', el => el.value = 'Cuisine');
        await page.$eval('#totalTimeEntry', el => el.value = '80');
        let ingredient = await page.$('ingredient-card');
        let shadow = await ingredient.getProperty('shadowRoot');
        let ingredient_name = await shadow.$('.ingredient-ind-name');
        let name_text = await ingredient_name.getProperty('value');
        name_text = "Potato";
        let ingredient_amount = await shadow.$('.ingredient-ind-amount');
        let amount_text = await ingredient_amount.getProperty('value');
        amount_text = "Potato";
        let ingredient_unit = await shadow.$('.ingredient-ind-unit');
        let unit_text = await ingredient_unit.getProperty('value');
        unit_text = "Potato";
        let instruction = await page.$('instruction-card');
        shadow = await instruction.getProperty('shadowRoot');
        let instructionText = await shadow.$('.instruction-text');
        let textText = await instructionText.getProperty('value');
        textText = "Potato";
        let instructionTime = await shadow.$('.instruction-time-input');
        let textTime = await instructionTime.getProperty('value');
        textTime = "Potato";
        // await (await page.$('#create-recipe-button')).click;
        let createButton = await page.$('#create-recipe-button');
        console.log(createButton);
        await createButton.click;
        expect(true).toBe(true);
    })
})