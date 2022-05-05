var activities = OrderBy(FeatureSetByRelationshipName($feature,"Aktiviteter"),"EditDate DES")
var cnt = Count(activities)
var activityInfo = ""

if (cnt > 0) {
    var activity = First(activities)
    activityInfo = "<STRONG>" + activity.Status + "</STRONG> " +
    Text(activity.EditDate, "D.M.Y HH:mm:ss") +
    " (1 av " + cnt + ")"
    
} else {
    activityInfo = "Ingen aktiviteter registrert på denne bruksenheten"
}

return { 
	type : 'text', 
	text : activityInfo
}
