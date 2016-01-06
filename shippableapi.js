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
    this.projectToName = {};
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
    var params = {
        url: url.resolve(this.baseUrl, path),
        body: body
    };

    console.dir(params);
    request.post(_.extend(params, this.baseParams), function(err, resp, body) {
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

ShippableApi.prototype.getProjectByName = function getProjectByName(projectName, callback) {
    var self = this;
    async.waterfall([
        function lookupProjectName(done) {
            var projectId = self.projectToName[projectName];
            if(projectId) {
                return setImmediate(function(){ done(null, projectId);});
            }
            else {
                self.getProjects(function(err, projects) {
                    if(!err) {
                        _.each(projects, function(project) {
                            self.projectToName[project.name] = project.id;
                        });
                    }

                    var projectId = self.projectToName[projectName];
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

ShippableApi.prototype.searchBuilds = function searchBuilds(projectId, queryParams, callback) {
    this._get('/projects/' + projectId + '/searchBuilds', queryParams, callback);
};

ShippableApi.prototype.enableBuild = function enableBuild(projectId, callback) {
    this._post('/workflow/enableRepoBuild', {projectId: projectId}, callback);
};

ShippableApi.prototype.disableBuild = function disableBuild(projectId, callback) {
    this._post('/workflow/disableBuild', {projectId: projectId}, callback);
};

module.exports = ShippableApi;