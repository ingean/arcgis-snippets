/* ---------- Read Me ---------- 
This expression is used to display information 
about an incident as it passes through multiple
stages. The data structure is such that each 
stage has a respective date field associated 
with it. A stage is considered complete if it
has a non-null date that is in the past.
Skip down to "Relevant Data" section to 
enter your data and logic.
*/

/* ---------- Functions ---------- */
// Create info icon 
function createInfoIcon(icon, line1, line2, color1, color2) {
    if (IsEmpty(icon)) { icon = '<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor"><path d="M16.5 9.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1zM17 23V12h-2v1h1v10h-1v1h3v-1zm12.8-6.5A13.3 13.3 0 1 1 16.5 3.2a13.3 13.3 0 0 1 13.3 13.3zm-1 0a12.3 12.3 0 1 0-12.3 12.3 12.314 12.314 0 0 0 12.3-12.3z"></path></svg>'; }
    var HTML = '';
    // HTML += '<div style="color:' + color1 + '; background-color:' + color2 + '; height: 45px; width: 45px; padding-top:0.40rem ; border-radius:50%; line-height:1.7; overflow:none; text-align:center; vertical-align:middle; ">';
    if (!IsEmpty(icon)) { HTML += '<span style="color:' + color1 + '">' + icon + '</span>' }
    if (!IsEmpty(line1)) { HTML += '<p style="color:' + color1 + '">' + line1 + '</p>' }
    if (!IsEmpty(line2)) { HTML += '<p style="color:' + color1 + '">' + line2 + '</p>' }
    // HTML += '</div>'
    return HTML;
}

// Create HTML table. Pass in [{color:'', label: ''}]
function createProgressBar(dataArray) {
    var cellWidth = Floor(100/Count(dataArray),2) + '%';
    var HTML = '';
    HTML += '<table style="border-collapse:separate; border-spacing:2px 4px; margin:0px -2px; max-width:500px; table-layout:fixed; width:100%">';
	HTML += '<tbody>';
    HTML += '<tr height="">';
	HTML += '<tr height="10">';
    for (var i in dataArray) {
        HTML += '<td style="text-align:center; width:' + cellWidth + '; background-color:' + dataArray[i].color + '"></td>';
    }
    HTML += '</tr>';
    for (var i in dataArray) {
        HTML += '<td style="text-align: center; width:' + cellWidth + '; padding: 0px; opacity:0.7; word-wrap: break-word;">' + dataArray[i].label + '</td>';
    }
    HTML += '</tr>';
    HTML += '</tbody>';
    HTML += '</table>';
    return HTML;
}

// Create a notification
function createNotification(txt, color1, color2, icon) {
    var HTML = '<div style="border-left:2px solid ' + color1 + '; background-color:' + color2 + '; color:' + color1 + '; font-weight:600; box-shadow:0 4px 6px 0 hsla(0,0%,0%,0.2); margin:0.2rem 0 0 0; padding:0.4rem;">';
    if (!IsEmpty(icon)) { HTML += icon };
    if (!IsEmpty(txt)) { HTML += txt };
    HTML += '</div>';
    return HTML;
}

// Create a note
function createNote(txt, color1, color2) {
    var HTML = '<span style="font-family: monospace ; font-size: 0.85rem; color: ' + color1 + '; background-color: ' + color2 + '; padding: 0 5px; box-shadow:0 1px 2px 0 hsla(0,0%,50%,0.2)">';
    if (!IsEmpty(txt)) { HTML += txt };
    HTML += '</span>';
    return HTML;
}

// Create a badge
function createBadge(txt, color1, color2) {
    var HTML = '<span style="font-size:12.5px; opacity: 0.7; color:' + color1 + '; background-color:' + color2 + '; padding:1px 6px; border-radius:10px;">';
    if (!IsEmpty(txt)) { HTML += txt };
    HTML += '</span>';
    return HTML;
}

