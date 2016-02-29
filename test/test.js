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
        test.equal(run!==null, true,'No run returned');
        test.done();
    });
};

Tests.getJobs = function getJobs(test) {
    shippableApi.jobs.list(function(err, jobs) {
        test.ifError(err);
        test.equal(jobs!=null, true, 'No jobs returned');
        test.done();
    });
};

Tests.getJob = function getJob(test) {
    shippableApi.jobs.get('', function(err, job) {
        test.ifError(err);
        test.equal(job!=null, true, 'No job returned');
        test.done();
    });
};

//Tests.downloadConsoleLog = function downloadConsoleLog(test) {
//    shippableApi.jobs.downloadConsoleLog('', function(err, log) {
//        test.ifError(err);
//        test.equal(log!=null, true, 'No log returned');
//        test.done();
//    });
//};
//
//Tests.getCoverageReport = function getCoverageReport(test) {
//    shippableApi.jobs.getCoverageReport('', function(err, report) {
//        test.ifError(err);
//        test.equal(report!=null, true, 'No report returned');
//        test.done();
//    });
//};
//
//Tests.getTestReport = function getTestReport(test) {
//    shippableApi.jobs.getTestReport('', function(err, report) {
//        test.ifError(err);
//        test.equal(report!=null, true, 'No report returned');
//        test.done();
//    });
//};
//
//Tests.deleteJob = function deleteJob(test) {
//    shippableApi.jobs.delete('', function(err, job) {
//        test.ifError(err);
//        test.equal(report!=null, true, 'No job returned');
//        test.done();
//    });
//};


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

Tests.getBranchRunStatus = function getBranchRunStatus(test) {
    shippableApi.projects.getBranchRunStatus('5696b3ba1895ca4474683350', function(err, runs) {
        test.ifError(err);
        test.ok(runs!==null, 'No runs returned');
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
        // Make sure the build is enabled otherwise new build will fail
        function enableBuild(projectId, done) {
            shippableApi.projects.builds.enable(projectId, function(err) {
                done(err, projectId);
            });
        },
        function newBuild(projectId, done) {
            shippableApi.projects.builds.new(projectId, null, done);
        }
    ], function(err) {
        test.ifError(err);
        test.done();
    });
};

Tests.getSubscriptions = function getSubscriptions(test) {
    shippableApi.subscriptions.list({}, function(err, subscriptions) {
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

//Tests.getActiveMinionCount = function getActiveMinionCount(test) {
//    shippableApi.subscriptions.getActiveMinionCount('chriskinsman', function(err, minionCount) {
//        test.ifError(err);
//        console.dir(minionCount);
//        test.ok(minionCount!=null, 'No count');
//        test.done();
//    });
//};

Tests.getAccounts = function getAccounts(test) {
    shippableApi.accounts.list(function(err, accounts) {
        test.ifError(err);
        test.ok(accounts!==null, 'No accounts');
        test.ok(accounts.length > 0, 'Length 0 accounts');
        test.done();
    });
};

Tests.getAccount = function getAccount(test) {
    shippableApi.accounts.get('5490c3ac60108e0e00ef1836', function(err, account) {
        test.ifError(err);
        test.ok(account!==null, 'No account');
        test.done();
    });
};

Tests.runStatus = function runStatus(test) {
    shippableApi.accounts.runStatus('5490c3ac60108e0e00ef1836', function(err, status) {
        test.ifError(err);
        test.ok(status!==null, 'No status');
        test.done();
    });
};

Tests.dependencies = function dependencies(test) {
    shippableApi.accounts.dependencies('5490c3ac60108e0e00ef1836', function(err, dependencies) {
        test.ifError(err);
        test.ok(dependencies!==null, 'No dependencies');
        test.done();
    });
};



module.exports = Tests;