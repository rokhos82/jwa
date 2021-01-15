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
    incidentnumber: incidentSearchDetailStateResolver
  },
  views: {
    'incidentDetail@incident': 'incidentSearchDetail'
  }
};

incidentSearchDetailStateResolver.$inject = ["$stateParams","auditService"];
function incidentSearchDetailStateResolver($stateParams,auditService) {
  return $stateParams.incidentnumber;
}

export const incidentSearchNarrativeDetailState = {
  parent: 'incidentSearch',
  name: 'incidentSearchNarrativeDetail',
  url: '/narrative/{narrativekey}',
  resolve: {
    narrativekey: incidentSearchNarrativeDetailStateResolver
  },
  views: {
    'incidentDetail@incident': 'narrativeDetail'
  }
};

incidentSearchNarrativeDetailStateResolver.$inject = ["$stateParams","auditService"];
function incidentSearchNarrativeDetailStateResolver($stateParams,auditService) {
  return $stateParams.narrativekey;
}

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
