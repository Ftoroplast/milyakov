(function () {
  // Реализация скроллбара
  var galleries = document.querySelectorAll(".gallery");
  var galleryContainers = document.querySelectorAll(".gallery__container");
  var scrolls = document.querySelectorAll(".scroll");
  var scrollArrowsLeft = document.querySelectorAll(".scroll__arrow--left");
  var scrollArrowsRight = document.querySelectorAll(".scroll__arrow--right");
  var scrollTracks = document.querySelectorAll(".scroll__track");
  var timerTrackToRight;
  var timerTrackToLeft;
  var shiftX = [];

  setInterval(function () {
    for (let i = 0; i < scrolls.length; ++i) {
      scrollTracks[i].style.width = (scrolls[i].offsetWidth - 30) / galleryContainers[i].offsetWidth * galleries[i].offsetWidth + "px";
      if (parseFloat(getComputedStyle(galleryContainers[i]).left) <= 0 || parseFloat(getComputedStyle(galleryContainers[i]).left) >= galleries[i].offsetWidth - galleryContainers[i].offsetWidth) {
        galleryContainers[i].style.left = (getCoords(scrolls[i]).left + 15 - getCoords(scrollTracks[i]).left) * (galleryContainers[i].offsetWidth - galleries[i].offsetWidth) / (scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 30) + "px";
      }
    }
  }, 4);

  for (let i = 0; i < galleries.length; ++i) {
    galleries[i].style.overflow = "hidden";
    scrolls[i].style.display = "block";

    scrollArrowsLeft[i].addEventListener("mousedown", function () {
      timerTrackToLeft = setInterval(function () {
        if (getCoords(scrollTracks[i]).left >= 10 + getCoords(scrolls[i]).left) {
          scrollTracks[i].style.left = parseFloat(getComputedStyle(scrollTracks[i]).left) - 1 + "px";
        }
      }, 4);
    });

    scrollArrowsLeft[i].addEventListener("mouseup", function () {
      clearInterval(timerTrackToLeft);
    });

    scrollArrowsRight[i].addEventListener("mousedown", function () {
      timerTrackToRight = setInterval(function () {
        if (getCoords(scrollTracks[i]).left <= getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 18) {
          scrollTracks[i].style.left = parseFloat(getComputedStyle(scrollTracks[i]).left) + 1 + "px";
        }
      }, 4);
    });

    scrollArrowsRight[i].addEventListener("mouseup", function () {
      clearInterval(timerTrackToRight);
    });

    scrollTracks[i].onmousedown = function(e) {
      document.onmousedown = document.onselectstart = function() {
        return false;
      };

      var coords = getCoords(scrollTracks[i]);
      var shiftX = e.pageX - coords.left;
      var shiftY = e.pageY - coords.top

      document.body.appendChild(scrollTracks[i]);
      scrollTracks[i].style.left = e.pageX - shiftX + 4 + "px";
      setInterval(function () {
        scrollTracks[i].style.top = getCoords(scrolls[i]).top + "px";
      }, 4);

      function moveXAt(e) {
        if (e.pageX - shiftX + 4 < getCoords(scrolls[i]).left + 14) {
          scrollTracks[i].style.left = getCoords(scrolls[i]).left + 14 + "px";
        } else if (e.pageX - shiftX + 4 > getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 14) {
          scrollTracks[i].style.left = getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 14 + "px";
        } else {
          scrollTracks[i].style.left = e.pageX - shiftX + "px";
        }
      }

      document.onmousemove = function(e) {
        moveXAt(e);
      };

      document.onmouseup = function() {
        setInterval(function (e) {
          if (getCoords(scrolls[i]).left > getCoords(scrollTracks[i]).left) {
            scrollTracks[i].style.left = getCoords(scrolls[i]).left + 14 + "px";
          } else if (getCoords(scrollTracks[i]).left > getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 14) {
            scrollTracks[i].style.left = getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 14 + "px";
          }
        }, 4);
        document.onmousedown = document.onselectstart = function() {
          return true;
        };
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }

    scrollTracks[i].ondragstart = function() {
      return false;
    };

    galleries[i].addEventListener("mouseover", function (e) {
      document.onkeydown = function (e) {
      if (e.keyCode === 37) {
          if (getCoords(scrollTracks[i]).left >= 10 + getCoords(scrolls[i]).left) {
            scrollTracks[i].style.left = parseFloat(getComputedStyle(scrollTracks[i]).left) - 5 + "px";
          }
      } else if (e.keyCode === 39) {
          if (getCoords(scrollTracks[i]).left <= getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 18) {
            scrollTracks[i].style.left = parseFloat(getComputedStyle(scrollTracks[i]).left) + 5 + "px";
          };
      }
    };
  });

    galleries[i].addEventListener("mouseout", function (e) {
      document.onkeydown = null;
    })
  }

  function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  //Реализация попапа
  var sectionPortfolio = document.querySelector(".content--portfolio");
  var galleryItemsPortfolio = document.querySelectorAll(".gallery__item--portfolio");
  var galleryLinksPortfolio = document.querySelectorAll(".gallery__link--portfolio");
  var galleryPicturesPortfolio = document.querySelectorAll(".gallery__picture--portfolio");
  var galleryDescriptionsPortfolio = document.querySelectorAll(".gallery__description--portfolio");
  var galleryTitlesPortfolio = document.querySelectorAll(".gallery__title--portfolio");
  var galleryTextsPortfolio = document.querySelectorAll(".gallery__text--portfolio");

  for (let i = 0; i < galleryItemsPortfolio.length; ++i) {
    galleryLinks[i].addEventListener("click", function (e) {
      sectionPortfolio.appendChild(galleryItemsPortfolio[i]);
      galleryItemsPortfolio[i].classList.add("gallery__item--popup");
      galleryLinksPortfolio[i].classList.add("gallery__link--popup");
      galleryPicturesPortfolio[i].classList.add(".gallery__picture--popup");
      galleryDescriptionsPortfolio[i].classList.add(".gallery__description--popup");
      galleryTitlesPortfolio[i].classList.add(".gallery__title--popup");
      galleryTextsPortfolio[i].classList.add(".gallery__text--popup");
    })
  }
})();
