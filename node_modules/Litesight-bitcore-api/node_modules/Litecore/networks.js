var Put = require('bufferput');
var buffertools = require('buffertools');
var hex = function(hex) {
  return new Buffer(hex, 'hex');
};

exports.livenet = {
  name: 'livenet',
  magic: hex('fbc0b6db'),
  addressVersion: 0x32,
  privKeyVersion: 0xb0,
  P2SHVersion: 5,
  hkeyPublicVersion: 0x0488c42e,
  hkeyPrivateVersion: 0x0488e1f4,
  genesisBlock: {
    hash: hex('9952685ace021ec9c8dc58ba16083b8a798c039ab5624c2e5df14466f805e006'),
    merkle_root: hex('b9594f964ad5d42bd99edbfaaeeec900cd0f7563a14d90982cf6675df98d7863'),
    height: 0,
    nonce: 2084524493,
    version: 1,
    prev_hash: buffertools.fill(new Buffer(32), 0),
    timestamp: 1317972665,
    bits: 504365040,
  },
  dnsSeeds: [
    'dnsseed.marscoin.org',
    'dnsseed.marscoin.ru'
  ],
  defaultClientPort: 9333
};

exports.mainnet = exports.livenet;

exports.testnet = {  //not setup for marscoin yet
  name: 'testnet',
  magic: hex('0b110907'),
  addressVersion: 0x6f,
  privKeyVersion: 239,
  P2SHVersion: 196,
  hkeyPublicVersion: 0x043587cf,
  hkeyPrivateVersion: 0x04358394,
  genesisBlock: {
    hash: hex('43497FD7F826957108F4A30FD9CEC3AEBA79972084E90EAD01EA330900000000'),
    merkle_root: hex('3BA3EDFD7A7B12B27AC72C3E67768F617FC81BC3888A51323A9FB8AA4B1E5E4A'),
    height: 0,
    nonce: 265310,
    version: 1,
    prev_hash: buffertools.fill(new Buffer(32), 0),
    timestamp: 1392281929,
    bits: 486604799,
  },
  dnsSeeds: [
    'xx',
    'xx'
  ],
  defaultClientPort: 19333
};
