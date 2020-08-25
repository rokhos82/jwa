import _ from 'lodash';
import './style.css';
import angular from  'angular';
import ngResource from 'angular-resource';
import printMe from './print.js';

(function() {
  let app = angular.module("jwa-main",['ngResource']);

  app.controller("jwaCtrl",["$scope","$resource",controller]);

  function controller($scope,$resource) {
    let $this = this;

    $this.greeting = "Welcome to the Justice Web App";
    $this.names = "";
    $this.fileNumber = 0;

    let info = $resource('http://localhost:8001/names',{
      nameId: 133306
    });

    let name = info.query();

    name.$promise.then(() => {
      $this.names = name;
    });

    $this.searchNameNumber = () => {
      let name = $resource('http://localhost:8001/names/:fileNumber',{
        fileNumber: $this.fileNumber
      });

      name.query().$promise.then((n) => {
        console.log(n[0]);
      });
    };
  }
})();
