function divideOnPages(arrayOfId, perPageAmount) {
  const pageAmount = Math.ceil(arrayOfId.length / perPageAmount);
  let result = [];
  let start = 1;
  for (let i = 0; i < pageAmount; i += 1) {
    result[i] = arrayOfId.slice(start - 1, perPageAmount * (i + 1));
    start += perPageAmount;
  }
  return result;
}

export { divideOnPages };
