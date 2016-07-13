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

To get the number of stars:

```bash
meteor-package-dump csats:mturk | jq .TDBzXGRqb7FDYn3sN.starCount
```

## Example output

## Copyright and License

Copyright (C)2016 Adam Monsen <haircut@gmail.com>

License: MIT. See COPYING.
