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
const token = window.localStorage.getItem("file-upload-token");
const mainUser = JSON.parse(window.localStorage.getItem("file-upload-user"));
const elFormFile = document.querySelector(".js-form");
const elFileInput = document.querySelector(".js-file-input");
const elFileTemp = document.querySelector(".js-file-temp").content;
const elList = document.querySelector(".js-files-inner-list");
const handleGetData = () => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield request("/files", "GET", token);
    handleRenderData(files);
});
function handleRenderData(arr) {
    const fileDocFragment = document.createDocumentFragment();
    elList.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        let clone = elFileTemp.cloneNode(true);
        clone.querySelector(".js-image").src = (BECKEND_SERVER + "/getFile/" + arr[i].file);
        clone.querySelector(".js-desc").textContent = arr[i].fileName;
        clone.querySelector(".js-link").href = (BECKEND_SERVER + "/download/" + arr[i].file);
        fileDocFragment.append(clone);
    }
    elList.append(fileDocFragment);
}
const handleIncludeToken = () => {
    if (!token) {
        window.location.replace("/login");
    }
};
const handleSubFile = (evt) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    evt.preventDefault();
    const fileFormData = new FormData(evt.target);
    fileFormData.append("fileName", fileFormData.get("file-name"));
    fileFormData.append("file", (_a = elFileInput.files) === null || _a === void 0 ? void 0 : _a.item(0));
    fileFormData.append("userId", mainUser === null || mainUser === void 0 ? void 0 : mainUser.userId);
    if (fileFormData) {
        const req = yield fetch(BECKEND_SERVER + "/files", {
            method: "POST",
            headers: {
                "token": token
            },
            body: fileFormData
        });
        yield req.json();
        handleGetData();
    }
});
elFormFile.addEventListener("submit", handleSubFile);
handleIncludeToken();
handleGetData();
