'use strict';

var util = require('util');

var async = require('async');
var _ = require('lodash');

function Projects(httpMethod) {
    this._httpMethod = httpMethod;
    this.builds = new Builds(httpMethod);
    this.projectFullNameToProjectId = {};
}

Projects.prototype.list = function list(callback) {
    this._httpMethod.get('/projects', null, callback);
};

Projects.prototype.get = function get(projectId, callback) {
    this._httpMethod.get('/projects/' + projectId, null, callback);
};

Projects.prototype.getByFullName = function getByFullName(projectName, callback) {
    var self = this;
    async.waterfall([
        function lookupProjectName(done) {
            var projectId = self.projectFullNameToProjectId[projectName];
            if(projectId) {
                return setImmediate(function(){ done(null, projectId);});
            }
            else {
                self.list(function(err, projects) {
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
            self.get(projectId, done);
        }
    ], callback);
};

Projects.prototype.searchBuilds = function searchBuilds(projectId, params, callback) {
    this._httpMethod.get(util.format('/projects/%s/searchBuilds', projectId), params, callback);
};

function Builds(httpMethod) {
    this._httpMethod = httpMethod;
}

Builds.prototype.enable = function enableBuild(projectId, callback) {
    this._httpMethod.post(util.format('/projects/%s/enable', projectId), null, callback);
};

Builds.prototype.disable = function disableBuild(projectId, callback) {
    this._httpMethod.post(util.format('/projects/%s/disable', projectId), null, callback);
};

Builds.prototype.new = function newBuild(projectId, params, callback) {
    this._httpMethod.post(util.format('/projects/%s/newBuild', projectId), params, callback);
};


module.exports = Projects;