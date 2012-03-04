/*
 * Responsive Profiles
 */
exports.desktop = function(req, res){
  res.render('desktop', { layout: 'basic' });
};

exports.iphone = function(req, res){
  res.render('iphone', { layout: 'mobile' });
};