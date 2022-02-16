/**
 *
 */

export const vehicleState = {
  parent: 'app',
  name: 'vehicle',
  url: '/vehicle',
  component: 'vehicleRoot',
  redirectTo: 'vehicleSearch',
  data: { requiresAuth: true }
};

export const vehicleSearchState = {
  parent: 'vehicle',
  name: 'vehicleSearch',
  url: '/search',
  views: {
    'vehicleSearch@vehicle': 'vehicleSearch'
  },
  sticky: true
};

export const vehicleDetailState = {
  parent: 'vehicle',
  name: 'vehicleDetail',
  url: '/{vehicleKey}',
  views: {
    'vehicleDetail@vehicle': 'vehicleDetail'
  },
  resolve: {
    info: VehicleDetailResolver
  },
  params: {
    search: null
  },
  data: {}
};

VehicleDetailResolver.$inject = ["$stateParams","vehicleService"];
function VehicleDetailResolver($stateParams,vehicleService) {
  let vehicleKey = $stateParams.vehicleKey;
  return vehicleService.getVehicleDetail(vehicleKey);
}
