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
  var scrolls = document.querySelectorAll(".scroll");
  var scrollArrowsLeft = document.querySelectorAll(".scroll__arrow--left");
  var scrollArrowsRight = document.querySelectorAll(".scroll__arrow--right");
  var galleryContainers = document.querySelectorAll(".gallery__container");
  var scrollTracks = document.querySelectorAll(".scroll__track");

  for (let i = 0; i < galleries.length; ++i) {
    galleries[i].style.overflow = "hidden";
  }

  for (let i = 0; i < scrolls.length; ++i) {
    scrolls[i].style.display = "block";
  }

  for (let i = 0; i < scrollArrowsLeft.length; ++i) {
    scrollArrowsLeft[i].addEventListener("click", function () {
      if (parseFloat(getComputedStyle(galleryContainers[i]).left) < 0) {
        galleryContainers[i].style.left = parseFloat(getComputedStyle(galleryContainers[i]).left) + 5 + "px";
      }
    });
  }

  for (let i = 0; i < scrollArrowsRight.length; ++i) {
    scrollArrowsRight[i].addEventListener("click", function () {
      if (parseFloat(getComputedStyle(galleryContainers[i]).left) > galleries[i].offsetWidth - parseFloat(getComputedStyle(galleryContainers[i]).width)) {
        galleryContainers[i].style.left = parseFloat(getComputedStyle(galleryContainers[i]).left) - 5 + "px";
      }
    });
  }

  for (let i = 0; i < scrollTracks.length; ++i) {
    scrollTracks[i].addEventListener("mousedown", function () {
      scrollTracks[i].addEventListener("mouseover", function trackMove() {

      })
    });

    scrollTracks[i].addEventListener("mouseup", function () {
      scrollTracks[i].removeEventListener("mouseover", function trackMove() {

      })
    });
  }

})();
