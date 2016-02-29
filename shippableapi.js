'use strict';

var util = require('util');
var log = util.debuglog('shippable');
var url = require('url');

var async = require('async');
var request = require('request');
var _ = require('lodash');

var HttpMethods = require('./lib/httpmethods');
var Projects = require('./lib/projects');
var Subscriptions = require('./lib/subscriptions');
var Accounts = require('./lib/accounts');
var Builds = require('./lib/builds');
var Runs = require('./lib/runs');
var Jobs = require('./lib/jobs');

function ShippableApi(apiToken, options) {
    var httpMethods = new HttpMethods(apiToken, options);
    this.subscriptions = new Subscriptions(httpMethods);
    this.accounts = new Accounts(httpMethods);
    this.projects = new Projects(httpMethods);
    this.builds = new Builds(httpMethods);
    this.runs = new Runs(httpMethods);
    this.jobs = new Jobs(httpMethods);
}

module.exports = ShippableApi;