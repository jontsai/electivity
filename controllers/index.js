
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('partials/default');
};

exports.templates = function (req, res) {
  var name = req.params.name;
  res.render('templates/' + name);
};

exports.subtemplates = function (req, res) {
  var name = req.params.name;
  var directory = req.params.directory;
  res.render('templates/' + directory + '/' + name);
};
