'use strict';

var util = require('util');

function Jobs(httpMethod) {
    this._httpMethod = httpMethod;
}

Jobs.prototype.list = function list(callback) {
    this._httpMethod.get('/jobs', null, callback);
};

Jobs.prototype.get = function get(jobId, callback) {
    this._httpMethod.get(util.format('/jobs/%s', jobId), null, callback);
};

Jobs.prototype.downloadConsoleLog = function downloadConsoleLog(jobId, callback) {
    this._httpMethod.get(util.format('/jobs/%s/consoles/download', jobId), null, callback);
};

Jobs.prototype.getCoverageReport = function getCoverageReport(jobId, callback) {
    this._httpMethod.get(util.format('/jobs/%s/jobCoverageReports', jobId), null, callback);
};

Jobs.prototype.getTestReport = function getTestReport(jobId, callback) {
    this._httpMethod.get(util.format('/jobs/%s/jobTestReports', jobId), null, callback);
};

Jobs.prototype.delete = function deleteRun(runId, callback) {
    this._httpMethod.delete(util.format('/jobs/%s', runId), null, callback);
};

module.exports = Jobs;