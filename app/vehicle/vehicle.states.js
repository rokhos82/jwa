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
