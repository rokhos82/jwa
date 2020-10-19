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
      <label class="jwa_form_label" for="fileNumber">File Number:</label><input readonly="readonly" type="text" id="fileNumber" ng-model="$ctrl.name.fileNumber" />
      <label class="jwa_form_label" for="phone">Phone:</label><input readonly="readonly" type="text" id="phone" ng-model="$ctrl.name.Phone" />
      <label class="jwa_form_label" for="cellPhone">Cell:</label><input readonly="readonly" type="text" id="cellPhone" ng-model="$ctrl.name.AltPhone" />
      <label class="jwa_form_label" for="alias">Alias?</label><input class="jwa_form_small" readonly="readonly" type="text" id="alias" ng-model="$ctrl.name.AKAYN" />
    </div>
    <div class="jwa_form_row">
      <label class="jwa_form_label" for="lastName">Last Name/Business:</label><input readonly="readonly" type="text" id="lastName" ng-model="$ctrl.name.LastName" />
      <label class="jwa_form_label" for="firstName">First:</label><input readonly="readonly" type="text" id="firstName" ng-model="$ctrl.name.First" />
      <label class="jwa_form_label" for="middleName">Middle:</label><input readonly="readonly" type="text" id="middleName" ng-model="$ctrl.name.Middle" />
    </div>
    <div class="jwa_form_row">
      <label class="jwa_form_label">Address:</label>
      <input class="jwa_form_small" readonly="readonly" type="text" ng-model="$ctrl.name.Addr_Number" />
      <input class="jwa_form_small" readonly="readonly" type="text" ng-model="$ctrl.name.Addr_Direction" />
      <input readonly="readonly" type="text" ng-model="$ctrl.name.Addr_StreetName" />
      <input class="jwa_form_small" readonly="readonly" type="text" ng-model="$ctrl.name.Addr_StreetType" />
      <input class="jwa_form_small" readonly="readonly" type="text" ng-model="$ctrl.name.Addr_Direciton2" />
      <input class="jwa_form_small" readonly="readonly" type="text" ng-model="$ctrl.name.Addr_Apt" />
    </div>
    <div class="jwa_form_row">
      <label class="jwa_form_label" for="city">City:</label><input readonly="readonly" type="text" id="city" ng-model="$ctrl.name.Addr_City" />
      <label class="jwa_form_label" for="state">State:</label><input class="jwa_form_small" readonly="readonly" type="text" id="state" ng-model="$ctrl.name.Addr_State" />
      <label class="jwa_form_label" for="zip">Zip:</label><input readonly="readonly" type="text" id="zip" ng-model="$ctrl.name.Addr_Zip" />
    </div>
    <div class="jwa_form_row">
      <label class="jwa_form_label" for="race">Race:</label><input class="jwa_form_small" readonly="readonly" type="text" id="race" ng-model="$ctrl.name.Race" />
      <label class="jwa_form_label" for="sex">Sex:</label><input class="jwa_form_small" readonly="readonly" type="text" id="sex" ng-model="$ctrl.name.Sex" />
      <label class="jwa_form_label" for="height">Ht:</label><input class="jwa_form_small" readonly="readonly" type="text" id="height" ng-model="$ctrl.name.Ht" />
      <label class="jwa_form_label" for="weight">Wt:</label><input class="jwa_form_small" readonly="readonly" type="text" id="weight" ng-model="$ctrl.name.Wt" />
      <label class="jwa_form_label" for="eyeColor">Eyes:</label><input class="jwa_form_small" readonly="readonly" type="text" id="eyeColor" ng-model="$ctrl.name.EyeColor" />
      <label class="jwa_form_label" for="hairColor">Hair:</label><input class="jwa_form_small" readonly="readonly" type="text" id="hairColor" ng-model="$ctrl.name.HairColor" />
      <label class="jwa_form_label" for="ethnicity">Eth:</label><input class="jwa_form_small" readonly="readonly" type="text" id="ethnicity" ng-model="$ctrl.name.Eth" />
    </div>
    <div class="jwa_form_row">
      <label class="jwa_form_label" for="DOB">DOB:</label><input readonly="readonly" type="text" id="DOB" ng-model="$ctrl.name.DOB" />
      <label class="jwa_form_label" for="OLN">OLN:</label><input readonly="readonly" type="text" id="OLN" ng-model="$ctrl.name.OLN" />
    </div>
    <div class="jwa_form_row">
      <label class="jwa_form_label" for="caution">Caution:</label><input readonly="readonly" type="text" id="caution" ng-model="$ctrl.name.Caution" />
    </div>
  </fieldset>`
};
