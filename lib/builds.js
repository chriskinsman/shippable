'use strict';

var util = require('util');

var async = require('async');
var _ = require('lodash');

function Builds(httpMethod) {
    this._httpMethod = httpMethod;
}

Builds.prototype.cancel = function cancelBuild(buildId, callback) {
    this._httpMethod.post(util.format('/builds/%s/cancel', buildId), null, callback);
};

Builds.prototype.get = function getBuildDetails(buildId, callback) {
    this._httpMethod.get(util.format('/builds/%s', buildId), null, callback);
};

module.exports = Builds;