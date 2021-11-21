const randomTest = require('./randomTest')
test( 'test', () => 
{
  expect(randomTest(1, 3)).toBe(4)
})
