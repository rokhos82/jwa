class incidentDetailController {
  constructor($scope,incidentService,dateFilter,timeFilter,$state) {
    this.$scope = $scope;
    this.incidentService = incidentService;
    this.dateFilter = dateFilter;
    this.timeFilter = timeFilter;

    this.incident = null;
    this.loading = true;
  }

  $onInit() {
    this.incidentService.getIncidentDetail(this.incidentnumber).then((result) => {
      console.log('Detail',result);
      this.incident = result[0].detail;
      this.contacts = result[0].contacts;
      this.property = result[0].property;
      this.narratives = result[0].narratives;
      this.scratchpad = result[0].scratchpad[0].ScratchPad;
      this.cleanupDateTime();
    }).finally(() => {
      this.loading = false;
    });
  }

  cleanupDateTime() {
    this.incident.Since = this.dateFilter(this.incident.Since);
    this.incident.AsOfDate = this.dateFilter(this.incident.AsOfDate);
    this.incident.RptDate = this.dateFilter(this.incident.RptDate);
    this.incident.BeginDate = this.dateFilter(this.incident.BeginDate);
    this.incident.EndDate = this.dateFilter(this.incident.EndDate);


    this.incident.RptTime = this.timeFilter(this.incident.RptTime);
    this.incident.BeginTime = this.timeFilter(this.incident.BeginTime);
    this.incident.EndTime = this.timeFilter(this.incident.EndTime);
    this.incident.Disp = this.timeFilter(this.incident.Disp);
    this.incident.Arvd = this.timeFilter(this.incident.Arvd);
    this.incident.Clrd = this.timeFilter(this.incident.Clrd);
  }
}

incidentDetailController.$inject = ["$scope","incidentService","dateFilter","timeFilter","$state"];

export const incidentDetail = {
  bindings: {
    incidentnumber: "<"
  },
  controller: incidentDetailController,
  template: require('./incidentDetail.component.html')
};
