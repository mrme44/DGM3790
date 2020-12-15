function randStr(len) {
  const dec2hex = (dec) => dec < 10 ? '0' + String(dec) : dec.toString(16);
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

async function _hashPassword(username, passwd, salt){
    passwd = salt + passwd
    const msgBuffer = new TextEncoder('utf-8').encode(passwd);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert the resulting ArrayBuffer to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

    return hashHex
}

async function hashPassword(username, passwd) { // uses sha256
    const salt = randStr(10)

    const hash = await _hashPassword(username, passwd, username+salt)

    return salt + ':' + hash;
}

async function verifyPasswd(username, password, salt_hash){
    const [salt, hash] = salt_hash.split(':')
    return (await _hashPassword(username, password, username+salt) === hash)
}

export {hashPassword, verifyPasswd}
