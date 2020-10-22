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
      console.log(n);
      this.name = n[0];
    });

    this.nameService.getNameContacts(this.filenumber).then((n) => {
      console.log(n);
      this.nameContacts = n.recordset;
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
      <label class="jwa_form_label" for="OLN">OLN:</label><input readonly="readonly" type="text" id="OLN" ng-model="$ctrl.name.OLN" /><input class="jwa_form_small" readonly="readonly" type="text" id="OLNState" ng-model="$ctrl.name.OLNState" />
    </div>
    <div class="jwa_form_row">
      <label class="jwa_form_label" for="caution">Caution:</label><input readonly="readonly" type="text" id="caution" ng-model="$ctrl.name.Caution" />
    </div>
    <div class="jwa_form_row">
      <!-- Contacts Pane -->
      <name-detail-contacts contacts="$ctrl.nameContacts"></name-detail-contacts>
    </div>
    <div class="jwa_form_row">
      <fieldset>
        <legend>Other Info</legend>
        <div class="jwa_form_row">
          <label for="SSN">SSN:</label><input readonly="readonly" type="text" id="SSN" ng-model="$ctrl.name.SSN" />
          <label for="altAddress">Alt. Address:</label><input readonly="readonly" type="text" id="altAddress" ng-model="$ctrl.name.AltAddress" />
          <label for="altCity">Alt. City:</label><input class="jwa_form_small" readonly="readonly" type="text" id="altCity" ng-model="$ctrl.name.AltCity" />
        </div>
        <div class="jwa_form_row">
          <label for="POB">POB:</label><input readonly="readonly" type="text" id="POB" ng-model="$ctrl.name.POB" />
          <label for="localID">Local ID:</label><input readonly="readonly" type="text" id="localID" ng-model="$ctrl.name.LocalID" />
        </div>
        <div class="jwa_form_row">
          <label for="SID">SID</label><input readonly="readonly" type="text" id="SID" ng-model="$ctrl.name.SID" />
          <label for="FBI">FBI</label><input readonly="readonly" type="text" id="FBI" ng-model="$ctrl.name.FBI" />
        </div>
        <div class="jwa_form_row">
          <label for="facialHair">Facial Hair:</label><input class="jwa_form_small" readonly="readonly" type="text" id="facialHair" ng-model="$ctrl.name.facialHair" />
          <label for="email">eMail:</label><input readonly="readonly" type="text" id="email" ng-model="$ctrl.name.eMail" />
        </div>
        <div class="jwa_form_row">
          <label for="noPub">No Pub:</label><input class="jwa_form_small" readonly="readonly" type="text" id="noPub" ng-model="$ctrl.name.NoPub" />
          <label for="misc">Misc:</label><input readonly="readonly" type="text" id="misc" ng-model="$ctrl.name.NameMisc" />
        </div>
      </fieldset>
    </div>
    <div class="jwa_form_row">
      <fieldset>
        <legend>Next of Kin & Family Members</legend>
        <div class="jwa_form_row">
          <textarea class="jwa-textarea-full" rows="10" readonly ng-model="$ctrl.name.NextOfKin"></textarea>
        <div>
      </fieldset>
    </div>
    <div class="jwa_form_row">
      <fieldset>
        <legend>Prof/Work</legend>
        <div class="jwa-inline-block">
          <div class="jwa-right-justify">Court Serivce Officer...</div>
          <div class="jwa-right-justify">Home Detention Officer...</div>
          <div class="jwa-right-justify">Judge...</div>
          <div class="jwa-right-justify">DOC/JCA..</div>
          <div class="jwa-right-justify">Counseler...</div>
          <div class="jwa-right-justify">Clergy...</div>
          <div class="jwa-right-justify">Legal Guardian...</div>
          <div class="jwa-right-justify">Doctor...</div>
          <div class="jwa-right-justify">Attorney...</div>
          <div class="jwa-right-justify">Insurance/Other...</div>
        </div>
        <textarea readonly class="jwa-inline-block" ng-model="$ctrl.name.Professionals" rows="10" cols="45"></textarea>
        <div class="jwa-inline-block">
          <div class="jwa-right-justify"><label for="employer">Employer:</label><input readonly="readonly" type="text" id="employer" ng-model="$ctrl.name.Employer" /></div>
          <div class="jwa-right-justify"><label for="employerPhone">Employer Phone:</label><input readonly="readonly" type="text" id="employerPhone" ng-model="$ctrl.name.EmployerPhone" /></div>
          <div class="jwa-right-justify"><label for="schoolName">School Name:</label><input readonly="readonly" type="text" id="schoolName" ng-model="$ctrl.name.SchoolName" /></div>
          <div class="jwa-right-justify"><label for="schoolLocation">Location:</label><input readonly="readonly" type="text" id="schoolLocation" ng-model="$ctrl.name.SchoolLocation" /></div>
          <div class="jwa-right-justify"><label for="schoolStatus">Status</label><input class="jwa_form_small" readonly="readonly" type="text" id="schoolStatus" ng-model="$ctrl.name.SchoolStatus" /><label for="schoolGrade">Grade:</label><input class="jwa_form_small" readonly="readonly" type="text" id="schoolGrade" ng-model="$ctrl.name.SchoolGrade" /></div>
        </div>
      </fieldset>
    </div>
    <div class="jwa_form_row">
      <fieldset>
        <legend>AKA</legend>
        <label for="nicknames">Nicknames:</label><input readonly="readonly" type="text" id="nicknames" ng-model="$ctrl.name.Nicknames" />
        <label for="realFileNumber">REAL Name File Number:</label><input readonly="readonly" type="text" id="realFileNumber" ng-model="$ctrl.name.RelatedFileNumber" />
        <table class="jwa-master-names-table">
          <thead>
            <tr><td>File#</td><td>Name</td><td>Address</td><td>SSN</td></tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </fieldset>
    </div>
    <div class="jwa_form_row">
      <fieldset>
        <legend>Intel</legend>
        <div class="jwa_form_row">
          <div>
            <label for="WSINOCN">WSIN OCN:</label><input class="jwa_form_small" readonly="readonly" type="text" id="WSINOCN" ng-model="$ctrl.name.IntelWSINOCN" /><label for="WSINDOC">WSIN DOC#</label><input class="jwa_form_small" readonly="readonly" type="text" id="WSINDOC" ng-model="$ctrl.name.IntelWSINDoc" /><label for="informant">Informant?</label><input class="jwa_form_small" readonly="readonly" type="text" id="informant" ng-model="$ctrl.name.IntelInformant" />
          </div>
          <div>
            <label for="reliability">Reliability:</label><input class="jwa_form_small" readonly="readonly" type="text" id="reliability" ng-model="$ctrl.name.IntelReliability" /><label for="intelContent">Content:</label><input class="jwa_form_small" readonly="readonly" type="text" id="intelContent" ng-model="$ctrl.name.IntelContent" /><label for="intelViolence">Violence Potential:</label><input class="jwa_form_small" readonly="readonly" type="text" id="intelViolence" ng-model="$ctrl.name.IntelViolence" />
          </div>
          <div>
            <label>M.O., Activities, Comments, Associates</label><textarea rows="4" cols="45" ng-model="$ctrl.name.IntelComments"></textarea>
          </div>
        </div>
        <div class="jwa_form_row">
          <span><strong>Criminal Gang Affiliation</strong></span>
          <label for="intelGangName">Name/Chapter:</label><input readonly="readonly" type="text" id="intelGangName" ng-model="$ctrl.name.IntelGangName" />
          <label for="intelGangLocation">Location:</label><input readonly="readonly" type="text" id="intelGangLocation" ng-model="$ctrl.name.IntelGangLocation" />
        </div>
      </fieldset>
    </div>
    <div>
      <fieldset>
        <legend>Comments</legend>
        <textarea class="jwa-textarea-full" rows="10" ng-model="$ctrl.name.Comments"></textarea>
      </fieldset>
    </div>
    <div>
      <fieldset>
        <legend>Associates</legend>
        <table class="jwa-master-names-table">
          <thead>
            <tr><td>File#</td><td>Name</td><td>DOB</td><td>Inc#</td><td>Date</td><td>Inv</td><td>Offense Desc.</td><td>Location</td>
          </thead>
          <tbody></tbody>
        </table>
      </fieldset>
    </div>
  </fieldset>`
};
