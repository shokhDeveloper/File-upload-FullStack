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
const BECKEND_SERVER = 'http://192.168.1.108:4000';
const BASE_METHODS = ["GET", "DELETE"];
const request = (path, method, token, body) => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield fetch(BECKEND_SERVER + path, !BASE_METHODS.includes(method) ? {
        method,
        headers: {
            "Content-type": "application/json",
            token: token || ""
        },
        body: JSON.stringify(body)
    } : {
        headers: { "Content-type": "application/json", token: token || "" }
    });
    const res = yield req.json();
    console.log(res);
    return res;
});
