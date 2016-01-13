
  Shippable Api
    
  [![Build Status][shippable-image]][shippable-url] 
  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]


## Installation

```bash
$ npm install shippable
```

## Features

  * Wraps each shippable api

## Documentation

### accounts

Information associated with accounts.

#### list(callback)

Gets a list of the accounts the token can access.

__Arguments__

* `callback(err, accounts)` - Callback with error or data

#### searchBuilds(accountId, searchParams, callback)

Gets a list of builds associated with the accountId.

__Arguments__

* `accountId` - Id of the account to search for builds
* `searchParams` - Hash with any of the valid shippable options including sortBy, sortOrder, status, branch, isPR, limit, skip, projectId, and subscriptionId.
* `callback(err, builds)` - Callback with error or data

### builds

Information associated with builds.

#### cancel(buildId, callback)

Cancels a build

__Arguments__

* `buildId` - Id of the build to cancel
* `callback(err)` - Callback with error 

#### disable(projectId, callback)

Disables a project so that it doesn't build

__Arguments__

* `projectId` - Id of project to disable
* `callback(err)` - Callback with error

#### enable(projectId, callback)

Enables a project to build

__Arguments__

* `projectId` - Id of project to enable
* `callback(err)` - Callback with error

#### get(buildId, callback)

Get the details of a build

__Arguments__

* `buildId` - Id of build to retrieve details about
* `callback(err, buildDetail)` - Callback with error or buildDetail

#### new(projectId, callback)

Triggers a build for the project

* `projectId` - Id of project to trigger a build on
* `callback(err)` - Callback with error

### projects

#### get(projectId, callback)

Get details about a project

__Arguments__

* `projectId` - Id of project to get details about.
* `callback(err, project)` - Callback with error or project details. Project is null if not found.

#### getByFullName(fullName, callback)

Gets details about a project using the full name of the project to look it up.  Checks local cache first and if not found
makes a call to projects() to get a full list of projects and caches it.

__Arguments__

* `fullName` - Full name of project in github format i.e. chriskinsman/shippable.  This is a case sensitive match.
* `callback(err, project)` - Callback with error or project details.  Project is null if not found.

#### list(callback)

List all projects associated with token.  This may be across multiple organizations.

__Arguments__

* `callback(err, projects)` - Callback with error or array of projects.

#### searchBuilds(projectId, callback)

Searches the builds associated with a project.

__Arguments__

* `projectId` - Id of the project to search.
* `callback(err, builds)` - Callback with error or array of builds.

### subscriptions


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
