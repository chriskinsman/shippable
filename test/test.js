'use strict';

var async = require('async');

var ShippableApi = require('../shippableapi');
var shippableApi = new ShippableApi(process.env.SHIPPABLE_TOKEN);

var Tests = {};

Tests.getProjects = function getProjects(test) {
    shippableApi.getProjects(function(err, projects) {
        test.ifError(err);
        test.equal(projects!==null, true,'No projects returned');
        test.done();
    });
};

Tests.getProject = function getProject(test) {
    shippableApi.getProject('5490c415d46935d5fbc061b5', function(err, project) {
        test.ifError(err);
        test.ok(project!==null, 'No project returned');
        test.done();
    });
};

Tests.getProjectByName = function getProjectByName(test) {
    shippableApi.getProjectByName('eventotron', function(err, project) {
        test.ifError(err);
        test.ok(project!==null, 'No project returned: ' + project.name);
        test.equal('eventotron', project.name, 'Wrong project returned');
        test.done();
    })
};


Tests.searchBuilds = function searchBuilds(test) {
    shippableApi.searchBuilds('5490c415d46935d5fbc061b5', {limit: 1}, function(err, builds) {
        test.ifError(err);
        test.ok(builds!==null,'Builds null');
        test.ok(builds.length===1, 'Limit failed');
        test.done();
    });
};

Tests.enableBuild = function enableBuild(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.getProjectByName('s3-stream-upload', function(err, project) {
                console.info(project.id);
                done(err, project.id);
            })
        },
        function enableBuild(projectId, done) {
            shippableApi.enableBuild(projectId, done);
        }
    ], function(err) {
        test.ifError(err);
    });
};

Tests.disableBuild = function disableBuild(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.getProjectByName('s3-stream-upload', function(err, project) {
                console.info(project.id);
                done(err, project.id);
            })
        },
        function disableBuild(projectId, done) {
            shippableApi.disableBuild(projectId, done);
        }
    ], function(err) {
        test.ifError(err);
    });
};


module.exports = Tests;