import _ from 'lodash';
import './style.css';
import angular from  'angular';
import printMe from './print.js';

(function() {
  let stuff = [1,2,3,4,"A"];

  _.forEach(stuff,(e) => {
    console.log(e);
  });

  printMe();
})();
