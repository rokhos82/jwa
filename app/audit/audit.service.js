/**
 * @memberOf AUDIT_MODULE
 * @class AUDIT_MODULE.auditLogService
 */
export function auditService($resource) {
  let _callbacks = {};
  let _service = {
    log: logFunction,
    register: registerFunction
  };

  return _service;
}

auditService.$inject = ["$resource"];

// Service Function Definitions Below
function logFunction(entry) {
  console.log(entry);
}

function registerFunction(key,callback) {}
