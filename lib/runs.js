'use strict';

var util = require('util');

var async = require('async');
var _ = require('lodash');

function Runs(httpMethod) {
    this._httpMethod = httpMethod;
}

Runs.prototype.delete = function deleteRun(runId, callback) {
    this._httpMethod.delete(util.format('/runs/%s', runId), null, callback);
};

Runs.prototype.cancel = function cancel(runId, callback) {
    this._httpMethod.post(util.format('/runs/%s/cancel', runId), null, callback);
};

Runs.prototype.list = function list(queryOptions, callback) {
    queryOptions = queryOptions || {};
    this._httpMethod.get('/runs', queryOptions, callback);
};

Runs.prototype.get = function get(runId, callback) {
    this._httpMethod.get(util.format('/runs/%s', runId), null, callback);
};


module.exports = Runs;