"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.Gateway = void 0;
var socket_io_1 = require("socket.io");
var Gateway = /** @class */ (function () {
    function Gateway(
    // port: number,
    server, fileService, notebookService) {
        this.fileService = fileService;
        this.notebookService = notebookService;
        this.ioServer = new socket_io_1.Server(server);
        this.initListeners();
    }
    Gateway.prototype.initListeners = function () {
        var _this = this;
        this.ioServer.on('connection', function (socket) {
            socket.emit('tree', __assign({}, _this.fileService.scan()));
            socket.on('disconnect', function () { return _this.onDisconnect(socket); });
            socket.on('fetchCells', function (payload, ack) {
                return _this.onFetchCells(socket, payload, ack);
            });
            socket.on('createFolder', function (payload, ack) {
                return _this.onCreateFolder(payload, ack);
            });
            socket.on('createNotebook', function (payload, ack) {
                return _this.createNotebook(payload, ack);
            });
            socket.on('saveNotebookAs', function (payload, ack) {
                return _this.saveNotebook(socket, payload, ack, true);
            });
            socket.on('saveNotebook', function (payload, ack) {
                return _this.saveNotebook(socket, payload, ack, false);
            });
            socket.on('renameFile', function (payload, ack) { return _this.renameFile(payload, ack); });
            socket.on('deleteFiles', function (payload, ack) {
                return _this.deleteFiles(payload, ack);
            });
        });
    };
    Gateway.prototype.onDisconnect = function (socket) {
        return __awaiter(this, void 0, void 0, function () {
            var clients, newClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ioServer.in(socket.data.file).fetchSockets()];
                    case 1:
                        clients = _a.sent();
                        if (clients.length) {
                            newClient = clients[0].id;
                        }
                        this.fileService.closedSocket(socket.data.file, newClient);
                        this.emitTree();
                        return [2 /*return*/];
                }
            });
        });
    };
    Gateway.prototype.deleteFiles = function (payload, ack) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fileService.deleteFiles(payload.trees)];
                    case 1:
                        _a.sent();
                        ack(undefined);
                        this.emitTree();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        ack({ msg: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Gateway.prototype.renameFile = function (payload, ack) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fileService.renameFile(payload.oldPath, payload.newPath)];
                    case 1:
                        _a.sent();
                        this.emitTree();
                        ack(undefined);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        ack({ msg: error_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Gateway.prototype.saveNotebook = function (socket, payload, ack, isNew) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.notebookService.saveNotebook(payload.path, payload.data, isNew)];
                    case 1:
                        id = _a.sent();
                        if (!isNew) {
                            socket.broadcast.to(id).emit('notebookChanged');
                        }
                        ack(undefined);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        ack({ msg: error_3 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Gateway.prototype.createNotebook = function (payload, ack) {
        return __awaiter(this, void 0, void 0, function () {
            var filename, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.notebookService.createNotebook(payload.path)];
                    case 1:
                        filename = _a.sent();
                        ack(undefined, filename);
                        this.emitTree();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        ack({ msg: error_4 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Gateway.prototype.onFetchCells = function (socket, payload, ack) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, json, open_1, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.notebookService.fetchNotebook(payload.filepath)];
                    case 1:
                        _a = _b.sent(), id = _a[0], json = _a[1];
                        socket.join(id);
                        socket.data.file = id;
                        open_1 = this.fileService.openFile(id, socket.id);
                        if (!open_1) {
                            socket.emit('sharedNotebook');
                        }
                        ack(undefined, json);
                        this.emitTree();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        ack({ msg: error_5 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Gateway.prototype.onCreateFolder = function (payload, ack) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fileService.createFolder(payload.path)];
                    case 1:
                        _a.sent();
                        this.emitTree();
                        ack(undefined);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        ack({ msg: error_6 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Gateway.prototype.emitTree = function () {
        this.ioServer.emit('tree', __assign({}, this.fileService.scan()));
    };
    return Gateway;
}());
exports.Gateway = Gateway;