// Format elapsed time in one of two types ( 1 | 2 )
function formatElapsedTime(numSeconds, type) {
    if (IsEmpty(type)) { type = 1 };
    if (TypeOf(numSeconds) != 'Number' || IsEmpty(numSeconds)) { return '' }
    var days = Floor(numSeconds/(60*60*24),0)
    var relativeDate = DateAdd(Date(0,0,0,0,0,0), numSeconds, 'seconds');
    if (type == 1) {
        var elapsedTime = When(
            numSeconds < 60*60, Text(relativeDate,'mm:ss'),
            numSeconds < 60*60*24, Text(relativeDate,'H:mm:ss'),
            days + 'd ' + Text(relativeDate,'H:mm')
            );
        return elapsedTime;
    }
    if (type == 2) {
        var elapsedTime = When(
            numSeconds < 60, Text(relativeDate,'s') + 's',
            numSeconds < 60*60, Text(relativeDate,'m') + 'm',
            numSeconds < 60*60*24, Text(relativeDate,'H') + 'h ' + Text(relativeDate,'m') + 'm',
            days + 'd '
            );
        return elapsedTime; 
    }
}

// Enrich the stage data. Pass in array of dictionaries {id: 0, label: '', competionDate: dateField, threshold: 10 }
function enrichStages(stagesArray) {
    var numStages = Count(stagesArray);
    var latestCompletedStageIndex;
    var latestPendingStageIndex = 0;
    var enrichedStagesArray = stagesArray;
    
    for (var i in stagesArray) {
        var isNull = isEmpty(stagesArray[i].completionDate);
        var hasHappened = stagesArray[i].completionDate < Now() && !isNull;
        
        var nextStageIndex = i + 1;
        var prevStageIndex = i - 1;
        
        var secondsFromNow;
        var secondsToComplete;
        var isExceedingThreshold = false;
        var secondsExceedingThreshold = 0;
        
        if (hasHappened) {
            latestCompletedStageIndex = i;
            secondsFromNow = DateDiff(Now(), stagesArray[i].completionDate, 'seconds');

            if (nextStageIndex < numStages) {
                latestPendingStageIndex = stagesArray[nextStageIndex];
            }
            
            if (prevStageIndex >= 0) {
                secondsToComplete = DateDiff(stagesArray[i].completionDate, stagesArray[prevStageIndex].completionDate, 'seconds');
            }
            
            if (secondsFromNow > stagesArray[i].threshold && !IsEmpty(stagesArray[i].threshold)) {
                isExceedingThreshold = true;
                secondsExceedingThreshold = secondsFromNow - stagesArray[i].threshold;
            }
        }
        
        enrichedStagesArray[i].hasHappened = hasHappened;
        enrichedStagesArray[i].secondsFromNow = secondsFromNow;
        enrichedStagesArray[i].secondsToComplete = secondsToComplete;
        enrichedStagesArray[i].isExceedingThreshold = isExceedingThreshold;
        enrichedStagesArray[i].secondsExceedingThreshold = secondsExceedingThreshold;
        enrichedStagesArray[i].isLatestCompletedStage = false;
        enrichedStagesArray[i].isLatestPendingStage = false;
    }
    
    for (var i in enrichedStagesArray) {
        if (i == latestCompletedStageIndex) {
            enrichedStagesArray[i].isLatestCompletedStage = true;
        }
        if (i == latestPendingStageIndex) {
            enrichedStagesArray[i].isLatestPendingStage = true;
        }
    }
    
    return enrichedStagesArray
}

// Transform enriched stages to data for progress bar
function createProgressBarData(enrichedStages, hasHappenedColor, hasNotHappenedColor, latestCompletedStageColor, latestPendingStageColor, includeLastStage) {
    if (IsEmpty(includeLastStage)) { includeLastStage = true };
    var lengthOffset = 0;
    if (!includeLastStage) {
        lengthOffset = 1;
    }
    var dataArray = [];
    
    for (var i = 0; i < Count(enrichedStages) - lengthOffset; i++) {
        var color = hasNotHappenedColor;
        if (enrichedStages[i].hasHappened) { color = hasHappenedColor };
        if (enrichedStages[i].isLatestCompletedStage) { 
            color = latestCompletedStageColor; 
        };
        if (enrichedStages[i].isLatestPendingStage) { color = latestPendingStageColor };
        
        dataArray[i] = {
            color: color,
            label: enrichedStages[i].label
        }
    }
    Console(dataArray)
    return dataArray;
}

