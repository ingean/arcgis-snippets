//Returns the HTML of a stage bar
function makeStageBar(stage) {
  var html = ''
  for (var i = 0; i <= stage; i++) {
      html += '<span style="height:5px;width:40px;'
      html += 'background-color:#9e9e9e;'
      html += 'display:inline-block;margin:1px;"></span>'
  }
  return html
}

function findStage(status) {
  if (status >= 3) { 
      return 3 //Show full statusbar
  } else {
      return status
  }
}

//Status is from ArcGIS Workforce dataset
var stage = findStage($datapoint.status)
var stageBar = makeStageBar(stage)

return {
  textColor: '',
  backgroundColor: '',
  separatorColor:'',
  selectionColor: '',
  selectionTextColor: '',
   attributes: {
    stageBar: stageBar
   }
}