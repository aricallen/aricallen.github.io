/**
 * vanilla JS equivalents to jQuery
 */

// documentReady
(function() {
  eventUtility.addEvent(document, "DOMContentLoaded", function() {
    eventUtility.removeEvent(document, "DOMContentLoaded", arguments.callee, false);
    documentReady();
  });
})();

function addClass(elem, theClass) {
  if (elem) {
    if (!elem.classList.contains(theClass)) {
      elem.classList.add(theClass);
    }
  }
}

function hasClass(elem, theClass) {
  if (elem) {
    if (elem.classList.contains(theClass)) {
      return true;
    } else {
      return false;
    }
  }
}

function removeClass(elem, theClass) {
  if (elem) {
    if (elem.classList.contains(theClass)) {
      elem.classList.remove(theClass);
    }
  }
}