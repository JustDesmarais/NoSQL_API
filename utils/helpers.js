// function to format created date
module.exports = function createdDate(val) {
    if (!val) return val;
    return val.toLocaleString();
  }