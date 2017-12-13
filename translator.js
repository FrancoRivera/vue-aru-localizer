'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translate = translate;

var alt_search = function alt_search(locale, path) {
  return locale && path.length ? alt_search(locale[path.shift()], path) : locale;
};

var search = function search(locale, path) {
  if (Array.isArray(path)){return alt_search(locale, path)
  }
  var valor = locale[path];

  return locale && path.length ? valor  : locale;
};

var replace = function replace(entry, repls) {
  if (!repls) return entry;
  return entry.replace(/{(\w+)}/g, function (match, index) {
    return repls[index] !== undefined ? repls[index] : match;
  });
};

function translate(locales, lang, path, repls) {
  if (!locales) return;
  var entry = search(locales[lang], path.split('.'));
  if (typeof entry === 'string') {

    return replace(entry, repls);
  }
  else{
   if (Array.isArray(entry)) {
    var str= ""
    for (var i = 0; i < entry.length; i++){
      str+= entry[i]
    }
    var replaced = replace(str, repls)

    if (typeof replaced === 'string') {
     return entry
    }
    return replaced;
  }

  }
}