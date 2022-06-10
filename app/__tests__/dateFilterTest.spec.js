const moment = require("moment");
const filterByDate = require('../mixins/filter');

const expectedDates =  ["11 Jun 2022", "12 Jun 2022", "13 Jun 2022", "14 Jun 2022"];
const mappedArr = filterByDate('2022-06-11', '2022-06-14').map((el) => {
  return moment(el).format("DD MMM YYYY");
})

test("endDate is greater than fromDate", () => {
  expect(mappedArr).toEqual(
    expect.arrayContaining(expectedDates)
  );
});
