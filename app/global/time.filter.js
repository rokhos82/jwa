/**
 * @description Time filter
 * @function
 * @memberOf angular_module.SUPPORT_MODULE
 * @param {string} input The string to parse.  Must in the format of 'YYYY-MM-DDTHH:MM:00.00Z'.
 * @return {string} The parsed time portion 'HH:MM'
 * @example
 * {{dateTimeString | time}}
 */
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
