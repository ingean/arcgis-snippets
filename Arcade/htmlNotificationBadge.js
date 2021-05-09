//Returns the HTML of a small colored circle
function makeBadge(color) {
  var html = "<span style='"
  html += "border-radius:50%;height:5px;width:5px;"
  html += "padding-left:5px;padding-right:5px;"
  html += "background-color:" + color + ";"
  html += "display: inline-block'></span>"
  return html
}

var badge = makeBadge('#C8E6C9')

return {
  textColor: '',
  backgroundColor: '',
  separatorColor:'',
  selectionColor: '',
  selectionTextColor: '',
   attributes: {
    badge: badge
   }
}

