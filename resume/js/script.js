// script.js
$(document).ready(function() {
	$('.skill-level').each(function() {
		var levels = 10;
		var levelNum = $(this).text();
		var levelHTML = "<img class='level-dot filled' src='img/level-dot.png' />";
		var nonLevelHTML = "<img class='level-dot non-filled' src='img/level-dot.png' />";
		var newHtml = "";
		for (var i = 0; i < levels; i++) {
			if(i < levelNum) {
				newHtml += levelHTML;
			} else {
				newHtml += nonLevelHTML;
			}
		}
		$(this).html(newHtml); 
	});

	$('.employment-year').each(function() {
		if ($(this).text().match(/[a-z]/i)) {
			$(this).addClass('has-text');
		}
	});
});

function pp(data, text) {
	if(text !== undefined) {
		text = "";
	}
	console.log(data, text);
}

