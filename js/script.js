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
  }

  // for (let i = 0; i < scrollTracks.length; ++i) {
  //   scrollTracks[i].addEventListener("mousedown", function (e) {
  //     document.addEventListener("mousemove", trackMove);
  //   });
  //
  //   scrollTracks[i].addEventListener("mouseup", function () {
  //     document.removeEventListener("mousemove", trackMove);
  //   });
  //
  //   function trackMove(event) {
  //       if (parseFloat(getComputedStyle(scrollTracks[i]).left) > -3 && parseFloat(getComputedStyle(scrollTracks[i]).left) < scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 15) {
  //         scrollTracks[i].style.left =
  //     }
  //   }
  // }
})();
