var Firebase = require('firebase'),
	fb = new Firebase('https://teamwinit.firebaseio.com/surveys');

exports.increment = function(req, res) {
	var activity_id = req.params.activity_id,
	    survey_id = req.params.survey_id;
	activityRef = fb.child(survey_id+"/activities/"+activity_id);
	activityRef.once('value', function(snapshot) {
		if(snapshot.val() === null) {
			activityRef.setWithPriority({ activity_id: activity_id, score: 1}, 9999)
		} else {
			activityRef.setWithPriority({ activity_id: activity_id, score: snapshot.val().score + 1}, 9999);
		}
		res.json({status: 'done'});
	});
};

exports.create = function(req, res) {
	var type = req.body.type, 
	location = req.body.location;

	var ref = fb.push();
	ref.set({type: type, location: location});
	res.json({ id: ref.name() });
};