/*
 * GET name
 */

var {%dot_name%} = {}

{%dot_name%} = function(req, res){
  res.render('{%path%}', { title: '{%dot_name%}' });
};

module.exports = {%dot_name%};
