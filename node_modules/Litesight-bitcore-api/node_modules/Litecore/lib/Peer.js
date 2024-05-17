var Net = require('net');
var Put = require('bufferput');
var BufferReader = require('./protocol/bufferreader');
var BufferWriter = require('./protocol/bufferwriter');

function Peer(host, port, services) {
  if ("string" === typeof host) {
    if (host.indexOf(':') && !port) {
      var parts = host.split(':');
      host = parts[0];
      port = parts[1];
    }
    this.host = host;
    this.port = +port || 8333;
  } else if (host instanceof Peer) {
    this.host = host.host;
    this.port = host.port;
  } else if (Buffer.isBuffer(host)) {
    const reader = new BufferReader(host);
    // Assuming the IPV6_IPV4_PADDING is a buffer to compare with the start of `host`
    const IPV6_IPV4_PADDING = Buffer.alloc(12); // Adjust this buffer to match the expected padding
    if (Buffer.compare(IPV6_IPV4_PADDING, reader.read(12)) !== 0) {
      throw new Error('IPV6 not supported yet! Cannot instantiate host.');
    }
    this.host = Array.prototype.slice.apply(host.slice(12)).join('.');
    this.port = +port || 8333;
  } else {
    throw new Error('Could not instantiate peer, invalid parameter type: ' +
      typeof host);
  }

  this.services = (services) ? services : null;
  this.lastSeen = 0;
};

Peer.IPV6_IPV4_PADDING = new Buffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255]);

Peer.prototype.createConnection = function() {
  this.connection = Net.createConnection(this.port, this.host);
  return this.connection;
};

Peer.prototype.getHostAsBuffer = function() {
  return new Buffer(this.host.split('.'));
};

Peer.prototype.toString = function() {
  return this.host + ":" + this.port;
};

Peer.prototype.toBuffer = function() {
  var put = new Put();
  put.word32le(this.lastSeen);
  put.word64le(this.services);
  put.put(this.getHostAsBuffer());
  put.word16be(this.port);
  return put.buffer();
};

module.exports = Peer;
