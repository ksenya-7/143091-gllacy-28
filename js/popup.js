var popupLink = document.querySelector(".popup-link");
var popupCallback = document.querySelector(".callback");
var popupClose = popupCallback.querySelector(".popup-close");
var popupForm = popupCallback.querySelector(".callback-form");
var userName = popupCallback.querySelector(".name-user");
var loginLogin = popupCallback.querySelector(".login-user");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

popupLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupCallback.classList.add("callback-show");
  userName.focus();
  if (storage) {
    loginLogin.value = storage;
    userName.focus();
  } else {
    loginLogin.focus();
  }
});

popupClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupCallback.classList.remove("callback-show");
  popupCallback.classList.remove("callback-error");
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
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popupCallback.classList.contains("callback-show")) {
      evt.preventDefault();
      popupCallback.classList.remove("callback-show");
      popupCallback.classList.remove("callback-error");
    }
  }
});
