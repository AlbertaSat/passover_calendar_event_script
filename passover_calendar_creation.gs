function schedulePassovers() {
  //Create spreadsheet obj from active sheet
  var spreadsheet = SpreadsheetApp.getActiveSheet();

  var albertasatCalendarIdStr = "c0ml06c2r6p8rs34oicaqnulac@group.calendar.google.com"

  // create calendar obj from calendar id
  var calendarObj = CalendarApp.getCalendarById("d791d1ffdf41dd389907b9b56cdb0805620557a76db5a1cf9049572509d14422@group.calendar.google.com");
  //var calendarObj = CalendarApp.getCalendarById(albertasatCalendarIdStr);

  var startBox = "A4";
  var endBox = "Q100";  //arbitrarily large to include all potential passes in script 

  // get entry values from columns and rows 
  // var passovers = spreadsheet.getRange(4,1,100,9).getValues();
  var passovers = spreadsheet.getRange(startBox + ":" + endBox).getValues();

  var events = getCalendarEvents(calendarObj);

  //Loop through each passover column and create associated calendar event
  for(x=0; x < passovers.length ; x++){
    var passover = passovers[x];
    var id = passover[0];

    //If the id field is blank , return 
    if(id == null || id == Number.NaN || id == 0){
      return;
    }

    //If the date is less than yesterdays date, dont add this entry
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    var date = passover[1];

    if(date < yesterday){
      continue;
    }

    //TODO - Add description to event 

    var startAOS_mdt = passover[15];
    var endLOS_mdt = passover[16];
    var satellitesInvolved = passover[7];

    //Create event name from satellites invovled and column num
    var newEventName ="Passover_" + satellitesInvolved.toString() + "_id=" + x.toString();

    //Check if a calendar event with that name already exsists - if there isn't one, create the calendar event, otherwise move on to next spreadsheet item 

    if(checkIfEventAlreadyExists(newEventName, events, calendarObj)){
      continue;
    }

    calendarObj.createEvent(newEventName,startAOS_mdt,endLOS_mdt);
    Logger.log("Added event: " + newEventName + ". AOS=" + startAOS_mdt + " . LOS=" + endLOS_mdt);
   }
}


//Get all calendar events from May 1st 2023 -> May 1st 2024
function getCalendarEvents(calObj){
  var fromDate = new Date('May 1, 2023 00:00:00 -0600');
  var toDate = new Date('May 1, 2024 00:00:00 -0600');
  var events = calObj.getEvents(fromDate,toDate);

  return events;
}


//Checks if any events exist that share the same name as the arg passed
function checkIfEventAlreadyExists(eventName, calEvents, calObj){

  for(var i = 0; i < calEvents.length; i++){
    var ev = calEvents[i];
    var title = calObj.getEventSeriesById(ev.getId()).getTitle();

    if(title == eventName){
      return true;
    }
  }

  return false;
}
