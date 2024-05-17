Marscore
=======

A pure and simple javascript Marscoin API.

## Principles

Marscoin is a powerful new peer-to-peer platform for the next generation of financial technology. The decentralized nature of the Marscoin network allows for highly resilient Marscoin infrastructure, and the developer community needs reliable, open-source tools to implement Marscoin apps and services.

## Get Started

You can run marscore on any javascript engine. It's distributed through npm, and you can also find compiled single files here: [marscore.js](http://missing-link) and [marscore.min.js](http://missing-link).

```
npm install marscore
```

Using it on node.js:

```javascript
var marscore = require('marscore');

assert(marscore.isValid(address));
var simpleTx = new marscore.Transaction();
var simpleTx.from(unspent).to(address, amount);
simpleTx.sign(privateKey);
```

## Documentation

The complete docs are hosted here: [marscore documentation](http://missing-link). There's also a [marscore API reference](http://missing-link) available generated from the JSDocs of the project.

## Security

Please use at your own risk.

marscore is still under heavy development and not quite ready for "drop-in" production use. If you find a security issue, please email security@marscoin.org.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement.

## Building the browser bundle

To build marscore full bundle for the browser:

```sh
gulp browser
```

This will generate files named `dist/marscore.js` and `dist/marscore.min.js`.

## Tests

Run all the tests:

```sh
gulp test
```

Run the tests with mocha:

```sh
gulp test:node
```

Run the tests with karma (uses firefox and chrome):

```sh
gulp test:browser
```

Create a coverage report (you can open `coverage/lcov-report/index.html` to visualize it):

```sh
gulp coverage
```

## License

Code released under [the MIT license](https://github.com/marscoin/marssight-lib/blob/master/LICENSE).

Copyright 2013-2024 Marscoin is a trademark maintained by the Marscoin Foundation, LLC.