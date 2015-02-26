// script.js

function documentReady() {
	// console.log("dom ready");
	var menuButton = document.getElementById('menu-button');
	var navArrowUp = document.getElementById('nav-arrow-up');
	var navArrowDown = document.getElementById('nav-arrow-down');
	var navArrowLeft = document.getElementById('nav-arrow-left');
	var navArrowRight = document.getElementById('nav-arrow-right');
	eventUtility.addEvent(menuButton, 'click', toggleMenu);
	eventUtility.addEvent(navArrowUp, 'click', navAction);
	eventUtility.addEvent(navArrowDown, 'click', navAction);
	eventUtility.addEvent(navArrowLeft, 'click', navAction);
	eventUtility.addEvent(navArrowRight, 'click', navAction);
	
	// initiate each section
	if ( typeof animateSkills === 'function' ) {
		animateSkills();
	}
}

function toggleMenu() {
	console.log("toggleMenu");
	var menu = document.getElementById('menu');
	var thePage = document.getElementById('page');
	
	toggleAnimations(menu, 'menuSlidesLeft', 'menuSlidesRight', 'animate-short');
	toggleAnimations(thePage, 'pageSlidesLeft', 'pageSlidesRight', 'animate-short');

	// // can click/tap on main page to slide back right
	// if ( hasClass(thePage, 'pageSlidesLeft') ) {
	// 	// page off screen
	// 	// add click event
	// 	eventUtility.addEvent(thePage, 'click', toggleMenu);
	// } else {
	// 	// page on screen
	// 	// remove click event
	// 	eventUtility.removeEvent(thePage, 'click', toggleMenu);
	// }
}

function animateElement(elem, animation, duration) {
	if ( elem ) {
		if ( typeof duration == 'undefined' ) {
			duration = 'animate';
		} 
		if ( hasClass(elem, 'hidden') ) {
			removeClass(elem, 'hidden');
		}
		if ( hasClass(elem, animation) ) {
			removeClass(elem, animation)
		}
		addClass(elem, animation);
		addClass(elem, duration);
	}
}

// given two animations, swap out new one with other
// i.e. sliding an element left or right
// returns animation that was added
function toggleAnimations(elem, animation, otherAnimation, duration) {
	if ( elem ) {
		if ( typeof duration == 'undefined' ) {
			duration = 'animate';
		} 
		if ( hasClass(elem, animation) ) {
			// elem already has animation
			// remove and add other
			removeClass(elem, animation)
			animateElement(elem, otherAnimation, duration);
			return otherAnimation;
		} else if ( hasClass(elem, otherAnimation) ) {
			// elem has other, remove and add first animation
			removeClass(elem, otherAnimation)
			animateElement(elem, animation, duration);
			return animation;
		} else {
			// first time
			animateElement(elem, animation, duration);
			addClass(elem, duration);
			return animation;
		}
	}
}

function toggleClass(elem, theClass) {
	if ( elem ) {
		if ( hasClass(elem, theClass) ) {
			removeClass(elem, theClass);
		} else {
			addClass(elem, theClass);
		}
	}
} 

function navAction(e) {
	// get target
	// perform action based on what item was clicked
	var navItem = e.target.id;
	switch (navItem) {
		case 'nav-arrow-up': 
			console.log("navigate up");
			moveTape("top");
			break;
		case 'nav-arrow-down': 
			console.log("navigate down");
			break;
		case 'nav-arrow-left': 
			moveTape("left");
			console.log("navigate left");
			break;
		case 'nav-arrow-right': 
			moveTape("right");
			console.log("navigate right");
			break;
		default:
			console.log('unknown nav item', e.target);
	}
}

function moveTape(dir) {
	var sliderTape = document.querySelector('.slider-tape');
	var pos = sliderTape.dataset.pos;
	// console.log("pos", pos);
	var posPercent = 100;
	var max = 0;
	var min = parseInt(sliderTape.dataset.min);
	var movePos;
	if ( dir === 'right' ) {
		movePos = parseInt(pos) - posPercent;
	} else if ( dir === 'left' ) {
		movePos = parseInt(pos) + posPercent;
	}

	if ( movePos < min ) {
		movePos = max;
	} else if ( movePos > max ) {
		movePos = min;
	}
	sliderTape.style.left = movePos + '%';
	sliderTape.dataset.pos = movePos;
	// console.log("movePos", movePos);
}

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























