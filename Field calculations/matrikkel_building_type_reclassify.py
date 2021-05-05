###############################################################################
##        Reclassifies Matrikkelen buildings into fewer                      ##
##        and more useful builing types based on bygningstype                ##
##                                                                           ##
##        ArcGIS Pro 2.6.3                                                   ##        
##                                                                           ## 
##        December 2020                                                      ##
##        inge.anundskas@geodata.no                                          ##
###############################################################################

def reclassify(byggtype):
	str = byggtype.lower()
	bolig = ["bolig", "våningshus", "rekkehus", "bofellesskap", "kjede/atrium", "terrasse"]
	skole = ["skole","universitet", "barnehage"]
	ind = ["fabrikk","industri", "verksted", "rense", "vannfors"]
	emer = ["politi","brann", "ambulanse"]
	helse = ["helse","behandling", "omsorg", "pleie", "rehabili", "syke", "bo- og service"]
	trans = ["terminal","universitet", "veg", "trafikk", "flyterm", "stasjon"]
	naring = ["forretning","kontor", "bank", "bensin", "butikk", "kjøpesenter", "restaurant", "kafe", "hotell", "messe", "konferanse"]
	kultur = ["idrett","bede", "kapell", "kirke", "meninghet", "kino", "museum", "kunst", "galleri", "samfunns", "grende"]
	fritid = ["fritids","hytte"]
	land = ["dyr","landbr"]

	if any(x in str for x in bolig):
		return "Bolig"
	if any(x in str for x in skole):
		return "Undervisning"
	if any(x in str for x in ind):
		return "Industri"
	if any(x in str for x in emer):
		return "Nødetat"
	if any(x in str for x in helse):
		return "Helse"
	if any(x in str for x in trans):
		return "Samferdsel"
	if any(x in str for x in naring):
		return "Næring"
	if any(x in str for x in land):
		return "Landbruk"
	if any(x in str for x in kultur):
		return "Kultur og idrett"
	if any(x in str for x in fritid):
		return "Ferie og fritid"
	else:
		return "Annet"