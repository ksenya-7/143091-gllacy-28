var popupLink = document.querySelector(".popup-link");
var popupCallback = document.querySelector(".callback");
var popupClose = popupCallback.querySelector("[type=button]");
var popupForm = popupCallback.querySelector("form");
var popupSubmit = popupCallback.querySelector("[type=submit]");
var userName = popupCallback.querySelector("[name=name-user]");
var loginLogin = popupCallback.querySelector("[name=login]");
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".modal-overlay");

var wrapper = document.querySelector(".wrapper");
var controls = document.querySelectorAll(".control");
var slides = document.querySelectorAll(".slider-list__item");
var wrapperClasses = ["wrapper--green", "wrapper--bluegrey", "wrapper--brown"];

var isStorageSupport = true;
var storageName = "";
var storageLogin = "";

var closeModal = function () {
  popupCallback.classList.remove("callback-show");
  popupCallback.classList.remove("callback-error");
  modal.classList.remove("modal-active");
};

try {
  storageLogin = localStorage.getItem("login");
  storageName = localStorage.getItem("name");
} catch (err) {
  isStorageSupport = false;
}

popupLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupCallback.classList.add("callback-show");
  modal.classList.add("modal-active");

  if (storageName && storageLogin) {
    popupSubmit.focus();
  } else {
    userName.focus();
  }
});

popupClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeModal();
});

overlay.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeModal();
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popupCallback.classList.contains("callback-show")) {
      evt.preventDefault();
      closeModal();
    }
  }
});

popupForm.addEventListener("submit", function (evt) {
  if (!userName.value || !loginLogin.value) {
    evt.preventDefault();
    popupCallback.classList.remove("callback-error");
    popupCallback.offsetWidth = popupCallback.offsetWidth;
    popupCallback.classList.add("callback-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", loginLogin.value);
      localStorage.setItem("name", userName.value);
    }
  }
});

var removeWrapperClasses = function () {
  for (var i = 0; i < wrapperClasses.length; i++) {
    wrapper.classList.remove(wrapperClasses[i]);
  }
};

var hideAllSlides = function () {
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove("slide-current");
  }
};

var removeAble = function () {
  for (var i = 0; i < slides.length; i++) {
    controls[i].classList.remove("able");
  }
}

if (controls.length) {
  controls.forEach(function (el, index) {
    el.addEventListener("click", function () {
      removeWrapperClasses();
      hideAllSlides();
      removeAble();
      slides[index].classList.add("slide-current");
      wrapper.classList.add(wrapperClasses[index]);
      controls[index].classList.add("able");
    });
  });
}

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [59.939290, 30.32944],
    zoom: 16,
    behaviors: ["drag"]
  });

  myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/pin.svg',
    iconImageSize: [80, 140],
    iconImageOffset: [-40, -140]
  })

  myMap.geoObjects.add(myPlacemark);
}
