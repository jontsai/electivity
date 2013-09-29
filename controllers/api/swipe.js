var Firebase = require('firebase'),
	fb = new Firebase('https://teamwinit.firebaseio.com');

exports.yes = function(req, res) {
	var activity_id = req.params.activity_id,
	    survey_id = req.params.survey_id;
	activityRef = fb.child(survey_id+"/activities/"+activity_id);
	activityRef.once('value', function(snapshot) {
	  if(snapshot.val() === null) {
	    console.log('adding new value');
	    activityRef.setWithPriority({ activity_id: activity_id, score: 1}, 9999)
	  } else {
	  	console.log('incrementing value');
	    activityRef.setWithPriority({ activity_id: activity_id, score: snapshot.val().score + 1}, 9999);
	  }
	  res.json({status: 'done'});
	});
};