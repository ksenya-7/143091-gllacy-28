var popupLink = document.querySelector(".popup-link"),
  popupCallback = document.querySelector(".callback"),
  popupClose = popupCallback.querySelector("[type=button]"),
  popupForm = popupCallback.querySelector("form"),
  popupSubmit = popupCallback.querySelector("[type=submit]"),
  userName = popupCallback.querySelector("[name=name-user]"),
  loginLogin = popupCallback.querySelector("[name=login]"),
  modal = document.querySelector(".modal"),
  overlay = document.querySelector(".modal-overlay"),
  wrapper = document.querySelector(".wrapper"),
  controls = document.querySelectorAll(".control"),
  slides = document.querySelectorAll(".slider-list__item"),
  wrapperClasses = ["wrapper--green", "wrapper--bluegrey", "wrapper--brown"],
  isStorageSupport = !0,
  storageName = "",
  storageLogin = "",
  closeModal = function () {
    popupCallback.classList.remove("callback-show"), popupCallback.classList.remove("callback-error"), modal.classList.remove("modal-active")
  };
try {
  storageLogin = localStorage.getItem("login"), storageName = localStorage.getItem("name")
} catch (e) {
  isStorageSupport = !1
}
popupLink.addEventListener("click", function (e) {
  e.preventDefault(), popupCallback.classList.add("callback-show"), modal.classList.add("modal-active"), storageName && storageLogin ? popupSubmit.focus() : userName.focus()
}), popupClose.addEventListener("click", function (e) {
  e.preventDefault(), closeModal()
}), overlay.addEventListener("click", function (e) {
  e.preventDefault(), closeModal()
}), window.addEventListener("keydown", function (e) {
  27 === e.keyCode && popupCallback.classList.contains("callback-show") && (e.preventDefault(), closeModal())
}), popupForm.addEventListener("submit", function (e) {
  userName.value && loginLogin.value ? isStorageSupport && (localStorage.setItem("login", loginLogin.value), localStorage.setItem("name", userName.value)) : (e.preventDefault(), popupCallback.classList.remove("callback-error"), popupCallback.offsetWidth, popupCallback.classList.add("callback-error"))
});
var removeWrapperClasses = function () {
    for (var e = 0; e < wrapperClasses.length; e++) wrapper.classList.remove(wrapperClasses[e])
  },
  hideAllSlides = function () {
    for (var e = 0; e < slides.length; e++) slides[e].classList.remove("slide-current")
  },
  removeAble = function () {
    for (var e = 0; e < slides.length; e++) controls[e].classList.remove("able")
  };

function init() {
  var e = new ymaps.Map("map", {
    center: [59.93929, 30.32944],
    zoom: 16,
    behaviors: ["drag"]
  });
  myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {}, {
    iconLayout: "default#image",
    iconImageHref: "img/pin.svg",
    iconImageSize: [80, 140],
    iconImageOffset: [-40, -140]
  }), e.geoObjects.add(myPlacemark)
}
controls.length && controls.forEach(function (e, a) {
  e.addEventListener("click", function () {
    removeWrapperClasses(), hideAllSlides(), removeAble(), slides[a].classList.add("slide-current"), wrapper.classList.add(wrapperClasses[a]), controls[a].classList.add("able")
  })
}), ymaps.ready(init);
