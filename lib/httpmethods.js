'use strict';

var util = require('util');
var url = require('url');
var log = util.debuglog('shippable');
var request = require('request');
var _ = require('lodash');

function HttpMethods(apiToken, options) {
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

HttpMethods.prototype.get = function get(path, queryParams, callback) {
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

HttpMethods.prototype.delete = function deleteMethod(path, queryParams, callback) {
    queryParams = queryParams || {};
    var params = {
        url: url.resolve(this.baseUrl, path),
        qs: queryParams
    };

    request.delete(_.extend(params, this.baseParams), function(err, resp, body) {
        if(err || resp.statusCode!==200) {
            log('get err: %s, body: %s, statusCode: %d', err, body, resp.statusCode);
            if(!err) {
                err = 'StatusCode: ' + resp.statusCode;
            }
        }
        callback(err, body);
    });
};


HttpMethods.prototype.post = function post(path, body, callback) {
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


module.exports = HttpMethods;