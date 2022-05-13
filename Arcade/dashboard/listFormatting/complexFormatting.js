// Icons
var timerIcon = '<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor"><path d="M26.518 4l-1.95 1.95a13.352 13.352 0 1 0 3.293 3.67L30 7.482zM28.8 16.5A12.3 12.3 0 1 1 16.5 4.2a12.314 12.314 0 0 1 12.3 12.3zm-1.361-7.994L25.494 6.56l1.086-1.085 1.944 1.944zM17 17h8v1h-9V7h1zm3-15h-7V1h7z"></path></svg>'
var checkIcon = '<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor"><path stroke-width="2" d="M13.5 22.142L7.59 16.42l.636-.636L13.5 20.87 26.721 7.8l.637.637z"></path></svg>'

// Item layout
function sectionsTitleHTML(title) {
  return '<div style="font-size:' + title.size + '; font-weight:800; color:' + title.color + '">' + title.caption + '</div>'
}

function textSectionHTML(section) {
  return '<div style="' +
    'color:' + section.color + '; ' +
    'font-size:' + section.size + '; ' + 
    'padding:0.2rem 0.3rem 0.2rem 0; ">' + 
      section.caption + '</div>';
}

function textSectionsHTML(sections) {
  var html = '';
  for (var i in sections) {
    html += textSectionHTML(sections[i]) 
  }
  return html
}

function sectionsHTML(title, sections) {
  return '<div style="flex:1 1 auto; vertical-align:top">' + 
         title + 
         sections +
         '</div>' 
} 

function iconHTML(icon) {
  return '<div style="flex:0 1 auto; margin-left:1rem; margin-right:1rem; padding:0.5rem 0.1rem; text-align:center; vertical-align:middle">' + icon + '</div>'
}


function itemToHTML(item) {
  return '<div style="display:flex; width:100%; ' + 
                     'border-' + item.border.side + ':' + item.border.size +' solid ' + item.border.color + '; ' + 
                     'margin-left:-5px; ' + 
                     'padding:0.4rem 0.5rem 0.1rem 0.5rem;">' +
            sectionsHTML(sectionsTitleHTML(item.title), textSectionsHTML(item.sections)) +
            iconHTML(item.icon) + '</div>'
}


var item = {
  "textColor": 'charcoal',
  "backgroundColor": '',
  "separatorColor": '',
  "selectionColor": '',
  "selectionTextColor": '',
  "border": {
    "color": 'red',
    "side": 'left',
    "size": '10px'
  },
  "title": {
    "caption": 'Title',
    "color": 'charcoal',
    "size": '14px'
  },
  "sections": [
    {
      "caption": 'Line 1', 
      "color": 'charcoal',
      "size": '12px'
    },
    {
      "caption": 'Time is ' + Text(Now(), 'D.MMM HH:ss'), 
      "color": 'gray',
      "size": '12px'
    },
  ],
  "icon": timerIcon
}

var itemHTML = itemToHTML(item);

return {
  textColor: item.textColor,
  backgroundColor: item.backgroundColor,
  separatorColor: item.separatorColor,
  selectionColor: item.selectionColor,
  selectionTextColor: item.selectionTextColor,
    attributes: {
      content: itemHTML,
      title: item.title.caption, 
      section1: item.sections[0].caption,
      section2: item.sections[1].caption, 
      icon: item.icon
  }
}