
function deltaTime(date, floor, unit1, unit2, suffix) {
  var diff = dateadd(date, floor, unit1)
  if (suffix == 'til') {
    diff = dateadd(date, -floor, unit1)
  }        
  return abs(datediff(now(), diff, unit2))
}

function relativeTime(value1, value2, unit1, unit2, suffix) {
  if (floor(value2) > 0) {
    return round(value1) + " " + unit1 + " og " + round(value2) +  " " + unit2 +  " " + suffix
  } else {
    return round(value1) + " " + unit1 + " " + suffix
  }
}

function formatTimeDelta(date){
  var minutes = DateDiff(now(),date, "minutes")
  var suffix = "siden"
  if (minutes < 0) { suffix = "til" }
  var minutes = abs(minutes)
  var hours = abs(DateDiff(now(),date, "hours"))
  var days = abs(DateDiff(now(),date, "days"))
  
  if (minutes < 60){
      return round(minutes) + " minutter " + suffix
  }
  if (minutes >= 60){
      if (hours < 24){
          var tFloor = floor(hours)
          var deltaMin = deltaTime(date, hours, 'hours', 'minutes', suffix)
          return relativeTime(hours, deltaMin, 'timer', 'minutter', suffix)
      } else {
          var dFloor = floor(days)
          var deltaHrs = deltaTime(date, days, 'days', 'hours', suffix)
          return relativeTime(days, deltaHrs, 'dager', 'timer', suffix)          
      }
  }
}

var relativeTime = formatTimeDelta($datapoint.duedate)

var bgColor = ''

if (DateDiff(Now(), $datapoint.EditDate, 'days') < 1) {
  bgColor = '#C8E6C9';
}

if (DateDiff(Now(), $datapoint.duedate, 'seconds') > 0) {
  bgColor = '#eb4034';
}


var status = DomainName($datapoint,"status")

return {
  textColor: '',
  backgroundColor: bgColor,
  separatorColor:'',
  selectionColor: '',
  selectionTextColor: '',
    attributes: {
      relativeTime: relativeTime,
      //attribute2: value2
  }
}