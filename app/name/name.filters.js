export function dateFilter() {
  return function(input) {
    input = input || '';
    let parts = _.split(input,'T');
    return parts[0];
  }
}
