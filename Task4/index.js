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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var inputUrl, inputResponse, _a, token, data, query, n, prefixSum, evenSum, oddSum, i, results, _i, query_1, _b, type, range, l, r, totalSum, evenTotal, oddTotal, alternatingSum, requestData, config, outputUrl, response, error_1;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    inputUrl = 'https://test-share.shub.edu.vn/api/intern-test/input';
                    return [4 /*yield*/, axios_1.default.get(inputUrl)];
                case 1:
                    inputResponse = _e.sent();
                    _a = inputResponse.data, token = _a.token, data = _a.data, query = _a.query;
                    n = data.length;
                    prefixSum = new Array(n + 1).fill(0);
                    evenSum = new Array(n + 1).fill(0);
                    oddSum = new Array(n + 1).fill(0);
                    for (i = 0; i < n; i++) {
                        prefixSum[i + 1] = prefixSum[i] + data[i];
                        evenSum[i + 1] = evenSum[i] + (i % 2 === 0 ? data[i] : 0);
                        oddSum[i + 1] = oddSum[i] + (i % 2 !== 0 ? data[i] : 0);
                    }
                    results = [];
                    for (_i = 0, query_1 = query; _i < query_1.length; _i++) {
                        _b = query_1[_i], type = _b.type, range = _b.range;
                        l = range[0], r = range[1];
                        if (type === '1') {
                            totalSum = prefixSum[r + 1] - prefixSum[l];
                            results.push(totalSum);
                        }
                        else if (type === '2') {
                            evenTotal = evenSum[r + 1] - evenSum[l];
                            oddTotal = oddSum[r + 1] - oddSum[l];
                            alternatingSum = evenTotal - oddTotal;
                            results.push(alternatingSum);
                        }
                    }
                    requestData = { results: results };
                    config = {
                        headers: {
                            Authorization: "Bearer ".concat(token),
                            'Content-Type': 'application/json',
                        }
                    };
                    outputUrl = 'https://test-share.shub.edu.vn/api/intern-test/output';
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.post(outputUrl, results, config)];
                case 3:
                    response = _e.sent();
                    console.log("Phản hồi từ server: ", response.data, response.status);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _e.sent();
                    console.error("Lỗi khi gửi yêu cầu: ", (_d = (_c = error_1.response) === null || _c === void 0 ? void 0 : _c.data) !== null && _d !== void 0 ? _d : error_1.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
