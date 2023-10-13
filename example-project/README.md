# use-manifest example

This project attempts to be a mostly-understandable usage of use-manifest.

It has also helped greatly with sorting out use-manifest's type system without pulling in a much
bigger project 😊

All you should have to do to get started is `npm ci && npm run start`

## Troubleshooting!

There can be some wonk with multiple react dependencies and whatnot.
If the example seems to be mysteriously crashing, delete use-manifest/node_modules and maybe redo
`npm ci` here in example-project before trying `npm run start` again.