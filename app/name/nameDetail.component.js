class nameDetailController {
  constructor($scope,nameService,$state,$transitions) {
    this.$state = $state;
    this.$transitions = $transitions;
    this.nameService = nameService;
    this.$scope = $scope;
  }

  $onInit() {
    console.log(this.filenumber);

    this.nameService.getNameDetailByFilenumber(this.filenumber).then((n) => {
      console.log(n[0]);
      this.name = n[0];
    });
  }
}

nameDetailController.$inject = ['$scope','nameService','$state','$transitions'];

export const nameDetail = {
  bindings: {
    filenumber: '<'
  },
  controller: nameDetailController,
  template: `
  <fieldset>
    <legend>Name Detail</legend>
    <div class="jwa_form_row">
      <label for="fileNumber">File Number:</label><input readonly="readonly" type="text" id="fileNumber" ng-model="$ctrl.name.fileNumber" />
      <label for="phone">Phone:</label><input readonly="readonly" type="text" id="phone" ng-model="$ctrl.name.Phone" />
      <label for="cellPhone">Cell:</label><input readonly="readonly" type="text" id="cellPhone" ng-model="$ctrl.name.AltPhone" />
      <label for="alias">Alias?</label><input readonly="readonly" type="text" id="alias" ng-model="$ctrl.name.AKAYN" />
    </div>
    <div class="jwa_form_row">
      <label for="lastName">Last Name/Business:</label><input readonly="readonly" type="text" id="lastName" ng-model="$ctrl.name.LastName" />
      <label for="firstName">First:</label><input readonly="readonly" type="text" id="firstName" ng-model="$ctrl.name.First" />
      <label for="middleName">Middle:</label><input readonly="readonly" type="text" id="middleName" ng-model="$ctrl.name.Middle" />
    </div>
    <div class="jwa_form_row">
      <label>Address:</label>
      <input readonly="readonly" type="text" ng-model="$ctrl.name.Addr_Number" />
      <input readonly="readonly" type="text" ng-model="$ctrl.name.Addr_Direction" />
      <input readonly="readonly" type="text" ng-model="$ctrl.name.Addr_StreetName" />
      <input readonly="readonly" type="text" ng-model="$ctrl.name.Addr_StreetType" />
      <input readonly="readonly" type="text" ng-model="$ctrl.name.Addr_Direciton2" />
      <input readonly="readonly" type="text" ng-model="$ctrl.name.Addr_Apt" />
    </div>
    <div class="jwa_form_row">
      <label for="city">City:</label><input readonly="readonly" type="text" id="city" ng-model="$ctrl.name.Addr_City" />
      <label for="state">State:</label><input readonly="readonly" type="text" id="state" ng-model="$ctrl.name.Addr_State" />
      <label for="zip">Zip:</label><input readonly="readonly" type="text" id="zip" ng-model="$ctrl.name.Addr_Zip" />
    </div>
    <div class="jwa_form_row">
      <label for="race">Race:</label><input readonly="readonly" type="text" id="race" ng-model="$ctrl.name.Race" />
      <label for="sex">Sex:</label><input readonly="readonly" type="text" id="sex" ng-model="$ctrl.name.Sex" />
      <label for="height">Ht:</label><input readonly="readonly" type="text" id="height" ng-model="$ctrl.name.Ht" />
      <label for="weight">Wt:</label><input readonly="readonly" type="text" id="weight" ng-model="$ctrl.name.Wt" />
      <label for="eyeColor">Eyes:</label><input readonly="readonly" type="text" id="eyeColor" ng-model="$ctrl.name.EyeColor" />
      <label for="hairColor">Hair:</label><input readonly="readonly" type="text" id="hairColor" ng-model="$ctrl.name.HairColor" />
      <label for="ethnicity">Eth:</label><input readonly="readonly" type="text" id="ethnicity" ng-model="$ctrl.name.Eth" />
    </div>
    <div class="jwa_form_row">
      <label for="DOB">DOB:</label><input readonly="readonly" type="text" id="DOB" ng-model="$ctrl.name.DOB" />
      <label for="OLN">OLN:</label><input readonly="readonly" type="text" id="OLN" ng-model="$ctrl.name.OLN" />
    </div>
    <div class="jwa_form_row">
      <label for="caution">Caution</label><input readonly="readonly" type="text" id="caution" ng-model="$ctrl.name.Caution" />
    </div>
  </fieldset>`
};
