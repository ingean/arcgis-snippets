//Returns the edit date as text of the last edited related record of a feature

var relationName = 'Inspeksjoner' // Name of the relationship between the feature and records
var relatedRecords = OrderBy(FeatureSetByRelationshipName($feature, relationName), "EditDate");
var cnt = Count(relatedRecords);

var relatedInfo = "";
if (cnt > 0) {
    var info = First(relatedRecords);
    relatedInfo = Text(ToLocal(info.EditDate), "D/M/Y HH:mm:ss");
    // relatedInfo = info.Status // Gets the status of the last edited related record of the feature
}

return relatedInfo;