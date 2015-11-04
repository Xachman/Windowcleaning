function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getWeekDays(range){
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Tursday', 'Firday', 'Saturday'];
  var data = range.data;
	var start = new Date(range.start);
	if(!('sDay' in range)) range.sDay = 0;
	start.setDate(start.getDate() - start.getDay() + range.sDay);
	var end = new Date(range.end);
  var addDays = 6 + range.sDay - 7;
	end.setDate(end.getDate() + ((end.getDay() === addDays )? 0 : 6 - end.getDay() + range.sDay));
	var cDay = start.getTime();
	var week = 0;
	var newWeek = true;
	var html = '';
	var colorDark = true;
	while(cDay <= end.getTime()){
		var date = new Date(cDay);
		var dateFormat = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear();
		cWeek = week;
		checkLastMonth = new Date(date);
		checkLastMonth.setDate(checkLastMonth.getDate() - 1);
		if(date.getMonth() !== checkLastMonth.getMonth()) {
			colorDark = (colorDark)? false : true;
		}
		if(newWeek === true) {
			lastWeekDate = new Date(date);
			lastWeekDate.setDate(lastWeekDate.getDate() + 6);
			var lastFromat = lastWeekDate.getMonth()+1+'/'+lastWeekDate.getDate()+'/'+lastWeekDate.getFullYear();
			html += '<div class="week" style="clear: both"><h3>Week of '+dateFormat+' - '+lastFromat+'</h3>';
		}
		newWeek = false;
		html += '<div class="day">';
		html += '<h3>'+days[date.getDay()]+'</h3>';
		html += dateFormat;
		html += '</div>';
		var lastD = (addDays >= 0)? addDays : 6;
		if(date.getDay() === lastD) {
		html += '</div>';
		newWeek = true;
		week++;
		}
		date.setDate(date.getDate() + 1);
		cDay = date.getTime();
	}
	return html;
}
