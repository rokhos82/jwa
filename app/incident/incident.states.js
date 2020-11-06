/**
 * The incident states.
 */

export const incidentState = {
  parent: 'app',
  name: 'incident',
  url: '/incident',
  component: 'incident',
  redirectTo: 'incidentSearch'
};

export const incidentSearchState = {
  parent: 'incident',
  name: 'incidentSearch',
  url: '/search',
  views: {
    'incidentSearch@incident': 'incidentSearch'
  },
  sticky: true
};

export const incidentSearchDetailState = {
  parent: 'incidentSearch',
  name: 'incidentSearchDetail',
  url: '/{incidentnumber}',
  resolve: {
    incidentnumber: function($stateParams) {
      return $stateParams.incidentnumber;
    }
  },
  views: {
    'incidentDetail@incident': 'incidentSearchDetail'
  }
};

export const incidentDetailState = {
  parent: 'incident',
  name: 'incidentDetail',
  url: '/{incidentnumber}',
  resolve: {
    incidentnumber: function($stateParams) {
      return $stateParams.incidentnumber;
    }
  },
  views: {
    'incidentDetail@incident': 'incidentDetail'
  }
};