/* ---------- Relevant Data ---------- 
Enter relevant data to be used in the template 
and for logic in the expression.
*/

/* Enter your stage info.
Label represents stage when date has happened
If applicable, set a threshold for the acceptable 
number of seconds to reach the next stage */
var stages = [
    {
        id: 0,
        label: "Logged",
        completionDate: $datapoint["Response_Started_Date"], 
        threshold: 60
    },{
        id: 1,
        label: "Assigned",
        completionDate: $datapoint["Assigned_Date"], 
        threshold: 60
    },{
        id: 2,
        label: "Enroute",
        completionDate: $datapoint["Enroute_Date"],
        threshold: 5*60
    },{
        id: 3,
        label: "On Scene",
        completionDate: $datapoint["Arrived_At_Scene_Date"],
        threshold: 22*60
    },{
        id: 4,
        label: "Cleared",
        completionDate: $datapoint["Call_Cleared_Date"],
        threshold: null
    }
];


// Provide styles for various components
var styles = {
    backgroundColor: '',
    selectionColor: '#404040',
    separatorColor: '#',
    card: {
        textColor: '',
        backgroundColor: '#404040',
        leftBorderColor: '#404040',
        opacity: 1
    },
    completedCard: {
        textColor: '#787878',
        backgroundColor: '#242424',
        leftBorderColor: '#242424', //$datapoint.Color3,
        opacity: 1
    },
    progressBar: {
        hasHappened: '#959595',
        hasNotHappened: '#666666',
        latestCompletedStage: '#d1d1d1', //'#2D93EC',
        latestPendingStage: '#666666'
    },
    notification: {
        color1: 'rgba(255, 41, 20, 0.8)', //'rgba(255,255,255,1)', 
        color2: 'white' //'rgba(255, 192, 180, 1)' //
    }
}


// Icons for info area
var icons = {
    timer: '<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor"><path d="M26.518 4l-1.95 1.95a13.352 13.352 0 1 0 3.293 3.67L30 7.482zM28.8 16.5A12.3 12.3 0 1 1 16.5 4.2a12.314 12.314 0 0 1 12.3 12.3zm-1.361-7.994L25.494 6.56l1.086-1.085 1.944 1.944zM17 17h8v1h-9V7h1zm3-15h-7V1h7z"></path></svg>',
    checkMark: '<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor"><path stroke-width="2" d="M13.5 22.142L7.59 16.42l.636-.636L13.5 20.87 26.721 7.8l.637.637z"></path></svg>',
    exclamationMark: '<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor"><path d="M3.929 29h25.148a1.897 1.897 0 0 0 1.67-2.797L18.217 2.951a1.897 1.897 0 0 0-3.337-.005L2.261 26.198A1.897 1.897 0 0 0 3.93 29zm-.788-2.324L15.759 3.423a.896.896 0 0 1 1.577.002l12.531 23.253a.898.898 0 0 1-.79 1.322H3.93a.897.897 0 0 1-.788-1.324zM15.5 24.5a1 1 0 1 1 1 1 1.002 1.002 0 0 1-1-1zM17 21h-1V10h1z"></path></svg>'
}




/* ----- Business Logic ----- 
Use the following section process your data
and create your UI components. Define logic 
as needed to provide conditional formatting.
*/

// Process the stage data and create progress bar. To include last stage, set last parameter in progressBarData() to true.
var enrichedStages = enrichStages(stages);
var progressBarData = createProgressBarData(enrichedStages, styles.progressBar.hasHappened, styles.progressBar.hasNotHappened, styles.progressBar.latestCompletedStage, styles.progressBar.latestPendingStage, false);
var progressBar = createProgressBar(progressBarData);

// Identify when incident is cleared (if final stage is complete)
var lastStageIndex = Count(enrichedStages) - 1;
var isCleared = enrichedStages[lastStageIndex].hasHappened;

// Identify the latest completed stage
var currentStageIndex = 0;
for (var i in enrichedStages) {
    if (enrichedStages[i].hasHappened) { 
        currentStageIndex = i;
    }
}

// Determine the time elapsed since incident opened
var timeOpen = formatElapsedTime(enrichedStages[0].secondsFromNow,2);

