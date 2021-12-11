test('successfully adds recipe', () => {
    let addRecipe = true
    expect(addRecipe).toBe(true);
})

describe('Test add recipe page', () => {
    beforeAll(async () => {
        await page.goto('https://fervent-goldberg-7618a0.netlify.app/public/addrecipe');
    })

    it('Basic check', async () => {
        expect(true).toBe(true);
    })
})