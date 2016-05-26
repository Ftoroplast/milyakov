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

  for (var i = 0; i < galleries.length; ++i) {
    galleries[i].style.overflow = "hidden";
  }

  for (i = 0; i < scrolls.length; ++i) {
    scrolls[i].style.display = "block";
  }

  for (let i = 0; i < scrollArrowsLeft.length; ++i) {
    scrollArrowsLeft[i].addEventListener("click", function () {
      galleryContainers[i].style.left = parseFloat(getComputedStyle(galleryContainers[i]).left) - 5 + "px";
    });
  }

  for (let i = 0; i < scrollArrowsRight.length; ++i) {
    scrollArrowsRight[i].addEventListener("click", function () {
      galleryContainers[i].style.left = parseFloat(getComputedStyle(galleryContainers[i]).left) + 5 + "px";
    });
  }

})();
