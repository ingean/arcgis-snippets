var GIS = Portal('https://testkommune.maps.arcgis.com');
var fs = FeatureSetByPortalItem(
    GIS,
    'e5bf6a67d0c245099ee7f2e2857fc228',
    0,
    ['hvordan_fungerte_qr_kodene'], // Felt som skal konverteres fra tekst til nummer
    false
);

// Create empty array for features and feat object
var features = [];
var feat;

// Konverterer tekstfelt til tall 
for (var feature in fs) {   
    feat = {
        'attributes': {
            'Poengsum': Number(DomainName(feature, 'hvordan_fungerte_qr_kodene'))
        }
    }
    Push(features, feat);
}

var result = { 
    'fields': [
        {'name':'Poengsum', 'type':'esriFieldTypeInteger'}], 
    'geometryType': '', 
    'features': features
};

// Konverterer til featureset
return FeatureSet(Text(result));
