# use-manifest example

This project attempts to be a mostly-understandable usage of use-manifest.

It has also helped greatly with sorting out use-manifest's type system without pulling in a much
bigger project 😊

All you should have to do to get started is `npm ci && npm run start`

## Troubleshooting!

There is currently some dependency wonk in place.
`npm run start` will automatically clear use-manifest's `node_modules/` directory, but this requires
doing `npm ci` in use-manifest before `npm run build` will work again.

If anyone can figure out a way to get around that I will be eternally grateful.