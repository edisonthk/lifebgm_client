(function(){
	var write_htmlOfDoc(doc, write_str){
		doc.innerHTML = write_str;
	}
	var show_time = function(time_str){
		var doc - document.getElementById("time");
		write_htmlOfDoc(doc, time_str);
	}
	var show_am_pm = function(am_pm_str){
		var doc = document.getElementById("am_pm");
		write_htmlOfDoc(doc, am_pm_str);
	}
	var show_date = function(date_str){
		var doc = getElementById("date");
		write_htmlOfDoc(doc, date_str);
	}
	var show_weather = function(weather_str){
		var doc = document.getElementById("weather");
		var in_str = "<img alt=\"" + weather_str + "\" src=\"./" + weather_str + ".png\">";
		write_htmlOfDoc(doc, in_str);
	}
	var show_Date_date = function(Date_date){
		var temp_hour = parseInt(Date_date.getHours());
		if(temp_hour > 12){
			temp_hour -= 12;
		}
		var weeks = new Array('日','月','火','水','木','金','土');
		var am_pm_str = (temp_hour > 12)? "PM" : "AM";
		show_time(toString(temp_hour) + ":" + Date_date.getMinutes());
		show_am_pm(am_pm_str);
		var year = Date_date.getYear();
		var date_str = toString((year < 2000)? year + 1900 : year ) + "年" + toString(Date_date.getMonth() + 1) + "月" + Date_date.getDate() +  " (" +  weeks[Date_date.getDay()] + ")";
		show_date(date_str);
		show_weather("sun");
	}
})()
