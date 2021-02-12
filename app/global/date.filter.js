/**
 * @description
 * Date filter
 * @function
 * @memberOf angular_module.SUPPORT_MODULE
 * @param {string} input The string to parse.  Must in the format of 'YYYY-MM-DDTHH:MM:00.00Z'.
 * @return {string} The parsed date portion 'YYYY-MM-DD'.
 * @example
 * {{dateTimeString | jwaDate}}
 */
export function dateFilter() {
  return function(input) {
    // SQL returns the datetime type for all date and time columns in the Justice
    // database.  The string is formated as:
    //    'YYYY-MM-DDTHH:MM:00.00Z'
    // We are interested in the 'YYYY-MM-DD' portion of that string.

    input = input || '';
    let parts = _.split(input,'T');
    return parts[0] || '';
  };
}
