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
const elFormRegister = document.querySelector(".js-form");
const handleSub = (evt) => __awaiter(void 0, void 0, void 0, function* () {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const user = {
        name: formData.get("name"),
        lastname: formData.get("lastname"),
        email: formData.get("email"),
        password: formData.get("password"),
        birthDate: formData.get("birth-date")
    };
    const type = Object.keys(user).every(key => user[key] !== null);
    if (type) {
        let response = yield request("/auth/register", "POST", undefined, user);
        if (response.accessToken) {
            window.localStorage.setItem("file-upload-token", response.accessToken);
            window.localStorage.setItem("file-upload-user", JSON.stringify(response.user));
            window.location.replace("/");
        }
    }
});
elFormRegister.addEventListener("submit", handleSub);
