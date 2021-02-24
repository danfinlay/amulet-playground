const sha256 = require('./sha256.js');
const RARITIES = [["8888", "a common"],
                  ["88888", "an uncommon"],
                  ["888888", "a rare"],
                  ["8888888", "an epic"],
                  ["88888888", "a legendary"],
                  ["888888888", "a mythic"]];

const message = `this amulet is a simple token which proves my love's truth`;

const hashDigest = sha256(message);
console.log(evaluatePoem(hashDigest));

function evaluatePoem(text) {
    let textBytes = byteLength(text);

    if (textBytes > 64) {
      return false;
    }

    let textHash = sha256(text);

    let foundRarity = false;
    let bestFoundRarity;

    for (let i = 0; i < RARITIES.length; i++) {
      let rarity = RARITIES[i];
      if (textHash.includes(rarity[0])) {
        foundRarity = true;
        bestFoundRarity = rarity;
      } else {
        break;
      }
    }

    return foundRarity;
  }

  function byteLength(str) {
    // returns the byte length of an utf8 string
    var s = str.length;
    for (var i=str.length-1; i>=0; i--) {
      var code = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) s++;
      else if (code > 0x7ff && code <= 0xffff) s+=2;
      if (code >= 0xDC00 && code <= 0xDFFF) i--; // trail surrogate
    }
    return s;
  }
