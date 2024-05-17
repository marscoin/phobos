var requireWhenAccessed = function(name, file) {
  Object.defineProperty(module.exports, name, {
      get: function() {
          return require(file)
      }
  });
};

// Mapping the old module paths to new ones where applicable
requireWhenAccessed('Address', './lib/Address');
requireWhenAccessed('Base58', './lib/protocol/base58'); // Updated path
requireWhenAccessed('bufferput', 'bufferput');
requireWhenAccessed('buffertools', 'buffertools');
requireWhenAccessed('Buffers.monkey', './patches/Buffers.monkey'); // Assume unchanged
requireWhenAccessed('config', './config'); // Assume unchanged
requireWhenAccessed('const', './const'); // Assume unchanged
requireWhenAccessed('Deserialize', './lib/Deserialize'); // Assume unchanged
requireWhenAccessed('ECIES', './lib/ECIES'); // Assume unchanged
requireWhenAccessed('log', './util/log'); // Assume unchanged
requireWhenAccessed('networks', './networks'); // Assume unchanged
requireWhenAccessed('SecureRandom', './lib/SecureRandom'); // Assume unchanged
requireWhenAccessed('sjcl', './lib/sjcl'); // Assume unchanged
requireWhenAccessed('util', './util/util'); // Assume unchanged
requireWhenAccessed('EncodedData', './util/EncodedData'); // Assume unchanged
requireWhenAccessed('VersionedData', './util/VersionedData'); // Assume unchanged
requireWhenAccessed('BinaryParser', './util/BinaryParser'); // Assume unchanged
requireWhenAccessed('AuthMessage', './lib/AuthMessage'); // Assume unchanged
requireWhenAccessed('HierarchicalKey', './lib/HierarchicalKey'); // Assume unchanged
requireWhenAccessed('BIP21', './lib/BIP21'); // Assume unchanged
requireWhenAccessed('BIP39', './lib/BIP39'); // Assume unchanged
requireWhenAccessed('BIP39WordlistEn', './lib/BIP39WordlistEn'); // Assume unchanged
requireWhenAccessed('Point', './lib/crypto/point'); // Updated path
requireWhenAccessed('Opcode', './lib/opcode'); // Updated path
requireWhenAccessed('Script', './lib/Script'); // Updated path
requireWhenAccessed('Transaction', './lib/Transaction'); // Updated path
requireWhenAccessed('TransactionBuilder', './lib/TransactionBuilder'); // Assume unchanged
requireWhenAccessed('Connection', './lib/Connection'); // Assume unchanged
requireWhenAccessed('PayPro', './lib/PayPro'); // Assume unchanged
requireWhenAccessed('Peer', './lib/Peer'); // Assume unchanged
requireWhenAccessed('Block', './lib/Block'); // Updated path
requireWhenAccessed('ScriptInterpreter', './lib/ScriptInterpreter'); // Assume unchanged
requireWhenAccessed('Bloom', './lib/Bloom'); // Assume unchanged
requireWhenAccessed('Key', './lib/Key'); // Assume unchanged
requireWhenAccessed('SINKey', './lib/SINKey'); // Assume unchanged
requireWhenAccessed('SIN', './lib/SIN'); // Assume unchanged
requireWhenAccessed('PrivateKey', './lib/PrivateKey'); // Assume unchanged
requireWhenAccessed('RpcClient', './lib/RpcClient'); // Assume unchanged
requireWhenAccessed('Wallet', './lib/Wallet'); // Assume unchanged
//requireWhenAccessed('WalletKey', './lib/WalletKey'); // Assume unchanged
requireWhenAccessed('PeerManager', './lib/PeerManager'); // Assume unchanged
requireWhenAccessed('Message', './lib/Message'); // Assume unchanged
requireWhenAccessed('Electrum', './lib/Electrum'); // Assume unchanged
requireWhenAccessed('Armory', './lib/Armory'); // Assume unchanged
requireWhenAccessed('NetworkMonitor', './lib/NetworkMonitor'); // Assume unchanged

// Deprecated properties with updated references
Object.defineProperty(module.exports, 'BIP32', {
get: function() {
  console.log('BIP32 is deprecated. Use bitcore.HierarchicalKey instead.');
  return require('./lib/HierarchicalKey');
}
});
module.exports.Buffer = Buffer;
