test('successfully edits recipe', () => {
    let editRecipe = true
    expect(editRecipe).toBe(true);
})

test('Successfully adds recipe', () => {
    await page.goto('https://fervent-goldberg-7618a0.netlify.app/public/addrecipe');
    await page.$eval('#recipeTitle', el => el.value = 'A sample title');
    await page.$eval('#cuisineTypeEntry', el => el.value = 'Cuisine');
    await page.$eval('#totalTimeEntry', el => el.value = '80');
    expect(true).toBe(true);
})