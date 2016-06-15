(function () {
  var i;
  var galleries = document.querySelectorAll(".gallery");
  var galleryContainers = document.querySelectorAll(".gallery__container");
  var scrolls = document.querySelectorAll(".scroll");
  var scrollArrowsLeft = document.querySelectorAll(".scroll__arrow--left");
  var scrollArrowsRight = document.querySelectorAll(".scroll__arrow--right");
  var scrollTracks = document.querySelectorAll(".scroll__track");
  var sectionPortfolio = document.querySelector(".content--portfolio");
  var galleryItemsPortfolio = document.querySelectorAll(".gallery__item--portfolio");
  var galleryLinksPortfolio = document.querySelectorAll(".gallery__link--portfolio");
  var galleryPicturesPortfolio = document.querySelectorAll(".gallery__picture--portfolio");
  var galleryDescriptionsPortfolio = document.querySelectorAll(".gallery__description--portfolio");
  var pageHeader = document.querySelector(".page-header");
  var containerHeader = document.querySelector(".container--header");
  var innerContainerHeader = document.querySelector(".container__inner-wrapper--header");
  var firstScreen = document.querySelector(".first-screen");
  var secondScreen = document.querySelector(".second-screen");
  var logo = firstScreen.querySelector(".logo");
  var navigation = firstScreen.querySelector(".navigation");
  var phoneBlock = firstScreen.querySelector(".phone-block");
  var arrowToSecondScreen = firstScreen.querySelector(".arrow");
  var navigationBtn = navigation.querySelector(".navigation__btn");
  var navigationList = navigation.querySelector(".navigation__list");
  var phoneBlockBtn = document.querySelector(".phone-block__btn--link");
  var phoneBlockForm = document.querySelector(".phone-block__form");
  var phoneBlockPhone = document.querySelector(".phone-block__phone");
  var phoneBlockSubmitBtn = document.querySelector(".phone-block__btn--form");
  var phoneBlockLabelName = document.querySelector(".phone-block__label--name");
  var phoneBlockLabelPhone = document.querySelector(".phone-block__label--phone");
  var phoneBlockInputName = document.querySelector(".phone-block__input--name");
  var phoneBlockInputPhone = document.querySelector(".phone-block__input--phone");
  var contactsFormBtn = document.querySelector(".contacts__btn--link");
  var contactsForm = document.querySelector(".contacts__form");
  var clients = document.querySelector(".content--clients");
  var pageFooter = document.querySelector(".page-footer");
  var containerFooter = document.querySelector(".container--footer");
  var contacts = document.querySelector(".contacts");
  var partners = pageFooter.querySelector(".partners");
  var containerAbout = document.querySelector(".container--about-me");
  var contactsSubmitBtn = document.querySelector(".contacts__btn--form");
  var phoneBlockTextSubmit = document.querySelector(".phone-block__text--submit");
  var phoneBlockLabels = document.querySelectorAll(".phone-block__label");
  var phoneBlockInputs = document.querySelectorAll(".phone-block__input");
  var contactsInputs = document.querySelectorAll(".contacts__input");
  var contactsInputName = document.querySelector(".contacts__input--name");
  var contactsInputEmail = document.querySelector(".contacts__input--e-mail");
  var contactsInputPhone = document.querySelector(".contacts__input--phone");
  var contactsInputMessage = document.querySelector(".contacts__input--message");
  var contactsTextTitle = document.querySelector(".contacts__text--form-title");
  var navigationLinks = navigation.querySelectorAll(".navigation__link");
  var contents = document.querySelectorAll(".content");
  var pageTitle = document.querySelector(".page-title");
  var pageTitleRole = document.querySelector(".page-title__role");
  var pageTitleAnimatedWord = document.querySelector(".page-title__animated-word");
  var pageTitleCategory = document.querySelector(".page-title__category");

  (function scrollbar(scrollableContents, scrollableContentContainers, scrollbars, scrollArrowsLeft, scrollArrowsRight, scrollbarTracks) {
    var timerTrackToRight;
    var timerTrackToLeft;

    setInterval(function () {
      for (i = 0; i < scrollbars.length; ++i)(function(i) {
        resizeScrollbarTrack(scrollableContents[i], scrollableContentContainers[i], scrollbars[i], scrollbarTracks[i]);
        scrollContent(scrollableContents[i], scrollableContentContainers[i], scrollbars[i], scrollbarTracks[i]);
      })(i);
    }, 50);

    for (i = 0; i < scrollableContents.length; ++i)(function(i) {
      scrollableContents[i].classList.add("gallery--js-on");
      scrollbars[i].classList.add("scroll--show");
      scrollbarMovingInterface(i);
    })(i);

    function scrollbarMovingInterface(i) {
      scrollArrowsLeft[i].addEventListener("mousedown", function () {
        timerTrackToLeft = setInterval(function () {
          if (getCoords(scrollbarTracks[i]).left >= 17 + getCoords(scrollbars[i]).left) {
            scrollbarTracks[i].style.left = parseFloat(getComputedStyle(scrollbarTracks[i]).left) - 1 + "px";
          }
        }, 4);
      });

      scrollArrowsLeft[i].addEventListener("mouseup", function () {
        clearInterval(timerTrackToLeft);
      });

      scrollArrowsRight[i].addEventListener("mousedown", function () {
        timerTrackToRight = setInterval(function () {
          if (getCoords(scrollbarTracks[i]).left <= getCoords(scrollbars[i]).left + scrollbars[i].offsetWidth - scrollbarTracks[i].offsetWidth - 25) {
            scrollbarTracks[i].style.left = parseFloat(getComputedStyle(scrollbarTracks[i]).left) + 1 + "px";
          }
        }, 4);
      });

      scrollArrowsRight[i].addEventListener("mouseup", function () {
        clearInterval(timerTrackToRight);
      });

      scrollbarTracks[i].onmousedown = scrollbarDragAndDrop(i);

      scrollableContents[i].addEventListener("mouseover", function (e) {
        document.onkeydown = function (e) {
          if (e.keyCode === 37) {
            if (getCoords(scrollbarTracks[i]).left >= 17 + getCoords(scrollbars[i]).left) {
              scrollbarTracks[i].style.left = parseFloat(getComputedStyle(scrollbarTracks[i]).left) - 5 + "px";
            }
          } else if (e.keyCode === 39) {
            if (getCoords(scrollbarTracks[i]).left <= getCoords(scrollbars[i]).left + scrollbars[i].offsetWidth - scrollbarTracks[i].offsetWidth - 25) {
              scrollbarTracks[i].style.left = parseFloat(getComputedStyle(scrollbarTracks[i]).left) + 5 + "px";
            };
          }
        };
      });

      scrollableContents[i].addEventListener("mouseout", function (e) {
        document.onkeydown = null;
      })
    }

    function scrollbarDragAndDrop(i) {
      return function (e) {
        scrollbarTracks[i].ondragstart = function () {
          return false;
        };

        document.onmousedown = document.onselectstart = function() {
          return false;
        };

        var coords = getCoords(scrollbarTracks[i]);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        document.body.appendChild(scrollbarTracks[i]);
        scrollbarTracks[i].style.left = e.pageX - shiftX + 4 + "px";
        scrollbarTracks[i].style.top = getCoords(scrollbars[i]).top - parseFloat(getComputedStyle(pageHeader).marginTop) + "px";
        setInterval(function () {
          scrollbarTracks[i].style.top = getCoords(scrollbars[i]).top - parseFloat(getComputedStyle(pageHeader).marginTop) + "px";
        }, 1000);

        document.onmousemove = function (e) {
          moveXAt(e);
        };

        document.onmouseup = function() {
          setInterval(function (e) {
            if (getCoords(scrollbars[i]).left > getCoords(scrollbarTracks[i]).left) {
              scrollbarTracks[i].style.left = getCoords(scrollbars[i]).left + 21 + "px";
            } else if (getCoords(scrollbarTracks[i]).left > getCoords(scrollbars[i]).left + scrollbars[i].offsetWidth - scrollbarTracks[i].offsetWidth - 21) {
              scrollbarTracks[i].style.left = getCoords(scrollbars[i]).left + scrollbars[i].offsetWidth - scrollbarTracks[i].offsetWidth - 21 + "px";
            }
          }, 4);
          document.onmousemove = null;
          document.onmouseup = null;
          document.onmousedown = document.onselectstart = null;
        };

        function moveXAt(e) {
          if (e.pageX - shiftX + 4 < getCoords(scrollbars[i]).left + 21) {
            scrollbarTracks[i].style.left = getCoords(scrollbars[i]).left + 21 + "px";
          } else if (e.pageX - shiftX + 4 > getCoords(scrollbars[i]).left + scrollbars[i].offsetWidth - scrollbarTracks[i].offsetWidth - 21) {
            scrollbarTracks[i].style.left = getCoords(scrollbars[i]).left + scrollbars[i].offsetWidth - scrollbarTracks[i].offsetWidth - 21 + "px";
          } else {
            scrollbarTracks[i].style.left = e.pageX - shiftX + "px";
          }
        }
      }
    }

    function resizeScrollbarTrack(scrollableContent, scrollableContentContainer, scrollbar, scrollbarTrack) {
      if (scrollableContent.offsetWidth > scrollableContentContainer.offsetWidth) {
        scrollbar.classList.remove("scroll--show");
      } else {
        scrollbar.classList.add("scroll--show");
        scrollbarTrack.style.width = (scrollbar.offsetWidth - 42) / scrollableContentContainer.offsetWidth * scrollableContent.offsetWidth + "px";
      }
    };

    function scrollContent(scrollableContent, scrollableContentContainer, scrollbar, scrollbarTrack) {
       if (parseFloat(getComputedStyle(scrollableContentContainer).left) <= 0 || parseFloat(getComputedStyle(scrollableContentContainer).left) >= scrollableContent.offsetWidth - scrollableContentContainer.offsetWidth) {
        scrollableContentContainer.style.left = (getCoords(scrollbar).left + 17 - getCoords(scrollbarTrack).left) * (scrollableContentContainer.offsetWidth - scrollableContent.offsetWidth) / (scrollbar.offsetWidth - scrollbarTrack.offsetWidth - 42) + "px";
      }
    };
  })(galleries, galleryContainers, scrolls, scrollArrowsLeft, scrollArrowsRight, scrollTracks);

  (function popup(popupItems, popupLinks, popupPictures, popupDescriptions) {
    var popupItemSelected;
    var popupLinkSelected;
    var popupPictureSelected;
    var popupDescriptionSelected;
    var popupItemNumber;

    var popupBtnPrevious = document.createElement("a");
    popupBtnPrevious.className = "gallery__btn gallery__btn--previous";
    popupBtnPrevious.innerHTML = "Предыдущее";

    var popupBtnNext = document.createElement("a");
    popupBtnNext.className = "gallery__btn gallery__btn--next";
    popupBtnNext.innerHTML = "Следующее";

    var popupCross = document.createElement("a");
    popupCross.className = "cross cross--portfolio";
    popupCross.innerHTML = "&times;";

    for (i = 0; i < popupItems.length; ++i)(function(i) {
      popupLinks[i].addEventListener("click", function (e) {
        popupItemNumber = i;
        console.log(popupItemNumber);
        popupItemSelected = popupItems[popupItemNumber].cloneNode(true);

        sectionPortfolio.appendChild(popupItemSelected);
        popupItemSelected.addEventListener("mouseover", function (e) {
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
        popupItemSelected.addEventListener("mouseout", function (e) {
          document.onkeydown = null;
        });

        popupLinkSelected = popupItemSelected.querySelector(".gallery__link--portfolio");
        popupPictureSelected = popupItemSelected.querySelector(".gallery__picture--portfolio");
        popupDescriptionSelected = popupItemSelected.querySelector(".gallery__description--portfolio");

        popupPictureSelected.appendChild(popupBtnPrevious);
        popupPictureSelected.appendChild(popupBtnNext);
        popupLinkSelected.appendChild(popupCross);

        popupBtnPrevious.classList.add("gallery__btn--show");
        popupBtnNext.classList.add("gallery__btn--show");
        popupCross.classList.add("cross--show");

        popupItemSelected.classList.add("gallery__item--popup");
        popupLinkSelected.classList.add("gallery__link--popup");
        popupPictureSelected.classList.add("gallery__picture--popup");
        popupDescriptionSelected.classList.add("gallery__description--popup");
      });

      popupCross.addEventListener("click", closePopup);

      popupBtnPrevious.addEventListener("click", previousPicture);
      popupBtnPrevious.onmousedown = function (e) {
        document.onmousedown = document.onselectstart = function() {
          return false;
        };
      }

      popupBtnNext.addEventListener("click", nextPicture);
      popupBtnNext.onmousedown = function (e) {
        document.onmousedown = document.onselectstart = function() {
          return false;
        };
      }
    })(i);

    function nextPicture(e) {
      if (popupItemNumber < popupItems.length - 1) {
        popupBtnPrevious.classList.remove("gallery__btn--show");
        popupBtnNext.classList.remove("gallery__btn--show");
        popupCross.classList.remove("cross--show");

        popupItemSelected.classList.remove("gallery__item--popup");
        popupLinkSelected.classList.remove("gallery__link--popup");
        popupPictureSelected.classList.remove("gallery__picture--popup");
        popupDescriptionSelected.classList.remove("gallery__description--popup");

        sectionPortfolio.removeChild(popupItemSelected);

        popupItemNumber += 1;

        popupBtnNext.removeEventListener("click", nextPicture);
        setTimeout(function (e) {
          popupBtnNext.addEventListener("click", nextPicture);
        }, 100);

        popupItemSelected = popupItems[popupItemNumber].cloneNode(true);

        sectionPortfolio.appendChild(popupItemSelected);
        popupItemSelected.addEventListener("mouseover", function (e) {
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
        popupItemSelected.addEventListener("mouseout", function (e) {
          document.onkeydown = null;
        });

        popupLinkSelected = popupItemSelected.querySelector(".gallery__link--portfolio");
        popupPictureSelected = popupItemSelected.querySelector(".gallery__picture--portfolio");
        popupDescriptionSelected = popupItemSelected.querySelector(".gallery__description--portfolio");

        popupPictureSelected.appendChild(popupBtnPrevious);
        popupPictureSelected.appendChild(popupBtnNext);
        popupLinkSelected.appendChild(popupCross);

        popupBtnPrevious.classList.add("gallery__btn--show");
        popupBtnNext.classList.add("gallery__btn--show");
        popupCross.classList.add("cross--show");

        popupItemSelected.classList.add("gallery__item--popup");
        popupLinkSelected.classList.add("gallery__link--popup");
        popupPictureSelected.classList.add("gallery__picture--popup");
        popupDescriptionSelected.classList.add("gallery__description--popup");
      }
    }

    function previousPicture(e) {
      if (popupItemNumber > 0) {
        popupBtnPrevious.classList.remove("gallery__btn--show");
        popupBtnNext.classList.remove("gallery__btn--show");
        popupCross.classList.remove("cross--show");

        popupItemSelected.classList.remove("gallery__item--popup");
        popupLinkSelected.classList.remove("gallery__link--popup");
        popupPictureSelected.classList.remove("gallery__picture--popup");
        popupDescriptionSelected.classList.remove("gallery__description--popup");

        sectionPortfolio.removeChild(popupItemSelected);

        popupItemNumber -= 1;

        popupBtnPrevious.removeEventListener("click", previousPicture);
        setTimeout(function (e) {
         popupBtnPrevious.addEventListener("click", previousPicture);
        }, 100);

        popupItemSelected = popupItems[popupItemNumber].cloneNode(true);

        sectionPortfolio.appendChild(popupItemSelected);
        popupItemSelected.addEventListener("mouseover", function (e) {
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
        popupItemSelected.addEventListener("mouseout", function (e) {
          document.onkeydown = null;
        });

        popupLinkSelected = popupItemSelected.querySelector(".gallery__link--portfolio");
        popupPictureSelected = popupItemSelected.querySelector(".gallery__picture--portfolio");
        popupDescriptionSelected = popupItemSelected.querySelector(".gallery__description--portfolio");

        popupPictureSelected.appendChild(popupBtnPrevious);
        popupPictureSelected.appendChild(popupBtnNext);
        popupLinkSelected.appendChild(popupCross);

        popupBtnPrevious.classList.add("gallery__btn--show");
        popupBtnNext.classList.add("gallery__btn--show");
        popupCross.classList.add("cross--show");

        popupItemSelected.classList.add("gallery__item--popup");
        popupLinkSelected.classList.add("gallery__link--popup");
        popupPictureSelected.classList.add("gallery__picture--popup");
        popupDescriptionSelected.classList.add("gallery__description--popup");
      }
    }

    function closePopup(e) {
      popupBtnPrevious.classList.remove("gallery__btn--show");
      popupBtnNext.classList.remove("gallery__btn--show");
      popupCross.classList.remove("cross--show");

      popupItemSelected.classList.remove("gallery__item--popup");
      popupLinkSelected.classList.remove("gallery__link--popup");
      popupPictureSelected.classList.remove("gallery__picture--popup");
      popupDescriptionSelected.classList.remove("gallery__description--popup");

      sectionPortfolio.removeChild(popupItemSelected);
    }
  })(galleryItemsPortfolio, galleryLinksPortfolio, galleryPicturesPortfolio, galleryDescriptionsPortfolio);

  (function headerEffectsOn() {
    var innerContainerHeaderOffsetHeight = innerContainerHeader.offsetHeight;
    var containerHeaderOffsetHeight = containerHeader.offsetHeight;
    var phoneBlockTopCoords = getCoords(phoneBlock).top;

    containerHeader.classList.add("container--js");

    var firstScreenWrapper = document.createElement("div");
    firstScreenWrapper.className = "js__wrapper js__wrapper--first-screen";
    innerContainerHeader.insertBefore(firstScreenWrapper, secondScreen);
    firstScreenWrapper.appendChild(firstScreen);

    window.onscroll = function (e) {
      scrollHeader(e);

      if (window.pageYOffset > phoneBlockTopCoords - 15) {
        transformFirstScreenToFixedHat();
      } else {
        transformFirstScreenToBlock();
      }
    }

    arrowToSecondScreen.onclick = gradualScrolling(innerContainerHeaderOffsetHeight - containerHeaderOffsetHeight + 70, 5);

    var hideNavigationListTimer;

    navigationList.onmouseover = function (e) {
      if (navigationList.classList.contains("navigation__list--fixed-hat")) {
        phoneBlock.classList.add("phone-block--hidden");
      }

      //Пропадание меню с задержкой
      clearTimeout(hideNavigationListTimer);
      navigationList.classList.add("navigation__list--show");
    }

    navigationList.onmouseout = function (e) {
      //Пропадание меню с задержкой
      hideNavigationListTimer = setTimeout(function (e) {
        navigationList.classList.remove("navigation__list--show");
        navigationList.classList.add("navigation__list--hide");
        phoneBlock.classList.remove("phone-block--hidden");
        setTimeout(function () {
          navigationList.classList.remove("navigation__list--hide");
        }, 301);
      }, 1000);
    }

    navigationBtn.onmouseover = function (e) {
      if (navigationList.classList.contains("navigation__list--fixed-hat")) {
        phoneBlock.classList.add("phone-block--hidden");
      }
    }

    function scrollHeader() {
      if (window.pageYOffset < innerContainerHeaderOffsetHeight - containerHeaderOffsetHeight + 50) {
        pageHeader.style.marginTop = window.pageYOffset + "px";
        innerContainerHeader.style.top = -window.pageYOffset + "px";
      } else {
        pageHeader.style.marginTop = innerContainerHeaderOffsetHeight - containerHeaderOffsetHeight + 50 + "px";
        innerContainerHeader.style.top = -(innerContainerHeaderOffsetHeight - containerHeaderOffsetHeight + 50) + "px";
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
      pageTitle.classList.add("page-title--fixed-hat");
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
      pageTitle.classList.remove("page-title--fixed-hat");
    }
  })();

  (function phoneBlockEffectsOn() {
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
  })();

  (function callbackFormEffectsOn() {
    var contactsFormSkew;
    var elementsWithOverlay;

    var overlay = document.createElement("div");
    overlay.classList.add("overlay");

    var contactsFormWrapper = document.createElement("div");
    contactsFormWrapper.classList.add("js__wrapper");
    contactsFormWrapper.classList.add("js__wrapper--contacts__form");
    contactsFormWrapper.appendChild(contactsForm);
    containerFooter.appendChild(contactsFormWrapper);

    contactsFormWrapper.style.top = -clients.offsetHeight + "px";

    setInterval(function () {
      contactsFormWrapperSkew = Math.atan(contactsFormWrapper.offsetHeight / (containerFooter.offsetWidth - contactsFormWrapper.offsetWidth)) * 180 / 3.14 - 90;
      contactsFormWrapper.style.WebkitTransform = "skewX(" + contactsFormWrapperSkew + "deg)";
      contactsFormWrapper.style.transform = "skewX(" + contactsFormWrapperSkew + "deg)";

      contactsForm.style.WebkitTransform = "translate(-50%, -50%) skewX(" + -contactsFormWrapperSkew + "deg)";
      contactsForm.style.transform = "translate(-50%, -50%) skewX(" + -contactsFormWrapperSkew + "deg)";
    }, 1000);

    contactsFormBtn.onclick = function (e) {
      contactsFormWrapper.classList.add("js__wrapper--show");
      clients.appendChild(overlay);
      pageFooter.appendChild(overlay.cloneNode(true));
      elementsWithOverlay = document.querySelectorAll(".overlay");
      for (var i = 0; i < elementsWithOverlay.length; ++i) {
        elementsWithOverlay[i].onclick = function (e) {
          closeContactsForm();
        }
      }

      return false;
    }

    contactsFormWrapper.addEventListener("mouseover", function (e) {
      window.onkeydown = function (e) {
        if (e.keyCode === 27) {
          closeContactsForm();
        }
      }
    })

    contactsFormWrapper.addEventListener("mouseout", function (e) {
      window.onkeydown = "";
    });

    function closeContactsForm(e) {
      contactsFormWrapper.classList.remove("js__wrapper--show");
      clients.removeChild(clients.querySelector(".overlay"));
      pageFooter.removeChild(pageFooter.querySelector(".overlay"));
    }
  })();

  (function bgLinesOn() {
    var bgLineWrapper = document.createElement("div");
    bgLineWrapper.classList.add("js__wrapper");
    bgLineWrapper.classList.add("js__wrapper--bg-line");

    var bgLineWrapperPartners = bgLineWrapper.cloneNode(true);
    var bgLinePartners = document.createElement("div");
    bgLinePartners.classList.add("bg-line");
    bgLinePartners.classList.add("bg-line--partners");
    document.body.appendChild(bgLineWrapperPartners);
    bgLineWrapperPartners.appendChild(bgLinePartners);

    var bgLineWrapperCopyright = bgLineWrapper.cloneNode(true);
    var bgLineCopyright = document.createElement("div");
    bgLineCopyright.classList.add("bg-line");
    bgLineCopyright.classList.add("bg-line--copyright");
    document.body.appendChild(bgLineWrapperCopyright);
    bgLineWrapperCopyright.appendChild(bgLineCopyright);

    var bgLineWrapperAbout = bgLineWrapper.cloneNode(true);
    var bgLineAbout = document.createElement("div");
    bgLineAbout.classList.add("bg-line");
    bgLineAbout.classList.add("bg-line--about");
    document.body.appendChild(bgLineWrapperAbout);
    bgLineWrapperAbout.appendChild(bgLineAbout);

    setInterval(function () {
      bgLinePartners.style.WebkitTransform = "skew(-22deg) translateX(" + 1000/bgLinePartners.offsetWidth * 72.9 + "%)";
      bgLinePartners.style.transform = "skew(-22deg) translateX(" + 1000/bgLinePartners.offsetWidth * 72.9 + "%)";
      bgLineCopyright.style.left = getCoords(partners).left + partners.offsetWidth + "px";
      bgLineAbout.style.left = getCoords(containerAbout).left - bgLineAbout.offsetWidth + "px";
    }, 4);
  })();

  (function sendFormsToEmailOn() {
    var phoneBlockCross = document.createElement("a");
    var patternInputName = new RegExp("^[A-Za-zА-Яа-яЁё ]+$");
    var patternInputPhone = new RegExp("^[0-9 ()+-]{1,18}$");
    var patternInputEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    var patternInputMessage = new RegExp("^.*$");

    phoneBlockSubmitBtn.setAttribute("type", "button");
    contactsSubmitBtn.setAttribute("type", "button");

    phoneBlockSubmitBtn.addEventListener("click", phoneBlockSubmit);

    function phoneBlockSubmit(e) {
      clearInterval(validationPhoneBlockTimer);

      if (phoneBlockInputName.value && phoneBlockInputPhone.value && patternInputName.test(phoneBlockInputName.value) && patternInputPhone.test(phoneBlockInputPhone.value)) {
        var formData = new FormData(phoneBlockForm);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/php/send.php", true);

        xhr.onloadstart = function (e) {
          phoneBlockCross.classList.remove("cross--done");
          phoneBlockSubmitBtn.removeEventListener("click", phoneBlockSubmit);
          phoneBlockLabelName.classList.add("phone-block__label--sending");
          phoneBlockLabelPhone.classList.add("phone-block__label--sending");
          phoneBlockSubmitBtn.classList.add("phone-block__btn--sending");
          phoneBlockTextSubmit.innerHTML = "Отправление...";
          phoneBlockInputName.disabled = true;
          phoneBlockInputPhone.disabled = true;

          phoneBlockCross.classList.add("cross");
          phoneBlockCross.classList.add("cross--phone-block");
          phoneBlockForm.appendChild(phoneBlockCross);

          phoneBlockCross.addEventListener("click", function (e) {
            e.preventDefault();

            xhr.abort();

            phoneBlockSubmitBtn.addEventListener("click", phoneBlockSubmit);
            phoneBlockLabelName.classList.remove("phone-block__label--sending");
            phoneBlockLabelPhone.classList.remove("phone-block__label--sending");
            phoneBlockSubmitBtn.classList.remove("phone-block__btn--sending");
            phoneBlockTextSubmit.innerHTML = "Отправить запрос";
            phoneBlockInputName.disabled = false;
            phoneBlockInputPhone.disabled = false;

            phoneBlockForm.removeChild(phoneBlockCross);
          })
        }

        xhr.onload = function (e) {
          phoneBlockTextSubmit.innerHTML = "Отправлено";

          phoneBlockCross.classList.add("cross--done");
        }

        xhr.send(formData);
      };

      var validationPhoneBlockTimer = setInterval(function (e) {
        for (i = 0; i < phoneBlockInputs.length; ++i) {
          var patterns = [];
          patterns.push(patternInputName);
          patterns.push(patternInputPhone);
          if (!phoneBlockInputs[i].value || !patterns[i].test(phoneBlockInputs[i].value)) {
            phoneBlockLabels[i].classList.add("phone-block__label--invalid");
            phoneBlockSubmitBtn.classList.add("phone-block__btn--invalid");
          } else {
            phoneBlockLabels[i].classList.remove("phone-block__label--invalid");
            phoneBlockSubmitBtn.classList.remove("phone-block__btn--invalid");
          }
        }
      }, 50);
    }

    contactsSubmitBtn.onclick = contactsSubmit;

    function contactsSubmit(e) {
      clearInterval(validationCallbackFormTimer);

      if (contactsInputName.value && contactsInputPhone.value && contactsInputEmail.value && contactsInputMessage.value && patternInputName.test(contactsInputName.value) && patternInputPhone.test(contactsInputPhone.value) && patternInputEmail.test(contactsInputEmail.value) && patternInputMessage.test(contactsInputMessage.value)) {
        var formData = new FormData(contactsForm);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/php/send.php", true);

        xhr.onloadstart = function (e) {
          contactsSubmitBtn.onclick = function (e) {
            xhr.abort();

            contactsSubmitBtn.onclick = contactsSubmit;

            contactsSubmitBtn.setAttribute("value", "Отправить");

            for (i = 0; i < contactsInputs.length; ++i) {
              contactsInputs[i].disabled = false;
            }
          };
          contactsSubmitBtn.setAttribute("value", "Отправка...");
          for (i = 0; i < contactsInputs.length; ++i) {
            contactsInputs[i].disabled = true;
          }
        }

        xhr.onload = function (e) {
          for (i = 0; i < contactsInputs.length; ++i) {
            contactsInputs[i].classList.add("contacts__input--hidden");
          }
          contactsSubmitBtn.setAttribute("value", "Готово");
          contactsSubmitBtn.classList.add("contacts__btn--complete");
          contactsTextTitle.classList.add("contacts__text--complete");
          contactsTextTitle.innerHTML = "Ваша&nbsp;заявка&nbsp;отправлена,<br>мы&nbsp;свяжемся&nbsp;с&nbsp;вами<br>при&nbsp;первой&nbsp;возможности";
          contactsSubmitBtn.onclick = function (e) {
            closeContactsForm();
            contactsSubmitBtn.onclick = contactsSubmit;
            contactsSubmitBtn.setAttribute("value", "Отправить");
            contactsSubmitBtn.classList.remove("contacts__btn--complete");
            for (i = 0; i < contactsInputs.length; ++i) {
              contactsInputs[i].disabled = false;
              contactsInputs[i].classList.remove("contacts__input--hidden");
            }
            contactsTextTitle.classList.remove("contacts__text--complete");
            contactsTextTitle.innerHTML = "Опишите ваше мероприятие";
          }
        }

        xhr.send(formData);
      };

      var validationCallbackFormTimer = setInterval(function (e) {
        var patterns = [];
        patterns.push(patternInputName);
        patterns.push(patternInputEmail);
        patterns.push(patternInputPhone);
        patterns.push(patternInputMessage);
        for (i = 0; i < contactsInputs.length; ++i) {
          if (!contactsInputs[i].value || !patterns[i].test(contactsInputs[i].value)) {
            contactsInputs[i].classList.add("contacts__input--invalid");
          } else {
            contactsInputs[i].classList.remove("contacts__input--invalid");
          }
        }
      }, 50);
    }
  })();

  (function anchorScrolling() {
    for (i = 0; i < navigationLinks.length; ++i) {
      navigationLinks[i].onclick = gradualScrolling(getCoords(contents[i]).top + pageHeader.offsetHeight, 10);
    }
  })();

  (function pageTitleEffectsOn() {
    var pageTitleAnimatedWordList = ["вашего", "вашей"];
    var pageTitleCategoryList = ["Корпоратива", "Свадьбы", "Праздничного концерта", "Рекламной акции", "Деловой конференции", "Спортивного мероприятия"];
    var pageTitleCounter = 1;

    setInterval(function () {
      pageTitleCategory.offsetWidth = pageTitleCategory.offsetWidth;
      pageTitleCategory.classList.add("page-title__category--disappear");

      setTimeout(function () {
        if (pageTitleCounter === 0 || pageTitleCounter === 2 || pageTitleCounter === 5) {
          pageTitleAnimatedWord.innerHTML = pageTitleAnimatedWordList[0];
        } else {
          pageTitleAnimatedWord.innerHTML = pageTitleAnimatedWordList[1];
        }
        pageTitleCategory.innerHTML = pageTitleCategoryList[pageTitleCounter];
        if (pageTitleCounter < pageTitleCategoryList.length - 1) {
          ++pageTitleCounter;
        } else {
          pageTitleCounter = 0;
        }

        pageTitleCategory.classList.remove("page-title__category--disappear");
        pageTitleCategory.offsetWidth = pageTitleCategory.offsetWidth;
        pageTitleCategory.classList.add("page-title__category--appear");

        setTimeout(function () {
          pageTitleCategory.classList.remove("page-title__category--appear");
        }, 600);
      }, 580);
    }, 5000);
  })();

  function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + window.pageYOffset,
      left: box.left + pageXOffset
    };
  }

  function gradualScrolling(distanceToDestinationElement, scrollSpeed) {
    return function (e) {
      var scrollTimer = setInterval(function (e) {
        if (document.body.scrollTop < distanceToDestinationElement) {
          document.body.scrollTop += scrollSpeed;
        } else if (document.body.scrollTop > distanceToDestinationElement + scrollSpeed - 1) {
          document.body.scrollTop -= scrollSpeed;
        } else {
          clearInterval(scrollTimer);
        }
      }, 4);

      var scrollStopTimer = setInterval(function () {
        var oldPageYOffset = window.pageYOffset;
        setTimeout(function () {
          if (window.pageYOffset === oldPageYOffset) {
            clearInterval(scrollTimer);
            clearInterval(scrollStopTimer);
          }
        }, 4);
      }, 4);

      return false;
    }
  }
})();
