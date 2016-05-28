// $(function()
// {
//   var galleryPortfolioJsp =	$('.gallery--portfolio').jScrollPane(
//     {
//       showArrows: true,
// 			autoReinitialise: true
//     });
//
// 		var galleryClientsJsp =	$('.gallery--clients').jScrollPane(
// 	    {
// 	      showArrows: true,
// 				autoReinitialise: true
// 	    });
// });

(function () {
  var galleries = document.querySelectorAll(".gallery");
  var galleryContainers = document.querySelectorAll(".gallery__container");
  var scrolls = document.querySelectorAll(".scroll");
  var scrollArrowsLeft = document.querySelectorAll(".scroll__arrow--left");
  var scrollArrowsRight = document.querySelectorAll(".scroll__arrow--right");
  var scrollTracks = document.querySelectorAll(".scroll__track");
  var timerOnLeftArrow;
  var timerOnRightArrow;
  var timerTrackToRight;
  var timerTrackToLeft;
  var timerTrackMove;
  var shiftX = [];
  var topTrackCoord = [];
  var leftTrackCoord = [];

  setInterval(function () {
    for (let i = 0; i < scrolls.length; ++i) {
      scrollTracks[i].style.width = (scrolls[i].offsetWidth - 30) / galleryContainers[i].offsetWidth * galleries[i].offsetWidth + "px";
    }
  }, 4);

  for (let i = 0; i < galleries.length; ++i) {
    galleries[i].style.overflow = "hidden";
    scrolls[i].style.display = "block";

    scrollArrowsLeft[i].addEventListener("mousedown", function () {
      timerOnLeftArrow = setInterval(function () {
        if (parseFloat(getComputedStyle(galleryContainers[i]).left) < -3) {
          galleryContainers[i].style.left = parseFloat(getComputedStyle(galleryContainers[i]).left) + (galleryContainers[i].offsetWidth - galleries[i].offsetWidth) / (scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 30) + "px";
        }
      }, 4);
    });

    scrollArrowsLeft[i].addEventListener("mousedown", function () {
      timerTrackToLeft = setInterval(function () {
        if (parseFloat(getComputedStyle(scrollTracks[i]).left) > 15) {
          scrollTracks[i].style.left = parseFloat(getComputedStyle(scrollTracks[i]).left) - 1 + "px";
        }
      }, 4);
    });

    scrollArrowsLeft[i].addEventListener("mouseup", function () {
      clearInterval(timerOnLeftArrow);
      clearInterval(timerTrackToLeft);
    });

    scrollArrowsRight[i].addEventListener("mousedown", function () {
      timerOnRightArrow = setInterval(function () {
        if (parseFloat(getComputedStyle(galleryContainers[i]).left) > galleries[i].offsetWidth - parseFloat(getComputedStyle(galleryContainers[i]).width)) {
          galleryContainers[i].style.left = parseFloat(getComputedStyle(galleryContainers[i]).left) - (galleryContainers[i].offsetWidth - galleries[i].offsetWidth) / (scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 30) + "px";
        }
      }, 4);
    });

    scrollArrowsRight[i].addEventListener("mousedown", function () {
      timerTrackToRight = setInterval(function () {
        if (parseFloat(getComputedStyle(scrollTracks[i]).left) < scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 15) {
          scrollTracks[i].style.left = parseFloat(getComputedStyle(scrollTracks[i]).left) + 1 + "px";
        }
      }, 4);
    });

    scrollArrowsRight[i].addEventListener("mouseup", function () {
      clearInterval(timerOnRightArrow);
      clearInterval(timerTrackToRight);
    });

    scrollTracks[i].addEventListener("mousedown", function (event) {
      // currentTrackPosition = parseFloat(getComputedStyle(scrollTracks[i]).left) + parseFloat(getComputedStyle(scrolls[i]).left);
      // shiftX = event.pageX - currentTrackPosition;
      topTrackCoord[i] = getCoords(scrollTracks[i]).top;
      leftTrackCoord[i] = getCoords(scrollTracks[i]).left;
      document.body.appendChild(scrollTracks[i]);
      scrollTracks[i].style.top = topTrackCoord[i] + "px";
      scrollTracks[i].style.left = leftTrackCoord[i] + 4 + "px";
      shiftX[i] = event.pageX - leftTrackCoord[i];
      scrollTracks[i].addEventListener("mousemove", trackMove);
    });

    document.addEventListener("mouseup", function (event) {
      scrolls[i].appendChild(scrollTracks[i]);
      scrollTracks[i].style.left = getCoords(scrollTracks[i]).left - getCoords(scrolls[i]).left + "px";
      scrollTracks[i].style.top = 0 + "px";
      scrollTracks[i].removeEventListener("mousemove", trackMove);
    });

    function trackMove() {
        // if ((event.pageX - shiftX - currentTrackPosition >= 15 || event.pageX - shiftX - currentTrackPosition <= scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 15) && parseFloat(getComputedStyle(scrollTracks[i]).left) >= 15 && parseFloat(getComputedStyle(scrollTracks[i]).left) <= scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 15 ||
        //     parseFloat(getComputedStyle(scrollTracks[i]).left) > scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 15 && (event.pageX - shiftX) < parseFloat(getComputedStyle(scrollTracks[i]).left) ||
        //     parseFloat(getComputedStyle(scrollTracks[i]).left) < 15 && (event.pageX - shiftX) > parseFloat(getComputedStyle(scrollTracks[i]).left)) {
        //   scrollTracks[i].style.left = event.pageX - shiftX - parseFloat(getComputedStyle(scrollTracks[i]).left) + parseFloat(getComputedStyle(scrolls[i]).left) + "px";
        // }
        if (parseFloat(getComputedStyle(scrollTracks[i]).left) >= parseFloat(getComputedStyle(scrolls[i]).left) + 15 && parseFloat(getComputedStyle(scrollTracks[i]).left) <= scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 15) {
          scrollTracks[i].style.left = event.pageX - shiftX[i] + "px";
        }
    }
  }

  function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
})();
