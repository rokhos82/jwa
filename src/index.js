import _ from 'lodash';
import './style.css';
import angular from  'angular';

let stuff = [1,2,3,4,"A"];

_.forEach(stuff,(e) => {
  console.log(e);
});
