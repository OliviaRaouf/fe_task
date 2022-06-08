export default {
  filterByDate(fromDate, toDate) {
    const dates = [];
    var dt = new Date(fromDate);
    for (dt; dt <= new Date(toDate); dt.setDate(dt.getDate() + 1)) {
      dates.push(new Date(dt));
    }
    return dates;
  },
};
