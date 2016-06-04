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
  var i;

  setInterval(function () {
    for (i = 0; i < scrolls.length; ++i)(function(i) {
      scrollTracks[i].style.width = (scrolls[i].offsetWidth - 42) / galleryContainers[i].offsetWidth * galleries[i].offsetWidth + "px";
      if (parseFloat(getComputedStyle(galleryContainers[i]).left) <= 0 || parseFloat(getComputedStyle(galleryContainers[i]).left) >= galleries[i].offsetWidth - galleryContainers[i].offsetWidth) {
        galleryContainers[i].style.left = (getCoords(scrolls[i]).left + 17 - getCoords(scrollTracks[i]).left) * (galleryContainers[i].offsetWidth - galleries[i].offsetWidth) / (scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 42) + "px";
      }
    })(i);
  }, 4);

  for (i = 0; i < galleries.length; ++i)(function(i) {
    galleries[i].style.overflow = "hidden";
    scrolls[i].style.display = "block";

    scrollArrowsLeft[i].addEventListener("mousedown", function () {
      timerTrackToLeft = setInterval(function () {
        if (getCoords(scrollTracks[i]).left >= 17 + getCoords(scrolls[i]).left) {
          scrollTracks[i].style.left = parseFloat(getComputedStyle(scrollTracks[i]).left) - 1 + "px";
        }
      }, 4);
    });

    scrollArrowsLeft[i].addEventListener("mouseup", function () {
      clearInterval(timerTrackToLeft);
    });

    scrollArrowsRight[i].addEventListener("mousedown", function () {
      timerTrackToRight = setInterval(function () {
        if (getCoords(scrollTracks[i]).left <= getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 25) {
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
      var shiftY = e.pageY - coords.top;

      document.body.appendChild(scrollTracks[i]);
      scrollTracks[i].style.left = e.pageX - shiftX + 4 + "px";
      setInterval(function () {
        scrollTracks[i].style.top = getCoords(scrolls[i]).top - parseFloat(getComputedStyle(pageHeader).marginTop) + "px";
      }, 4);

      function moveXAt(e) {
        if (e.pageX - shiftX + 4 < getCoords(scrolls[i]).left + 21) {
          scrollTracks[i].style.left = getCoords(scrolls[i]).left + 21 + "px";
        } else if (e.pageX - shiftX + 4 > getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 21) {
          scrollTracks[i].style.left = getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 21 + "px";
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
            scrollTracks[i].style.left = getCoords(scrolls[i]).left + 21 + "px";
          } else if (getCoords(scrollTracks[i]).left > getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 21) {
            scrollTracks[i].style.left = getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 21 + "px";
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
          if (getCoords(scrollTracks[i]).left >= 17 + getCoords(scrolls[i]).left) {
            scrollTracks[i].style.left = parseFloat(getComputedStyle(scrollTracks[i]).left) - 5 + "px";
          }
      } else if (e.keyCode === 39) {
          if (getCoords(scrollTracks[i]).left <= getCoords(scrolls[i]).left + scrolls[i].offsetWidth - scrollTracks[i].offsetWidth - 25) {
            scrollTracks[i].style.left = parseFloat(getComputedStyle(scrollTracks[i]).left) + 5 + "px";
          };
      }
    };
  });

    galleries[i].addEventListener("mouseout", function (e) {
      document.onkeydown = null;
    })
  })(i);

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
  var galleryItemPortfolioSelected;
  var galleryLinkPortfolioSelected;
  var galleryPicturePortfolioSelected;
  var galleryDescriptionPortfolioSelected;
  var galleryItemPortfolioNumber;

  var galleryBtnPrevious = document.createElement("a");
  galleryBtnPrevious.className = "gallery__btn gallery__btn--previous";
  galleryBtnPrevious.innerHTML = "Предыдущее";

  var galleryBtnNext = document.createElement("a");
  galleryBtnNext.className = "gallery__btn gallery__btn--next";
  galleryBtnNext.innerHTML = "Следующее";

  var crossPortfolio = document.createElement("a");
  crossPortfolio.className = "cross cross--portfolio";
  crossPortfolio.innerHTML = "&times;";

  for (i = 0; i < galleryItemsPortfolio.length; ++i)(function(i) {
    galleryLinksPortfolio[i].addEventListener("click", function (e) {
      galleryItemPortfolioNumber = i;
      console.log(galleryItemPortfolioNumber);
      galleryItemPortfolioSelected = galleryItemsPortfolio[galleryItemPortfolioNumber].cloneNode(true);

      sectionPortfolio.appendChild(galleryItemPortfolioSelected);
      galleryItemPortfolioSelected.addEventListener("mouseover", function (e) {
        document.onkeydown = function (e) {
          if (e.keyCode === 37) {
            previousPicture(e);
          } else if (e.keyCode === 39) {
            nextPicture(e);
          } else if (e.keyCode === 27) {
            closePopup(e);
          }
        };
      });
      galleryItemPortfolioSelected.addEventListener("mouseout", function (e) {
        document.onkeydown = null;
      });

      galleryLinkPortfolioSelected = galleryItemPortfolioSelected.querySelector(".gallery__link--portfolio");
      galleryPicturePortfolioSelected = galleryItemPortfolioSelected.querySelector(".gallery__picture--portfolio");
      galleryDescriptionPortfolioSelected = galleryItemPortfolioSelected.querySelector(".gallery__description--portfolio");

      galleryPicturePortfolioSelected.appendChild(galleryBtnPrevious);
      galleryPicturePortfolioSelected.appendChild(galleryBtnNext);
      galleryLinkPortfolioSelected.appendChild(crossPortfolio);

      galleryBtnPrevious.classList.add("gallery__btn--show");
      galleryBtnNext.classList.add("gallery__btn--show");
      crossPortfolio.classList.add("cross--show");

      galleryItemPortfolioSelected.classList.add("gallery__item--popup");
      galleryLinkPortfolioSelected.classList.add("gallery__link--popup");
      galleryPicturePortfolioSelected.classList.add("gallery__picture--popup");
      galleryDescriptionPortfolioSelected.classList.add("gallery__description--popup");
    });

    crossPortfolio.addEventListener("click", closePopup);

    galleryBtnPrevious.addEventListener("click", previousPicture);
    galleryBtnPrevious.onmousedown = function (e) {
      document.onmousedown = document.onselectstart = function() {
        return false;
      };
    }

    galleryBtnNext.addEventListener("click", nextPicture);
    galleryBtnNext.onmousedown = function (e) {
      document.onmousedown = document.onselectstart = function() {
        return false;
      };
    }
  })(i);

  function nextPicture(e) {
    if (galleryItemPortfolioNumber < galleryItemsPortfolio.length - 1) {
      galleryBtnPrevious.classList.remove("gallery__btn--show");
      galleryBtnNext.classList.remove("gallery__btn--show");
      crossPortfolio.classList.remove("cross--show");

      galleryItemPortfolioSelected.classList.remove("gallery__item--popup");
      galleryLinkPortfolioSelected.classList.remove("gallery__link--popup");
      galleryPicturePortfolioSelected.classList.remove("gallery__picture--popup");
      galleryDescriptionPortfolioSelected.classList.remove("gallery__description--popup");

      sectionPortfolio.removeChild(galleryItemPortfolioSelected);

      galleryItemPortfolioNumber += 1;

      galleryBtnNext.removeEventListener("click", nextPicture);
      setTimeout(function (e) {
        galleryBtnNext.addEventListener("click", nextPicture);
      }, 100);

      galleryItemPortfolioSelected = galleryItemsPortfolio[galleryItemPortfolioNumber].cloneNode(true);

      sectionPortfolio.appendChild(galleryItemPortfolioSelected);
      galleryItemPortfolioSelected.addEventListener("mouseover", function (e) {
        document.onkeydown = function (e) {
          if (e.keyCode === 37) {
            previousPicture(e);
          } else if (e.keyCode === 39) {
            nextPicture(e);
          } else if (e.keyCode === 27) {
            closePopup(e);
          }
        };
      });
      galleryItemPortfolioSelected.addEventListener("mouseout", function (e) {
        document.onkeydown = null;
      });

      galleryLinkPortfolioSelected = galleryItemPortfolioSelected.querySelector(".gallery__link--portfolio");
      galleryPicturePortfolioSelected = galleryItemPortfolioSelected.querySelector(".gallery__picture--portfolio");
      galleryDescriptionPortfolioSelected = galleryItemPortfolioSelected.querySelector(".gallery__description--portfolio");

      galleryPicturePortfolioSelected.appendChild(galleryBtnPrevious);
      galleryPicturePortfolioSelected.appendChild(galleryBtnNext);
      galleryLinkPortfolioSelected.appendChild(crossPortfolio);

      galleryBtnPrevious.classList.add("gallery__btn--show");
      galleryBtnNext.classList.add("gallery__btn--show");
      crossPortfolio.classList.add("cross--show");

      galleryItemPortfolioSelected.classList.add("gallery__item--popup");
      galleryLinkPortfolioSelected.classList.add("gallery__link--popup");
      galleryPicturePortfolioSelected.classList.add("gallery__picture--popup");
      galleryDescriptionPortfolioSelected.classList.add("gallery__description--popup");
    }
  }

  function previousPicture(e) {
    if (galleryItemPortfolioNumber > 0) {
      galleryBtnPrevious.classList.remove("gallery__btn--show");
      galleryBtnNext.classList.remove("gallery__btn--show");
      crossPortfolio.classList.remove("cross--show");

      galleryItemPortfolioSelected.classList.remove("gallery__item--popup");
      galleryLinkPortfolioSelected.classList.remove("gallery__link--popup");
      galleryPicturePortfolioSelected.classList.remove("gallery__picture--popup");
      galleryDescriptionPortfolioSelected.classList.remove("gallery__description--popup");

      sectionPortfolio.removeChild(galleryItemPortfolioSelected);

      galleryItemPortfolioNumber -= 1;

      galleryBtnPrevious.removeEventListener("click", previousPicture);
      setTimeout(function (e) {
        galleryBtnPrevious.addEventListener("click", previousPicture);
      }, 100);

      galleryItemPortfolioSelected = galleryItemsPortfolio[galleryItemPortfolioNumber].cloneNode(true);

      sectionPortfolio.appendChild(galleryItemPortfolioSelected);
      galleryItemPortfolioSelected.addEventListener("mouseover", function (e) {
        document.onkeydown = function (e) {
          if (e.keyCode === 37) {
            previousPicture(e);
          } else if (e.keyCode === 39) {
            nextPicture(e);
          } else if (e.keyCode === 27) {
            closePopup(e);
          }
        };
      });
      galleryItemPortfolioSelected.addEventListener("mouseout", function (e) {
        document.onkeydown = null;
      });

      galleryLinkPortfolioSelected = galleryItemPortfolioSelected.querySelector(".gallery__link--portfolio");
      galleryPicturePortfolioSelected = galleryItemPortfolioSelected.querySelector(".gallery__picture--portfolio");
      galleryDescriptionPortfolioSelected = galleryItemPortfolioSelected.querySelector(".gallery__description--portfolio");

      galleryPicturePortfolioSelected.appendChild(galleryBtnPrevious);
      galleryPicturePortfolioSelected.appendChild(galleryBtnNext);
      galleryLinkPortfolioSelected.appendChild(crossPortfolio);

      galleryBtnPrevious.classList.add("gallery__btn--show");
      galleryBtnNext.classList.add("gallery__btn--show");
      crossPortfolio.classList.add("cross--show");

      galleryItemPortfolioSelected.classList.add("gallery__item--popup");
      galleryLinkPortfolioSelected.classList.add("gallery__link--popup");
      galleryPicturePortfolioSelected.classList.add("gallery__picture--popup");
      galleryDescriptionPortfolioSelected.classList.add("gallery__description--popup");
    }
  }

  function closePopup(e) {
    galleryBtnPrevious.classList.remove("gallery__btn--show");
    galleryBtnNext.classList.remove("gallery__btn--show");
    crossPortfolio.classList.remove("cross--show");

    galleryItemPortfolioSelected.classList.remove("gallery__item--popup");
    galleryLinkPortfolioSelected.classList.remove("gallery__link--popup");
    galleryPicturePortfolioSelected.classList.remove("gallery__picture--popup");
    galleryDescriptionPortfolioSelected.classList.remove("gallery__description--popup");

    sectionPortfolio.removeChild(galleryItemPortfolioSelected);
  }

  // Реализация прокручиваемости хедера
  var pageHeader = document.querySelector(".page-header");
  var containerHeader = document.querySelector(".container--header");
  var innerContainerHeader = document.querySelector(".container__inner-wrapper--header");
  var firstScreen = document.querySelector(".first-screen");
  var secondScreen = document.querySelector(".second-screen");
  var logo = firstScreen.querySelector(".logo");
  var navigation = firstScreen.querySelector(".navigation");
  var phoneBlock = firstScreen.querySelector(".phone-block");
  var innerContainerHeaderOffsetHeight = innerContainerHeader.offsetHeight;
  var containerHeaderOffsetHeight = containerHeader.offsetHeight;
  var phoneBlockTopCoords = getCoords(phoneBlock).top;
  var arrowToSecondScreen = firstScreen.querySelector(".arrow");
  var navigationBtn = navigation.querySelector(".navigation__btn");
  var navigationList = navigation.querySelector(".navigation__list");

  containerHeader.classList.add("container--js");

  var firstScreenWrapper = document.createElement("div");
  firstScreenWrapper.className = "js__wrapper js__wrapper--first-screen";
  innerContainerHeader.insertBefore(firstScreenWrapper, secondScreen);
  firstScreenWrapper.appendChild(firstScreen);

  window.onscroll = function (e) {
    if (window.pageYOffset < innerContainerHeaderOffsetHeight - containerHeaderOffsetHeight + 50) {
      pageHeader.style.marginTop = window.pageYOffset + "px";
      innerContainerHeader.style.top = -window.pageYOffset + "px";
    } else {

    }

    if (window.pageYOffset < phoneBlockTopCoords - 15) {
      transformFirstScreenToBlock();
    } else {
      transformFirstScreenToFixedHat();
    }
  }

  arrowToSecondScreen.onclick = function (e) {
    document.body.scrollTop = 520;
  }

  navigationList.onmouseover = function (e) {
    if (navigationList.classList.contains("navigation__list--fixed-hat")) {
      phoneBlock.classList.add("phone-block--hidden");
    }
  }

  navigationList.onmouseout = function (e) {
    phoneBlock.classList.remove("phone-block--hidden");
  }

  navigationBtn.onmouseover = function (e) {
    if (navigationList.classList.contains("navigation__list--fixed-hat")) {
      phoneBlock.classList.add("phone-block--hidden");
    }
  }

  function transformFirstScreenToFixedHat() {
    innerContainerHeader.style.top = -parseFloat(getComputedStyle(pageHeader).marginTop) + containerHeader.offsetHeight - parseFloat(getComputedStyle(innerContainerHeader).paddingTop) + "px";
    document.body.appendChild(firstScreenWrapper);
    firstScreenWrapper.classList.add("js__wrapper--fixed-hat");
    firstScreen.classList.add("first-screen--fixed-hat");
    logo.classList.add("logo--fixed-hat");
    navigation.classList.add("navigation--fixed-hat");
    phoneBlock.classList.add("phone-block--fixed-hat");
    navigationBtn.classList.add("navigation__btn--fixed-hat");
    navigationList.classList.add("navigation__list--fixed-hat");
  }

  function transformFirstScreenToBlock() {
    innerContainerHeader.insertBefore(firstScreenWrapper, secondScreen);
    firstScreenWrapper.classList.remove("js__wrapper--fixed-hat");
    firstScreen.classList.remove("first-screen--fixed-hat");
    logo.classList.remove("logo--fixed-hat");
    navigation.classList.remove("navigation--fixed-hat");
    phoneBlock.classList.remove("phone-block--fixed-hat");
    navigationBtn.classList.remove("navigation__btn--fixed-hat");
    navigationList.classList.remove("navigation__list--fixed-hat");
  }

  //Оживление формы "Заказать звонок"
  var phoneBlockBtn = document.querySelector(".phone-block__btn--link");
  var phoneBlockForm = document.querySelector(".phone-block__form");
  var phoneBlockPhone = document.querySelector(".phone-block__phone");
  var phoneBlockSubmitBtn = document.querySelector(".phone-block__btn--form");
  var phoneBlockLabelName = document.querySelector(".phone-block__label--name");
  var phoneBlockLabelPhone = document.querySelector(".phone-block__label--phone");
  var phoneBlockInputName = document.querySelector(".phone-block__input--name");
  var phoneBlockInputPhone = document.querySelector(".phone-block__input--phone");

  phoneBlockInputName.required = false;
  phoneBlockInputPhone.required = false;

  phoneBlockBtn.onclick = function (e) {
    phoneBlockForm.classList.add("phone-block__form--show");
    phoneBlockBtn.classList.add("phone-block__btn--hidden");
    phoneBlockPhone.classList.add("phone-block__phone--hidden");

    return false;
  }

  phoneBlock.onmouseover = function (e) {
    document.onkeydown = function (e) {
      if (e.keyCode === 27) {
        phoneBlockForm.classList.remove("phone-block__form--show");
        phoneBlockBtn.classList.remove("phone-block__btn--hidden");
        phoneBlockPhone.classList.remove("phone-block__phone--hidden");
      }
    }
  }

  phoneBlock.onmouseout = function (e) {
    document.onkeydown = null;
  }

  phoneBlockForm.onsubmit = function (e) {
    phoneBlockLabelName.classList.remove("phone-block__label--invalid");
    phoneBlockLabelPhone.classList.remove("phone-block__label--invalid");
    phoneBlockSubmitBtn.classList.remove("phone-block__btn--invalid");
    
    if (!phoneBlockInputName.value || !phoneBlockInputPhone.value) {
      e.preventDefault();
    };

    setInterval(function (e) {
      if (!phoneBlockInputName.value && !phoneBlockInputPhone.value) {
        phoneBlockLabelName.classList.add("phone-block__label--invalid");
        phoneBlockLabelPhone.classList.add("phone-block__label--invalid");
        phoneBlockSubmitBtn.classList.add("phone-block__btn--invalid");
      } else if (!phoneBlockInputName.value && phoneBlockInputPhone.value) {
        phoneBlockLabelPhone.classList.remove("phone-block__label--invalid");
        phoneBlockLabelName.classList.add("phone-block__label--invalid");
        phoneBlockSubmitBtn.classList.add("phone-block__btn--invalid");
      } else if (phoneBlockInputName.value && !phoneBlockInputPhone.value) {
        phoneBlockLabelName.classList.remove("phone-block__label--invalid");
        phoneBlockLabelPhone.classList.add("phone-block__label--invalid");
        phoneBlockSubmitBtn.classList.add("phone-block__btn--invalid");
      } else {
        phoneBlockLabelName.classList.remove("phone-block__label--invalid");
        phoneBlockLabelPhone.classList.remove("phone-block__label--invalid");
        phoneBlockSubmitBtn.classList.remove("phone-block__btn--invalid");
      }
    }, 4);
  }

  setInterval(function () {
    if (phoneBlockInputName.value && phoneBlockInputPhone.value) {
      phoneBlockSubmitBtn.classList.add("phone-block__btn--ready");
    } else {
      phoneBlockSubmitBtn.classList.remove("phone-block__btn--ready");
    }
  }, 4);
})();
