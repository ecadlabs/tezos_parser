import { Buffer } from 'buffer';
const bs58check = require('bs58check');
export function b58cencode(payload, prefix) {
  payload = Uint8Array.from(Buffer.from(payload, 'hex'));

  const n = new Uint8Array(prefix.length + payload.length);
  n.set(prefix);
  n.set(payload, prefix.length);

  return bs58check.encode(Buffer.from(n.buffer));
}

export function b58decode(payload) {
  const buf: Buffer = bs58check.decode(payload);
  const buf2hex = function(buffer) {
    const byteArray = new Uint8Array(buffer),
      hexParts = [] as any[];
    for (let i = 0; i < byteArray.length; i++) {
      let hex = byteArray[i].toString(16);
      let paddedHex = ('00' + hex).slice(-2);
      hexParts.push(paddedHex);
    }
    return hexParts.join('');
  };

  const prefix = {
    [new Uint8Array([6, 161, 159]).toString()]: '0000',
    [new Uint8Array([6, 161, 161]).toString()]: '0001',
    [new Uint8Array([6, 161, 164]).toString()]: '0002'
  };

  let pref = prefix[new Uint8Array(buf.slice(0, 3)).toString()];
  if (pref) {
    const hex = buf2hex(buf.slice(3));
    return pref + hex;
  } else {
    return '01' + buf2hex(buf.slice(3, 42)) + '00';
  }
}

export function encodePubKey(value) {
  if (value.substring(0, 2) === '00') {
    const prefix = {
      '0000': new Uint8Array([6, 161, 159]),
      '0001': new Uint8Array([6, 161, 161]),
      '0002': new Uint8Array([6, 161, 164])
    };

    return b58cencode(value.substring(4), prefix[value.substring(0, 4)]);
  }

  return b58cencode(value.substring(2, 42), new Uint8Array([2, 90, 121]));
}
