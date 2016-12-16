/*jslint browser: true, devel: true*/
/*jshint jquery: true*/



function BuildModalContent(event){
    "use strict"
    var dateFormatOptions = {
            month: 'long',
            day: 'numeric'
        };
        var timeFormatOptions = {
            hour12: true,
            hour: "numeric",
            minute: "numeric"
        };
        var eventTitle = event.title;
        var startDate = new Date(event.start);
        var endDate = new Date(event.end);
        var startMonth = startDate.getMonth() + 1;
        var endMonth = endDate.getMonth() + 1;
        var startLocalDateFormat = startDate.toLocaleDateString('en-US', dateFormatOptions);
        var endLocalDateFormat = endDate.toLocaleDateString('en-US', dateFormatOptions);
        var startLocalTimeFormat = startDate.toLocaleTimeString('en-US', timeFormatOptions);
        var endLocalTimeFormat = endDate.toLocaleTimeString('en-US', timeFormatOptions);
        var description;

        if(event.title != null){
            eventTitle = event.title
        }
        else{
            eventTitle = ""
        }

        if(event.description != null){
            description = event.description
        }
        else{
            description = ""
        }

    $('#modalTitle').html("<h3>" + eventTitle + "</h3>");
    $('#modalBody').html(
        "<div class='container-fluid'>" 
            + "<h3>Event Description</h3>"
            + "<div class='row center-block'>" 
                + "<div class='col-xs-6 center-block'>" 
                    + "<span class='timeGreen glyphicon glyphicon-time'></span>  " 
                    + "Start Time: " + startLocalDateFormat + " @ " + startLocalTimeFormat 
                + "</div>" 
                + "<div class='col-xs-6 center-block'>" 
                    + "<span class='timeRed glyphicon glyphicon-time'></span>  "
                    + " End Time: " + endLocalDateFormat + " @ " + endLocalTimeFormat 
                + "</div>" 
            + "</div>"
        + "</div> </br>"
        + "<div class='container-fluid'>" 
            + "<div class='row'>" + description + "</div>" 
        +"</div></div>");
    $('#eventUrl').attr('href', event.url);
    $('#fullCalModal').modal();

   /*TODO - Find a way to add to users Google Calendar, or download iCal*/
    
}

function createCalendar(displayMode){
    "use strict"
    var oAMCharters = ""; //URL for calendar, fill this in
    var charterDives = ""; //URL for calendar, fill this in
    var oPMCharters = ""; //URL for calendar, fill this in
    var oPMChartersBackground = "#3A87AD";
    var oAMChartersBackground = "#556B2F";
    var charterDivesBackground = "#B22222";
    var apiKey =  '' //private API Key, get your own


    switch(displayMode){
        case "week":
            $('#calendar').fullCalendar({
                weekMode: 'variable',
                googleCalendarApiKey: apiKey,
                firstDay: 0,
                defaultView: 'basicWeek',
                contentHeight: 250,
                handeleWindoResize: true,

                //Header defined empty to remove visible elements	
                header: {
                    right: '',
                    center: '',
                    left: ''
                },

                timeFormat: 'h(:mm)', //Formats the Time displayed ,(removes the TOD as this is received in the data from Google Calendar)

                eventSources: [
                    { // PM dives
                        url: oPMCharters,
                        currentTimezone: 'America/Los_Angeles',
                        color: oPMChartersBackground
                    },
                    {
                        // AM dives
                        url: oAMCharters,
                        currentTimezone: 'America/Los_Angeles',
                        color: oAMChartersBackground
                    },
                    {
                        // Charters
                        url: charterDives,
                        currentTimezone: 'America/Los_Angeles',
                        color: charterDivesBackground
                    }
                ],
                eventClick: function (event) {
                    BuildModalContent(event);            
                    return false;
                },
                eventMouseover: function (event, element) {
                    $(this).css('color', '#FFF');
                    $(this).css('text-decoration', 'underline');
                    $(this).css('cursor', 'default');
                },
                eventMouseout: function (event, element) {
                    $(this).css('color', '#FFF');
                    $(this).css('text-decoration', 'none');
                },
                windowResize: function (view) {
                    $('#calendar').fullcalendar('render');
                }    
            });
            break;
        case "month":
            $('#calendar').fullCalendar({
                googleCalendarApiKey: apiKey,
                firstDay: 0,
                header: {
                    right: 'prev,today,next',
                    center: 'title',
                    left: ''
                },

                timeFormat: 'h(:mm)t',
                //contentHeight: 1000,
                fixedWeekCount: false,
                displayEventEnd: {
                    month: true,
                    basicWeek: true
                },
                eventSources: [
                    { // PM dives
                        url: oPMCharters,
                        currentTimezone: 'America/Los_Angeles',
                        color: oPMChartersBackground
                    },
                    {
                        // AM dives
                        url: oAMCharters,
                        currentTimezone: 'America/Los_Angeles',
                        color: oAMChartersBackground
                    },
                    {
                        // Charters
                        url: charterDives,
                        currentTimezone: 'America/Los_Angeles',
                        color: charterDivesBackground
                    }
                ],
                eventClick: function (event) {
                    BuildModalContent(event);
                    return false;
                },
                eventMouseover: function (event, element) {
                    $(this).css('color', '#FFF');
                    $(this).css('text-decoration', 'underline');
                    $(this).css('cursor', 'default');
                },
                eventRender: function (event, element) {
                    element.find('.fc-time').append("<br />");
                },
                eventMouseout: function (event, element) {
                    $(this).css('color', '#FFF');
                    $(this).css('text-decoration', 'none');
                },
                windowResize: function (view) {
                    $('#calendar').fullcalendar('render');
                }
            });
            break;
        case "threeDay":
            $('#smallCalendar').fullCalendar({
                weekMode: 'variable',
                googleCalendarApiKey: 'AIzaSyCu06qlXYIPcyCfXRdbU6WBDdFjM9A-JVI',
                firstDay: 1,
                defaultView: 'threeDays',
                contentHeight: 250,
                handeleWindoResize: true,

                //Header defined empty to remove visible elements	
                header: {
                    right: 'prev,next',
                    center: '',
                    left: ''
                },
                views: {
                    threeDays: {
                        type: 'basicWeek',
                        duration: {
                            days: 3
                        },
                        buttonText: '3 Days'
                    }
                },
                timeFormat: 'h(:mm)', //Formats the Time displayed ,(removes the TOD as this is received in the data from Google Calendar)
                eventSources: [
                    { // PM dives
                        url: oPMCharters,
                        currentTimezone: 'America/Los_Angeles',
                        color: oPMChartersBackground
                    },
                    {
                        // AM dives
                        url: oAMCharters,
                        currentTimezone: 'America/Los_Angeles',
                        color: oAMChartersBackground
                    },
                    {
                        // Charters
                        url: charterDives,
                        currentTimezone: 'America/Los_Angeles',
                        color: charterDivesBackground
                    }
                ],
                eventClick: function (event) {
                    BuildModalContent(event);
                    return false;
                },
                eventMouseover: function (event, element) {
                    $(this).css('color', '#FFF');
                    $(this).css('text-decoration', 'underline');
                    $(this).css('cursor', 'default');
                },
                eventMouseout: function (event, element) {
                    $(this).css('color', '#FFF');
                    $(this).css('text-decoration', 'none');
                },
                windowResize: function (view) {
                    $('#calendar').fullcalendar('render');
                }
            });
            break;
        default:
            console.error("No Calendar, something is broken");
    }
}