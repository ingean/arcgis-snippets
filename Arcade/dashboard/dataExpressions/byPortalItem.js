var GIS = Portal('https://geodata.maps.arcgis.com');
var itemId = 'c28513ff870c4ad09dd7f32531ab78cb';
var layerId = 0;

var data = FeatureSetByPortalItem(GIS, itemId, layerId);

return data;