/**
 * Module dependencies.
 */
var debug = require('debug')('glint-plugin-block-style-editable');
var fs = require('fs');
var insertCss = require('insert-css');

/**
 * Variables
 */
var style = 'glintcms-block';
var styleHover = 'glintcms-block-hover';
var styleEdit = 'glintcms-block-edit';
var css = fs.readFileSync(__dirname + '/style.css');

/**
 * Style Block Plugin
 */
module.exports = function (options) {
  options = options || {};

  plugin.api = 'block-plugin';
  function plugin (block) {
    block.on('pre-load', function () {
      insertCss(css);
      var el = block.el();
      if (options.hover && el) {
        el.classList.add(styleHover);
      }
    });

    block.on('pre-edit', function () {
      var el = block.el();
      if (el) el.classList.add(styleEdit);
    });

    block.on('pre-save', function () {
      var el = block.el();
      if (el) el.classList.remove(styleEdit);
    });

    block.on('pre-cancel', function () {
      var el = block.el();
      if (el) el.classList.remove(styleEdit);
    });
  }
  return plugin;

};
