'use strict';

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

Tests.searchBuilds = function searchBuilds(test) {
    shippableApi.searchBuilds('5490c415d46935d5fbc061b5', {limit: 1}, function(err, builds) {
        test.ifError(err);
        console.dir(builds);
        test.ok(builds!==null,'Builds null');
        test.ok(builds.length===1, 'Limit failed');
        test.done();
    });
};

module.exports = Tests;