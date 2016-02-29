'use strict';

var async = require('async');

var ShippableApi = require('../shippableapi');
var shippableApi = new ShippableApi(process.env.SHIPPABLE_TOKEN);

var Tests = {};

Tests.getRuns = function getRuns(test) {
    shippableApi.runs.list({}, function(err, runs) {
        test.ifError(err);
        test.equal(runs!==null, true,'No runs returned');
        test.done();
    });
};

Tests.getRun = function getRun(test) {
    shippableApi.runs.get('', function(err, run) {
        test.ifError(err);
        test.equal(runs!==null, true,'No run returned');
        test.done();
    });
};

Tests.getJobs = function getJobs(test) {
    shippableApi.jobs.list(function(err, jobs) {
        test.ifError(err);
        console.dir(jobs);
        test.equal(jobs!=null, true, 'No jobs returned');
        test.done();
    });
};

Tests.getJob = function getJob(test) {
    shippableApi.jobs.get('', function(err, job) {
        test.ifError(err);
        console.dir(job);
        test.equal(job!=null, true, 'No job returned');
        test.done();
    });
};

Tests.downloadConsoleLog = function downloadConsoleLog(test) {
    shippableApi.jobs.downloadConsoleLog('', function(err, log) {
        test.ifError(err);
        console.dir(log);
        test.equal(log!=null, true, 'No log returned');
        test.done();
    });
};

Tests.getCoverageReport = function getCoverageReport(test) {
    shippableApi.jobs.getCoverageReport('', function(err, report) {
        test.ifError(err);
        console.dir(report);
        test.equal(report!=null, true, 'No report returned');
        test.done();
    });
};

Tests.getTestReport = function getTestReport(test) {
    shippableApi.jobs.getTestReport('', function(err, report) {
        test.ifError(err);
        console.dir(report);
        test.equal(report!=null, true, 'No report returned');
        test.done();
    });
};

Tests.deleteJob = function deleteJob(test) {
    shippableApi.jobs.delete('', function(err, job) {
        test.ifError(err);
        console.dir(report);
        test.equal(report!=null, true, 'No job returned');
        test.done();
    });
};


Tests.getProjects = function getProjects(test) {
    shippableApi.projects.list({}, function(err, projects) {
        test.ifError(err);
        test.equal(projects!==null, true,'No projects returned');
        test.done();
    });
};

Tests.getProject = function getProject(test) {
    shippableApi.projects.get('5696b3ba1895ca4474683350', function(err, project) {
        test.ifError(err);
        test.ok(project!==null, 'No project returned');
        test.done();
    });
};

Tests.getProjectByFullName = function getProjectByFullName(test) {
    shippableApi.projects.getByFullName('chriskinsman/shippable-test', function(err, project) {
        test.ifError(err);
        test.ok(project!==null, 'No project returned: ' + project.name);
        test.equal('shippable-test', project.name, 'Wrong project returned');
        test.done();
    })
};


Tests.getBuildsForProject = function searchBuilds(test) {
    shippableApi.projects.searchBuilds('5696b3ba1895ca4474683350', {limit: 1}, function(err, builds) {
        test.ifError(err);
        test.ok(builds!==null,'Builds null');
        test.ok(builds.length===1, 'Limit failed');
        test.done();
    });
};

Tests.enableBuild = function enableBuild(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.projects.getByFullName('chriskinsman/shippable-test', function(err, project) {
                done(err, project.id);
            })
        },
        function enableBuild(projectId, done) {
            shippableApi.projects.builds.enable(projectId, done);
        }
    ], function(err) {
        test.ifError(err);
        test.done();
    });
};

Tests.disableBuild = function disableBuild(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.projects.getByFullName('chriskinsman/shippable-test', function(err, project) {
                done(err, project.id);
            })
        },
        function disableBuild(projectId, done) {
            shippableApi.projects.builds.disable(projectId, done);
        }
    ], function(err) {
        test.ifError(err);
        test.done();
    });
};

Tests.newBuild = function newBuild(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.projects.getByFullName('chriskinsman/shippable-test', function(err, project) {
                done(err, project.id);
            })
        },
        function newBuild(projectId, done) {
            shippableApi.projects.builds.new(projectId, null, done);
        }
    ], function(err) {
        test.ifError(err);
        test.done();
    });
};

Tests.cancelBuild = function cancelBuild(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.projects.getByFullName('chriskinsman/shippable-test', function(err, project) {
                done(err, project.id);
            });
        },
        function searchBuilds(projectId, done) {
            shippableApi.projects.searchBuilds(projectId, {limit:1}, function(err, builds) {
                done(err, builds[0].id)
            });
        },
        function cancelBuild(buildId, done) {
            shippableApi.builds.cancel(buildId, done);
        }
    ], function(err) {
        test.ifError(err);
        test.done();
    });
};

Tests.buildDetail = function buildDetail(test) {
    async.waterfall([
        function getProjectId(done) {
            shippableApi.projects.getByFullName('chriskinsman/shippable-test', function(err, project) {
                done(err, project.id);
            });
        },
        function searchBuilds(projectId, done) {
            shippableApi.projects.searchBuilds(projectId, {limit:1}, function(err, builds) {
                done(err, builds[0].id)
            });
        },
        function buildDetails(buildId, done) {
            shippableApi.builds.get(buildId, done);
        }
    ], function(err, result) {
        test.ifError(err);
        test.ok(result!=null, 'No build details');
        test.done();
    });
};

Tests.getSubscriptions = function getSubscriptions(test) {
    shippableApi.subscriptions.list(function(err, subscriptions) {
        test.ifError(err);
        test.ok(subscriptions!==null, 'No subscriptions');
        test.ok(subscriptions.length > 0, 'Length 0 descriptions');
        test.done();
    });
};

Tests.getSubscription = function getSubscription(test) {
    shippableApi.subscriptions.get('5490c3add46935d5fbc061aa', function(err, subscription) {
        test.ifError(err);
        test.ok(subscription!==null, 'No subscriptions');
        test.done();
    });
};


Tests.getSubscriptionByOrgName = function getSubscriptionByOrgName(test) {
    shippableApi.subscriptions.getByOrgName('chriskinsman', function(err, subscription) {
        test.ifError(err);
        test.ok(subscription!=null, 'No subscription');
        test.equal(subscription.orgName, 'chriskinsman', 'Wrong subscription');
        test.done();
    });
};

Tests.getBuildsForSubscription = function getBuildsForSubscription(test) {
    async.waterfall([
        function getSubscriptionId(done) {
            shippableApi.subscriptions.getByOrgName('chriskinsman', function(err, subscription) {
                done(err, subscription.id);
            });
        },
        function searchBuilds(subscriptionId, done) {
            shippableApi.subscriptions.searchBuilds(subscriptionId, {limit:1}, function(err, builds) {
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
    shippableApi.accounts.list(function(err, accounts) {
        test.ifError(err);
        test.ok(accounts!==null, 'No accounts');
        test.ok(accounts.length > 0, 'Length 0 accounts');
        test.done();
    });
};

Tests.getBuildsForAccounts = function getBuildsForAccounts(test) {
    shippableApi.accounts.searchBuilds('5490c3ac60108e0e00ef1836', {limit:1}, function(err, builds) {
        test.ifError(err);
        test.ok(builds!==null, 'No builds');
        test.ok(builds.length > 0, 'Length 0 builds');
        test.done();
    });
};


module.exports = Tests;