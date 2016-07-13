# meteor-package-dump

Dump Meteor ([Atmosphere](https://atmospherejs.com)) JSON package metadata.

This uses [ddp](https://www.npmjs.com/package/ddp) to connect directly to Atmosphere.

The examples below assume you have the [jq command-line JSON processor](https://stedolan.github.io/jq/) installed.

## `meteor-package-dump` alternative: Atmosphere API

Instead of `meteor-package-dump` you can use Atmosphere's [REST API](https://atmospherejs.com/i/faq) like so:

```bash
curl --header "Accept: application/json" https://atmospherejs.com/a/packages/findByNames?names=csats:mturk | jq .
```

Output:

```json
[
  {
    "installs-per-year": 10,
    "latestVersion": {
      "published": {
        "$date": 1443133679956
      },
      "version": "0.1.11",
      "git": "https://github.com/csats/meteor-mturk",
      "description": "Basic mTurk API for Meteor",
      "readme": "https://warehouse.meteor.com/readme/H7w5GT9ynmwaoaH2F/1443133678853/gn5bTJrKzL/csats:mturk-0.1.11-readme.md",
      "unmigrated": false
    },
    "name": "csats:mturk",
    "score": 0,
    "starCount": 2
  }
]
```

## Install

```bash
npm install -g meteor-package-dump
```

## Usage

*meteor-package-dump METEOR_PACKAGE*

Example:

```bash
meteor-package-dump csats:mturk
```

To get the git repo URL for the latest version of [`csats:mturk`](https://atmospherejs.com/csats/mturk) (requires [jq](https://stedolan.github.io/jq/)):

```bash
meteor-package-dump csats:mturk | jq '.[] | .latestVersion.git'
```

Output: 

```
"https://github.com/csats/meteor-mturk"
```

## Example `meteor-package-dump` output

```bash
meteor-package-dump csats:mturk | jq .
```

Output:

```json
{
  "TDBzXGRqb7FDYn3sN": {
    "_id": "TDBzXGRqb7FDYn3sN",
    "authorName": "csats",
    "baseName": "mturk",
    "installs-per-day": 0,
    "installs-per-month": 0,
    "installs-per-week": 0,
    "installs-per-year": 10,
    "lastUpdated": "2015-01-06T20:44:32.689Z",
    "latestVersion": {
      "published": "2015-09-24T22:27:59.956Z",
      "version": "0.1.11",
      "earliestCompatibleVersion": "0.0.0",
      "git": "https://github.com/csats/meteor-mturk",
      "description": "Basic mTurk API for Meteor",
      "readme": "https://warehouse.meteor.com/readme/H7w5GT9ynmwaoaH2F/1443133678853/gn5bTJrKzL/csats:mturk-0.1.11-readme.md",
      "dependencies": [
        "meteor",
        "meteor-platform"
      ],
      "prerelease": false,
      "unmigrated": false
    },
    "maintainers": [
      {
        "username": "csats",
        "isOrganization": true
      }
    ],
    "metadata": {
      "name": "csats:mturk",
      "maintainers": [
        {
          "username": "csats",
          "id": "4NEDkYyCJvvZcTBr6",
          "isOrganization": true
        }
      ],
      "lastUpdated": "2015-01-06T20:44:32.689Z",
      "_id": "wEoBjpzwXFj4huzox"
    },
    "name": "csats:mturk",
    "readme": {
      "url": "https://warehouse.meteor.com/readme/H7w5GT9ynmwaoaH2F/1443133678853/gn5bTJrKzL/csats:mturk-0.1.11-readme.md",
      "content": "<h1>Basic mTurk API wrapper for Meteor</h1>..."
    },
    "score": 0,
    "starCount": 2,
    "trend-3-days": 0
  }
}
```


## Copyright and License

Copyright (C)2016 Adam Monsen <haircut@gmail.com>

License: MIT. See COPYING.
