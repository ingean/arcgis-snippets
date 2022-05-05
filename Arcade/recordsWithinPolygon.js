// For use in a layer popup
// Gets all features of another layer intersecting the feature
// Reports back some attribute info of the most recent feature within the polygon

var activities = FeatureSetById($map, '1809313d39e-layer-8')
var activitiesInArea = OrderBy(Intersects($feature, activities), "EditDate_1651734894290 DES")
var cnt = Count(activitiesInArea)
var activitiesInfo = "Ingen tidligere aktivitet i området"

if (cnt > 0) {
    var activity = First(activitiesInArea)
    activitiesInfo = "Sist besøkt <STRONG>" + 
    Text(activity.EditDate_1651734894290, "D.M.Y HH:mm:ss") +
    "</STRONG> av <STRONG>" + activity.Editor_1651734894290 + "</STRONG>"
}

return { 
	type : 'text', 
	text : activitiesInfo
}
