var popupLink = document.querySelector(".popup-link");
var popupCallback = document.querySelector(".callback");
var popupClose = popupCallback.querySelector("[type=button]");
var popupForm = popupCallback.querySelector("form");
var popupSubmit = popupCallback.querySelector("[type=submit]");
var userName = popupCallback.querySelector("[name=name-user]");
var loginLogin = popupCallback.querySelector("[name=login]");
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".modal-overlay");

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
  "use strict";
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

popupForm.addEventListener("submit", function (evt) { //popupForm.onsubmit = function(evt) - это то же самое?
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
