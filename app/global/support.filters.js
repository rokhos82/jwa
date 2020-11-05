export function dateFilter() {
  // SQL returns the datetime type for all date and time columns in the Justice
  // database.  The string is formated as:
  //    'YYYY-MM-DDTHH:MM:00.00Z'
  // We are interested in the 'YYYY-MM-DD' portion of that string.
  return function(input) {
    input = input || '';
    let parts = _.split(input,'T');
    return parts[0] || '';
  }
}

export function timeFilter() {
  return function(input) {
    // SQL returns the datetime type for all date and time columns in the Justice
    // database.  The string is formated as:
    //    'YYYY-MM-DDTHH:MM:00.00Z'
    // We are interested in the HH:MM portion of that string.
    input = input || '';
    let parts = _.split(input,'T');
    let timePart = parts[1] || '';
    let time = _.truncate(timePart,{
      length: 5,
      omission: ""
    });
    return time;
  }
}
