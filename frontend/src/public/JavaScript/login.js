"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const elLoginForm = document.querySelector(".js-form");
const handleSubLogin = (evt) => __awaiter(void 0, void 0, void 0, function* () {
    evt.preventDefault();
    const formDataLogin = new FormData(evt.target);
    const userLogin = {
        email: formDataLogin.get("email"),
        password: formDataLogin.get("password")
    };
    const typeLogin = Object.keys(userLogin).every(key => userLogin[key] !== null);
    if (typeLogin) {
        let response = yield request("/auth/login", "POST", undefined, userLogin);
        if (response.accessToken) {
            window.localStorage.setItem("file-upload-token", response.accessToken);
            window.localStorage.setItem("file-upload-user", JSON.stringify(response.user));
            window.location.replace("/");
        }
    }
});
elLoginForm.addEventListener("submit", handleSubLogin);
