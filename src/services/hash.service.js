//import VueCryptojs from 'vue-cryptojs'
var CryptoJS = require("crypto-js");

const HashService = {
    encrypt: (token) => {
       return CryptoJS.AES.encrypt(JSON.stringify(token), process.env.VUE_APP_PASSPHRASE).toString()
    },
    decrypt: (token) => {
        return CryptoJS.AES.decrypt(token.toString(), process.env.VUE_APP_PASSPHRASE).toString(CryptoJS.enc.Utf8)
    }
}

export default HashService;