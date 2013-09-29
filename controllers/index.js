
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('partials/default');
};

exports.templates = function (req, res) {
  var name = req.params.name;
  res.sendfile('views/templates/' + name + '.html');
};

exports.subtemplates = function (req, res) {
  var name = req.params.name;
  var directory = req.params.directory;
  res.sendfile('views/templates/' + directory + '/' + name + '.html');
};
