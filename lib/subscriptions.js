'use strict';

var util = require('util');

var async = require('async');
var _ = require('lodash');

function Subscriptions(httpMethod) {
    this._httpMethod = httpMethod;
    this.orgNameToSubscriptionId = {};
}

Subscriptions.prototype.list = function list(query, callback) {
    this._httpMethod.get('/subscriptions', query, callback);
};

Subscriptions.prototype.get = function get(subscriptionId, callback) {
    this._httpMethod.get(util.format('/subscriptions/%s', subscriptionId), null, callback);
};

Subscriptions.prototype.getByOrgName = function getByOrgName(orgName, callback) {
    var self = this;
    async.waterfall([
        function lookupSubscriptionName(done) {
            var subscriptionId = self.orgNameToSubscriptionId[orgName];
            if(subscriptionId) {
                return setImmediate(function(){ done(null, subscriptionId);});
            }
            else {
                self.list({}, function(err, subscriptions) {
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
            self.get(subscriptionId, done);
        }
    ], callback);
};

Subscriptions.prototype.getActiveMinionCount = function getActiveMinionCount(subscriptionId, callback) {
    this._httpMethod.get(util.format('/subscriptions/%s/activeMinions', subscriptionId), null, callback);
};

Subscriptions.prototype.delete = function deleteSubscription(subscriptionId, callback) {
    this._httpMethod.delete(util.format('/subscriptions/%s', subscriptionId), null, callback);
};


module.exports = Subscriptions;