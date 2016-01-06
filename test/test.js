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

Tests.getProjectByFullName = function getProjectByFullName(test) {
    shippableApi.getProjectByFullName('PushSpring/eventotron', function(err, project) {
        test.ifError(err);
        test.ok(project!==null, 'No project returned: ' + project.name);
        test.equal('eventotron', project.name, 'Wrong project returned');
        test.done();
    })
};


Tests.getBuildsForProject = function searchBuilds(test) {
    shippableApi.getBuildsForProject('5490c415d46935d5fbc061b5', {limit: 1}, function(err, builds) {
        test.ifError(err);
        test.ok(builds!==null,'Builds null');
        test.ok(builds.length===1, 'Limit failed');
        test.done();
    });
};

Tests.enableBuild = function enableBuild(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.getProjectByFullName('PushSpring/s3-stream-upload', function(err, project) {
                done(err, project.id);
            })
        },
        function enableBuild(projectId, done) {
            shippableApi.enableBuild(projectId, done);
        }
    ], function(err) {
        test.ifError(err);
        test.done();
    });
};

Tests.disableBuild = function disableBuild(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.getProjectByFullName('PushSpring/s3-stream-upload', function(err, project) {
                done(err, project.id);
            })
        },
        function disableBuild(projectId, done) {
            shippableApi.disableBuild(projectId, done);
        }
    ], function(err) {
        test.ifError(err);
        test.done();
    });
};

Tests.newBuild = function newBuild(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.getProjectByFullName('PushSpring/psops', function(err, project) {
                done(err, project.id);
            })
        },
        function newBuild(projectId, done) {
            shippableApi.newBuild(projectId, null, done);
        }
    ], function(err) {
        test.ifError(err);
        test.done();
    });
};

Tests.cancelBuild = function cancelBuild(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.getProjectByFullName('PushSpring/psops', function(err, project) {
                done(err, project.id);
            });
        },
        function searchBuilds(projectId, done) {
            shippableApi.getBuildsForProject(projectId, {limit:1}, function(err, builds) {
                done(err, builds[0].id)
            });
        },
        function cancelBuild(buildId, done) {
            shippableApi.cancelBuild(buildId, done);
        }
    ], function(err) {
        test.ifError(err);
        test.done();
    });
};

Tests.buildDetail = function buildDetail(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.getProjectByFullName('PushSpring/ps-workers', function(err, project) {
                done(err, project.id);
            });
        },
        function searchBuilds(projectId, done) {
            shippableApi.getBuildsForProject(projectId, {limit:1}, function(err, builds) {
                done(err, builds[0].id)
            });
        },
        function buildDetails(buildId, done) {
            shippableApi.getBuildDetails(buildId, done);
        }
    ], function(err, result) {
        test.ifError(err);
        test.ok(result!=null, 'No build details');
        test.done();
    });
};

Tests.getSubscriptions = function getSubscriptions(test) {
    shippableApi.getSubscriptions(function(err, subscriptions) {
        test.ifError(err);
        test.ok(subscriptions!==null, 'No subscriptions');
        test.ok(subscriptions.length > 0, 'Length 0 descriptions');
        test.done();
    });
};

Tests.getSubscription = function getSubscription(test) {
    shippableApi.getSubscription('5490c3add46935d5fbc061a8', function(err, subscription) {
        test.ifError(err);
        test.ok(subscription!==null, 'No subscriptions');
        test.done();
    });
};


Tests.getSubscriptionByOrgName = function getSubscriptionByOrgName(test) {
    shippableApi.getSubscriptionByOrgName('PushSpring', function(err, subscription) {
        test.ifError(err);
        test.ok(subscription!=null, 'No subscription');
        test.equal(subscription.orgName, 'PushSpring', 'Wrong subscription');
        test.done();
    });
};

Tests.getBuildsForSubscription = function getBuildsForSubscription(test) {
    async.waterfall([
        function getSubscriptionId(done) {
            shippableApi.getSubscriptionByOrgName('PushSpring', function(err, subscription) {
                done(err, subscription.id);
            });
        },
        function searchBuilds(subscriptionId, done) {
            shippableApi.getBuildsForSubscription(subscriptionId, {limit:1}, function(err, builds) {
                done(err, builds)
            });
        }
    ], function(err, result) {
        test.ifError(err);
        test.ok(result!=null, 'No builds');
        test.ok(result.length===1, 'Not exactly one build');
        test.done();
    });
};

Tests.getAccounts = function getAccounts(test) {
    shippableApi.getAccounts(function(err, accounts) {
        test.ifError(err);
        test.ok(accounts!==null, 'No accounts');
        test.ok(accounts.length > 0, 'Length 0 accounts');
        test.done();
    });
};

Tests.getBuildsForAccounts = function getBuildsForAccounts(test) {
    shippableApi.getBuildsForAccount('5490c3ac60108e0e00ef1836', {limit:1}, function(err, builds) {
        test.ifError(err);
        test.ok(builds!==null, 'No builds');
        test.ok(builds.length > 0, 'Length 0 builds');
        test.done();
    });
};


module.exports = Tests;