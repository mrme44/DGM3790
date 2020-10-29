import authFormContext from './contexts/authForm.js';
import AuthContextProvider from './contexts/auth';

function randStr(len) {
  const dec2hex = (dec) => dec < 10 ? '0' + String(dec) : dec.toString(16);
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

const salt = randStr(10);

async function hashPassword(username, passwd) { // uses sha256
    passwd = username + salt + passwd

    const msgBuffer = new TextEncoder('utf-8').encode(passwd);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert the resulting ArrayBuffer to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

    return hashHex;
}

async function verifyPasswd(username, password, hash){
    return (await(username, password) === hash)
}

function login(username, email){
    AuthContextProvider.login(username, email)
}

function logout(){
    AuthContextProvider.logout('', '')
}

export {hashPassword, verifyPasswd, login, logout}