// Identify when incident is open and exceeding threshold
var currentStageIsExceedingThreshold = enrichedStages[currentStageIndex].isExceedingThreshold == true && !isCleared;

// Provide info about current stage
var currentStageInfo = '';
if (currentStageIndex == 0) {
    currentStageInfo = 'New Entry: ' + $datapoint.Priority_Description;
}
else if (currentStageIndex == 1) {
    currentStageInfo = 'To Battalion ' + $datapoint.battalion + ' | Radio: ' + $datapoint.radio_name;
}
else if (currentStageIndex == 2) {
    currentStageInfo = 'Enroute to ' + $datapoint.Address + ', ' + $datapoint.city;
}
else if (currentStageIndex == 3) {
    currentStageInfo = 'At ' + $datapoint.Address + ', ' + $datapoint.city;
}
if (!IsEmpty(currentStageInfo)) {
    currentStageInfo = createNote(Left(currentStageInfo,50), '#9e9e9e', '#333333');
}    

/* ----- Return List Item Properties ----- 
If you want to return the same thing for every incident, use the following */
// return {
//       textColor: styles.card.textColor,
//       backgroundColor: styles.backgroundColor,
//       separatorColor: styles.separatorColor,
//       selectionColor: styles.selectionColor,
//       attributes: {
//         title: $datapoint.Problem,
//         section1: createBadge($datapoint["Master_Incident_Number"], '#242424', $datapoint.color3),
//         section2: currentStageInfo,
//         section3: progressBar, 
//         infoIcon: IIF(isCleared, createInfoIcon(icons.checkmark, 'Cleared', '', ''), createInfoIcon(icons.timer, 'Open', timeOpen, '')),
//         bkgColor: styles.card.backgroundColor,
//         opacity: styles.card.opacity,
//         boxShadow: '',
//         cardBorderLeftColor: styles.card.leftBorderColor
//       }
//     }

/* Or, you can uniquely format each list item for the following:
- Is cleared
- Is open and exceeding threshold
- Is open and not exceeding threshold
*/

if (isCleared) {
    return {
      textColor: styles.completedCard.textColor,
      backgroundColor: styles.backgroundColor,
      separatorColor: styles.separatorColor,
      selectionColor: styles.selectionColor,
      attributes: {
        title: $datapoint.Problem,
        section1: createBadge($datapoint["Master_Incident_Number"], '#242424', '#5c5c5c'),
        section2: '',
        section3: '',
        infoIcon: createInfoIcon(icons.checkMark, '', '', ''),
        bkgColor: styles.completedCard.backgroundColor,
        opacity: styles.completedCard.opacity,
        boxShadow: '',
        cardBorderLeftColor: styles.completedCard.leftBorderColor
      }
    }
}
else if (currentStageIsExceedingThreshold) {
    return {
      textColor: styles.card.textColor,
      backgroundColor: styles.backgroundColor,
      separatorColor: styles.separatorColor,
      selectionColor: styles.selectionColor,
      attributes: {
        title: $datapoint.Problem,
        section1: createBadge($datapoint["Master_Incident_Number"], '#242424', $datapoint.color3),
        section2: currentStageInfo,
        section3: progressBar, //createNotification('Exceeding response time goal'),
        infoIcon: createInfoIcon(icons.timer, 'Open', timeOpen, ''),
        bkgColor: styles.card.backgroundColor,
        opacity: styles.card.opacity,
        boxShadow: '',
        cardBorderLeftColor: styles.notification.color1
      }
    }
}
else {
    return {
      textColor: styles.card.textColor,
      backgroundColor: styles.backgroundColor,
      separatorColor: styles.separatorColor,
      selectionColor: styles.selectionColor,
      attributes: {
        title: $datapoint.Problem,
        section1: createBadge($datapoint["Master_Incident_Number"], '#242424', $datapoint.color3),
        section2: currentStageInfo,
        section3: progressBar, 
        infoIcon: createInfoIcon(icons.timer, 'Open', timeOpen, ''),
        bkgColor: styles.card.backgroundColor,
        opacity: styles.card.opacity,
        boxShadow: '',
        cardBorderLeftColor: styles.card.leftBorderColor
      }
    }
}
