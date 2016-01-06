'use strict';

var util = require('util');
var log = util.debuglog('shippable');
var url = require('url');
var request = require('request');
var _ = require('lodash');

function ShippableApi(apiToken, options) {
    options = options || {};
    this.baseUrl = options.baseUrl || 'https://api.shippable.com/';
    this.apiToken = apiToken;
}

ShippableApi.prototype._get = function get(path, queryParams, callback) {
    var params = {
        url: url.resolve(this.baseUrl, path),
        headers: {
            'Authorization': 'apiToken: ' + this.apiToken
        },
        json: true
    };

    if(queryParams) {
        params.qs =queryParams;
    }

    request.get(params, function(err, resp, body) {
        if(err || resp.statusCode!==200) {
            log('get err: %s, body: %s, statusCode: %d', err, body, resp.statusCode);
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

ShippableApi.prototype.searchBuilds = function searchBuilds(projectId, queryParams, callback) {
    this._get('/projects/' + projectId + '/searchBuilds', queryParams, callback);
};

module.exports = ShippableApi;