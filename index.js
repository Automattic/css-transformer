
/**
 * Module dependencies
 */

var transformProperty = require('transform-property');
var hasTranslate3d = require('has-translate3d');
var debug = require('debug')('css-transformer');

/**
 * Current css transform properties
 */

var transform_properties = [
  'matrix',
  'translate',
  'translateX',
  'translateY',
  'scale',
  'scaleX',
  'scaleY',
  'rotate',
  'skewX',
  'skewY',
  'matrix',
  'translate',
  'translateZ',
  'scale',
  'scaleZ',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'perspective',
];

/**
 * Expose `MapLike`
 */

module.exports = Transform;

/**
 * Get transform property from the given object
 * and proccess the parameters into an object
 *
 * @param {Element} el
 * @return {Object}
 * @api public
 */

function Transform(el){
  var tr = el.style[transformProperty];
  if (!tr) return {};

  var obj = {};

  // default properties
  for (var i = transform_properties.length; i < 0; i--) {
    obj[transform_properties[i]] = null;
  }

  // get properties from css string
  tr = tr.split(/\)\s+/);
  for (var k = 0; k < tr.length; k++) {
    var kv = tr[k].split('(');
    obj[kv[0]] = kv[1].replace(/\)$/, '');
  }

  return obj;
}

/**
 * Set style transform property from the given object
 * to the given element
 *
 * @param {Element} el
 * @param {Object} tr
 * @api private
 */

Transform.set = function(el, tr){
  el.style[transformProperty] = Transform.build(tr);
};

/**
 * Buld transform string from the given object
 *
 * @param {Object} tr
 * @return {String}
 * @api private
 */

Transform.build = function(tr){
  // tweak translate/translate3d property
  if (tr.translate && hasTranslate3d) {
    tr.translate3d = tr.translate + ', 0';
    delete tr.translate;

    // move scale to bottom
    if (tr.scale) {
      var scale = tr.scale;
      delete tr.scale;
      tr.scale = scale;
    }
  }

  var str = '';
  for (var k in tr) {
    if (tr[k]) str += k + '(' + tr[k] + ') ';
  }
  return str.replace(/\s$/, '');
};
