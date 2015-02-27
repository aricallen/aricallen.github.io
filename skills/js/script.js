// script.js

function animateSkills() {
	var skills = document.getElementsByClassName('skill-level');
	// console.log("skills", skills);
	skills.forEach = Array.prototype.forEach;
	skills.forEach(function(elem) {
		var childNodes = elem.childNodes;
		// console.log("childNodes[0].data", childNodes[0].data);
		var value = childNodes[0].data;
		var levels = 10;
		var levelNum = value;
		var levelHTML = "<img class='level-dot filled' src='img/level-dot-filled-alpha.png' />";
		var nonLevelHTML = "<img class='level-dot non-filled' src='img/level-dot-filled-alpha.png' />";
		var newHtml = "";
		for (var i = 0; i < levels; i++) {
			if(i < levelNum) {
				newHtml += levelHTML;
			} else {
				newHtml += nonLevelHTML;
			}
		}
		elem.innerHTML = newHtml; 
	});
}