'use strict';

var util = require('util');

var async = require('async');
var _ = require('lodash');

function Accounts(httpMethod) {
    this._httpMethod = httpMethod;
}

Accounts.prototype.list = function getAccounts(callback) {
    this._httpMethod.get('/accounts', null, callback);
};

Accounts.prototype.searchBuilds = function getBuildsForAccount(accountId, options, callback) {
    this._httpMethod.get(util.format('accounts/%s/searchBuilds', accountId), options, callback);
};

module.exports = Accounts;