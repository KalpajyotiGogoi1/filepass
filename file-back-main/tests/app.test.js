test('should return an empty array when no items are available', () => {
  const result = getAvailableItems();
  expect(result).toEqual([]); 
});
