
  Shippable Api
    
  [![Build Status][shippable-image]][shippable-url] 
  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]


## Installation

```bash
$ npm install shippable
```

Then require and instantiate `ShippableAPI`
```
const ShippableApi = require('shippable');
// See http://docs.shippable.com/reference/api-tokens/ for help with API tokens
const shippable = new ShippableApi('AUTHTOKEN');

// Find a project by name
shippable.projects.getByFullName('projectName', (err, project) => {
  console.log(project);
});

// Find a project master build status
// For a full list of options available to runs.list,
// see http://docs.shippable.com/reference/api-overview/#!/Runs/get_runs
shippable.runs.list({ projectIds: 'PROJECTID', branch: 'master', limit: 1 }, (err, builds) => {
  // if there are builds, it will be an array with 1 build object
  console.log(builds);
});

// Chain the two together to get lastest master build for a project by name
shippable.projects.getByFullName('projectName', (err, project) => {
  if (err) {
    // Do something with an error
  } else {
    shippable.runs.list({ projectIds: project.id, branch: 'master', limit: 1 }, (err, builds) => {
      // builds[0] should be the latest master build
    });
  }
});
```

## Features

  * Wraps each shippable api

## Documentation

### accounts

Information associated with accounts.

#### dependencies(accountId, callback)

Gets all account dependencies including subscriptions, enabled projects, credit cards and 
account integrations.

__Arguments__

* `accountId` - Id of account to get dependencies for
* `callback(err, dependencies)` - Callback with error or dependencies

#### get(accountId, callback)

Gets details about an account

__Arguments__

* `accountId` - Id of account to retrieve details for
* `callback(err, account)` - Callback with error or account details

#### list(callback)

Gets a list of the accounts the token can access.

__Arguments__

* `callback(err, accounts)` - Callback with error or data

#### runStatus(accountId, callback)

Gets status of all runs for all enabled projects across all subscriptions

__Arguments__

* `accountId` - Id of account to get status for
* `callback(err, status)` - Callback with error or status

### jobs

#### delete(jobId, callback)

Delete a job

* `jobId` - Id of job to retrieve details for
* `callback(err, job)` - Callback with error or details of deleted job.

#### downloadConsoleLog(jobId, callback)

Download the console log

__Arguments__

* `jobId` - Id of job to retrieve details for
* `callback(err, log)` - Callback with error or console log.

#### get(jobId, callback)

Get details about a job

__Arguments__

* `jobId` - Id of job to retrieve details for
* `callback(err, job)` - Callback with error or job details.

#### getCoverageReport(jobId, callback)

Get the test coverage report

__Arguments__

* `jobId` - Id of job to retrieve details for
* `callback(err, report)` - Callback with error or report.

#### getTestReport(jobId, callback)

Get the test report

__Arguments__

* `jobId` - Id of job to retrieve details for
* `callback(err, report)` - Callback with error or report.

#### list(query, callback)

List jobs

__Arguments__

* `query` - Query object for filtering jobs.  See shippable docs for options.
* `callback(err, jobs)` - Callback with error or array of jobs.


### projects

#### builds.disable(projectId, callback)

Disables a project so that it doesn't build

__Arguments__

* `projectId` - Id of project to disable
* `callback(err)` - Callback with error

#### builds.enable(projectId, callback)

Enables a project to build

__Arguments__

* `projectId` - Id of project to enable
* `callback(err)` - Callback with error


#### builds.new(projectId, callback)

Triggers a build for the project

* `projectId` - Id of project to trigger a build on
* `callback(err)` - Callback with error


#### get(projectId, callback)

Get details about a project

__Arguments__

* `projectId` - Id of project to get details about.
* `callback(err, project)` - Callback with error or project details. Project is null if not found.

#### getBranchRunStatus(projectId, callback)

Get details about the branch runs of a project

__Arguments__

* `projectId` - Id of project to get branch runs for.
* `callback(err, project)` - Callback with error or branch runs.


#### getByFullName(fullName, callback)

Gets details about a project using the full name of the project to look it up.  Checks local cache first and if not found
makes a call to projects() to get a full list of projects and caches it.

__Arguments__

* `fullName` - Full name of project in github format i.e. chriskinsman/shippable.  This is a case sensitive match.
* `callback(err, project)` - Callback with error or project details.  Project is null if not found.

#### list(query, callback)

List all projects associated with token.  This may be across multiple organizations.

__Arguments__

* `query` - Query parameters to filter projects.  See shippable api docs for details.
* `callback(err, projects)` - Callback with error or array of projects.


### runs

#### cancel(runId, callback)

Cancels  a run

__Arguments__

* `runId` - Id of run to cancel
* `callback(err, run)` - Callback with error or results from cancel.


#### delete(runId, callback)

Deletes a run

__Arguments__

* `runId` - Id of run to delete
* `callback(err, run)` - Callback with error or results from delete.

#### get(runId, callback)

Get details about a run.

__Arguments__

* `runId` - Id of run to retrieve details for
* `callback(err, run)` - Callback with error or run details.

#### list(query, callback)

List all runs associated with token.

__Arguments__

* `query` - Query object for filtering runs.  See shippable docs for options.
* `callback(err, runs)` - Callback with error or array of runs.

### subscriptions

#### delete(subscriptionId, callback)

Deletes a subscription

__Arguments__

* `subscriptionId` - Id of subscription to delete
* `callback(err, subscription)` - Callback with error or subscription that was deleted.

#### get(subscriptionId, callback)

Get details about a subscription.

__Arguments__

* `subscriptionId` - Id of subscription to get details about.
* `callback(err, subscription)` - Callback with error or subscription details. Subscription is null if not found.

#### getActiveMinionCount(subscriptionId, callback)

Gets the active minion count associated with subscription

__Arguments__

* `subscriptionId` - Id of subscription to get active minion count for.
* `callback(err, count)` - Callback with error or count.

#### getByOrgName(orgName, callback)

Gets details about a subscription using the organization name of the project to look it up.  Checks local cache first and if not found
makes a call to list() to get a full list of subscriptions and caches it.

__Arguments__

* `orgName` - Organization name of project from github.  This is a case sensitive match.
* `callback(err, subscription)` - Callback with error or subscription details.  Subscription is null if not found.

#### list(query, callback)

List all subscriptions associated with token.  This may be across multiple organizations.

__Arguments__

* `query` - Filter parameters.  See shippable documentation for details
* `callback(err, subscriptions)` - Callback with error or array of subscriptions.

## People

The author is [Chris Kinsman](https://github.com/chriskinsman)

## License

  [MIT](LICENSE)

[shippable-image]: https://img.shields.io/shippable/568d2b531895ca447467a94e.svg?style=flat
[shippable-url]: https://app.shippable.com/projects/568d2b531895ca447467a94e
[npm-image]: https://img.shields.io/npm/v/shippable.svg?style=flat
[npm-url]: https://npmjs.org/package/shippable
[downloads-image]: https://img.shields.io/npm/dm/shippable.svg?style=flat
[downloads-url]: https://npmjs.org/package/shippable
