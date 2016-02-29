'use strict';

var util = require('util');

var async = require('async');

function Accounts(httpMethod) {
    this._httpMethod = httpMethod;
}

Accounts.prototype.list = function list(callback) {
    this._httpMethod.get('/accounts', null, callback);
};

Accounts.prototype.get = function get(accountId, callback) {
    this._httpMethod.get(util.format('/accounts/%s', accountId), null, callback);
};

Accounts.prototype.runStatus = function runStatus(accountId, callback) {
    this._httpMethod.get(util.format('/accounts/%s/runStatus', accountId), null, callback);
};

Accounts.prototype.dependencies = function dependencies(accountId, callback) {
    this._httpMethod.get(util.format('/accounts/%s/dependencies', accountId), null, callback);
};

Accounts.prototype.delete = function deleteAccount(accountId, callback) {
    this._httpMethod.delete(util.format('/accounts/%s', accountId), null, callback);
};


module.exports = Accounts;