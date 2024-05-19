const CryptoJS = require('crypto-js');

export function doubleMd5Reversed(password) {
    // 第一次 MD5 加密
    const firstHash = CryptoJS.MD5(password).toString();
    // 反转字符串
    const reversedHash = firstHash.split('').reverse().join('');
    // 第二次 MD5 加密
    const secondHash = CryptoJS.MD5(reversedHash).toString();
    return secondHash;
}