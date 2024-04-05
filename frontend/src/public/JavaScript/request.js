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
const BECKEND_SERVER = "http://192.168.1.108:4000";
const BASE_METHODS = ["GET", "DELETE"];
const request = (path, method, token, body, fileType) => __awaiter(void 0, void 0, void 0, function* () {
    let headers = {};
    if (fileType) {
        headers = {
            token: token || "",
        };
    }
    else {
        headers = {
            "Content-type": "application/json",
            token: token || "",
        };
    }
    const options = {
        headers,
        method,
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    if (fileType) {
        options.headers = {
            token: token || "",
        };
        return fetch(BECKEND_SERVER + path, options).then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.blob();
        }).catch(error => console.error('Fetch error:', error));
    }
    else {
        return fetch(BECKEND_SERVER + path, options)
            .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
            .catch((error) => console.error('Fetch error:', error));
    }
});
