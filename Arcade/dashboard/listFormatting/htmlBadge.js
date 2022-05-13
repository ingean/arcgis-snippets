//Returns the HTML of a bootstrap style badge
function makeBadge(caption, bgColor) {
  var html = "<span style='"
  html += "border-radius:9999px;height:32px;width:80px;"
  html += "padding-left:5px;padding-right:5px;"
  html += "background:" + bgColor + ";"
  html += "font-size:10px;color:#FFFFFF"
  html += "'>" + caption + "</span>"
  return html
}

var badge = makeBadge('Caption here', '#C8E6C9')

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