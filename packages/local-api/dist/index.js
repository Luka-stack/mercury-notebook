"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var http_1 = require("http");
var FileService_1 = __importDefault(require("./gateway/FileService"));
var NotebokService_1 = __importDefault(require("./gateway/NotebokService"));
var Gateway_1 = require("./gateway/Gateway");
var serve = function (port, dir, useProxy) {
    var app = (0, express_1.default)();
    if (useProxy) {
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent',
        }));
    }
    else {
        var packagePath = require.resolve('@mercury-notebook/local-client/build/index.html');
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    var server = (0, http_1.createServer)(app);
    var fileService = new FileService_1.default(dir);
    var notebookService = new NotebokService_1.default(dir);
    var gateway = new Gateway_1.Gateway(server, fileService, notebookService);
    return new Promise(function (resolve, reject) {
        server.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
