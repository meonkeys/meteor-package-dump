# meteor-package-dump

Dump Meteor (atmosphere) JSON package metadata.

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

## Example output

## Copyright and License

Copyright (C)2016 Adam Monsen <haircut@gmail.com>

License: MIT. See COPYING.
