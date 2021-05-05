// Returns a background color hex if feature was edited today

var bgColor = ''

if (DateDiff(Now(), $datapoint.EditDate, 'days') < 1) {
  bgColor = '#C8E6C9';
}

return {
  textColor: '',
  backgroundColor: bgColor,
  separatorColor:'',
  selectionColor: '',
  selectionTextColor: '',
  //attributes: {
      //attribute1: value1,
      //attribute2: value2
  //}
}