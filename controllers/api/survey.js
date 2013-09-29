var Firebase = require('firebase'),
	fb = new Firebase('https://teamwinit.firebaseio.com/surveys');

exports.increment = function(req, res) {
	var activity_id = req.params.activity_id,
	    survey_id = req.params.survey_id,
	    activity = req.body;
	activityRef = fb.child(survey_id+"/activities/"+activity_id);
	activityRef.once('value', function(snapshot) {
		if(snapshot.val() === null) {
			activity.score = 1;
			activityRef.setWithPriority(activity, 9999)
		} else {
			activity.score = snapshot.val().score + 1;
			activityRef.setWithPriority(activity, 9999);
		}
		res.json({status: 'done'});
	});
};

exports.create = function(req, res) {
	var type = req.body.type, 
	query = req.body.query,
	message = req.body.message,
	location = req.body.geoinfo.city,
	limit = req.body.limit;

	var ref = fb.push();
	ref.set({type: type, message: message, query: query, location: location, limit: limit});
	res.json({ id: ref.name() });
};