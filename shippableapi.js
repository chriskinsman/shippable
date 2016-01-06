'use strict';

var util = require('util');
var log = util.debuglog('shippable');
var url = require('url');

var async = require('async');
var request = require('request');
var _ = require('lodash');


function ShippableApi(apiToken, options) {
    options = options || {};
    this.baseUrl = options.baseUrl || 'https://api.shippable.com/';
    this.apiToken = apiToken;
    this.projectFullNameToProjectId = {};
    this.orgNameToSubscriptionId = {};
    this.baseParams = {
        headers: {
            'Authorization': 'apiToken: ' + this.apiToken
        },
        json: true
    };
}

ShippableApi.prototype._get = function _get(path, queryParams, callback) {
    queryParams = queryParams || {};
    var params = {
        url: url.resolve(this.baseUrl, path),
        qs: queryParams
    };

    request.get(_.extend(params, this.baseParams), function(err, resp, body) {
        if(err || resp.statusCode!==200) {
            log('get err: %s, body: %s, statusCode: %d', err, body, resp.statusCode);
            if(!err) {
                err = 'StatusCode: ' + resp.statusCode;
            }
        }
        callback(err, body);
    });
};

ShippableApi.prototype._post = function _post(path, body, callback) {
    body = body || {};
    var params = {
        url: url.resolve(this.baseUrl, path),
        body: body
    };

    request.post(_.extend(params, this.baseParams), function(err, resp, body) {
        if(err || resp.statusCode!==200) {
            log('get err: %s, body: %s, statusCode: %d', err, JSON.stringify(body), resp.statusCode);
            if(!err) {
                err = 'StatusCode: ' + resp.statusCode;
            }
        }
        callback(err, body);
    });
};


ShippableApi.prototype.getProjects = function getProjects(callback) {
    this._get('/projects', null, callback);
};

ShippableApi.prototype.getProject = function getProject(projectId, callback) {
    this._get('/projects/' + projectId, null, callback);
};

ShippableApi.prototype.getProjectByFullName = function getProjectByFullName(projectName, callback) {
    var self = this;
    async.waterfall([
        function lookupProjectName(done) {
            var projectId = self.projectFullNameToProjectId[projectName];
            if(projectId) {
                return setImmediate(function(){ done(null, projectId);});
            }
            else {
                self.getProjects(function(err, projects) {
                    if(!err) {
                        _.each(projects, function(project) {
                            self.projectFullNameToProjectId[project.fullName] = project.id;
                        });
                    }

                    var projectId = self.projectFullNameToProjectId[projectName];
                    if(projectId) {
                        return setImmediate(function(){ done(null, projectId);});
                    }
                    else {
                        return setImmediate(function(){ done('Project name not found');});
                    }
                });
            }
        },
        function getProject(projectId, done) {
            self.getProject(projectId, done);
        }
    ], callback);
};

ShippableApi.prototype.getBuildsForProject = function getBuildsForProject(projectId, params, callback) {
    this._get(util.format('/projects/%s/searchBuilds', projectId), params, callback);
};

ShippableApi.prototype.enableBuild = function enableBuild(projectId, callback) {
    this._post(util.format('/projects/%s/enable', projectId), null, callback);
};

ShippableApi.prototype.disableBuild = function disableBuild(projectId, callback) {
    this._post(util.format('/projects/%s/disable', projectId), null, callback);
};

ShippableApi.prototype.cancelBuild = function cancelBuild(buildId, callback) {
    this._post(util.format('/builds/%s/cancel', buildId), null, callback);
};

ShippableApi.prototype.newBuild = function newBuild(projectId, params, callback) {
    this._post(util.format('/projects/%s/newBuild', projectId), params, callback);
};

ShippableApi.prototype.getBuildDetails = function getBuildDetails(buildId, callback) {
    this._get(util.format('/builds/%s', buildId), null, callback);
};

ShippableApi.prototype.getSubscriptions = function getSubscriptions(callback) {
    this._get('/subscriptions', null, callback);
};

ShippableApi.prototype.getSubscription = function getSubscription(subscriptionId, callback) {
    this._get(util.format('/subscriptions/%s', subscriptionId), null, callback);
};

ShippableApi.prototype.getSubscriptionByOrgName = function getSubscriptionByOrgName(orgName, callback) {
    var self = this;
    async.waterfall([
        function lookupSubscriptionName(done) {
            var subscriptionId = self.orgNameToSubscriptionId[orgName];
            if(subscriptionId) {
                return setImmediate(function(){ done(null, subscriptionId);});
            }
            else {
                self.getSubscriptions(function(err, subscriptions) {
                    if(!err) {
                        _.each(subscriptions, function(subscription) {
                            self.orgNameToSubscriptionId[subscription.orgName] = subscription.id;
                        });
                    }

                    var subscriptionId = self.orgNameToSubscriptionId[orgName];
                    if(subscriptionId) {
                        return setImmediate(function(){ done(null, subscriptionId);});
                    }
                    else {
                        return setImmediate(function(){ done('Subscription org name not found');});
                    }
                });
            }
        },
        function getSubscription(subscriptionId, done) {
            self.getSubscription(subscriptionId, done);
        }
    ], callback);
};

ShippableApi.prototype.getBuildsForSubscription = function getBuildsForSubscription(subscriptionId, options, callback) {
    this._get(util.format('/subscriptions/%s/searchBuilds', subscriptionId), options, callback);
};

ShippableApi.prototype.getAccounts = function getAccounts(callback) {
    this._get('/accounts', null, callback);
};

ShippableApi.prototype.getBuildsForAccount = function getBuildsForAccount(accountId, options, callback) {
    this._get(util.format('accounts/%s/searchBuilds', accountId), options, callback);
};

module.exports = ShippableApi;