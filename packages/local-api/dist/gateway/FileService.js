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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var promises_1 = require("fs/promises");
var uuid_1 = require("uuid");
var crypto_1 = require("crypto");
var directory_tree_1 = __importDefault(require("directory-tree"));
var DIR_NAME_TEMPLATE = 'Folder';
var FileService = /** @class */ (function () {
    function FileService(rootPath) {
        var _this = this;
        this.rootPath = rootPath;
        this._openFiles = new Map();
        this._scanOptions = {
            extensions: /\.jsnb$/,
            attributes: ['type', 'mtime'],
        };
        this.idCallback = function (item, path) {
            item.id = (0, crypto_1.createHash)('sha1').update(path).digest('base64');
            item.active = _this._openFiles.has(item.id);
        };
    }
    FileService.prototype.scan = function () {
        return (0, directory_tree_1.default)(this.rootPath, this._scanOptions, this.idCallback, this.idCallback);
    };
    FileService.prototype.openFile = function (fileId, socketId) {
        if (this._openFiles.has(fileId)) {
            return false;
        }
        this._openFiles.set(fileId, socketId);
        return true;
    };
    FileService.prototype.closeFile = function (fileId) {
        if (!this._openFiles.has(fileId)) {
            return;
        }
        this._openFiles.delete(fileId);
    };
    FileService.prototype.closedSocket = function (fileId, socketId) {
        if (socketId) {
            this._openFiles.set(fileId, socketId);
            return;
        }
        this._openFiles.delete(fileId);
    };
    FileService.prototype.createFolder = function (dirpath) {
        return __awaiter(this, void 0, void 0, function () {
            var dirname, fullPath, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dirname = DIR_NAME_TEMPLATE + "-" + (0, uuid_1.v4)().substring(0, 8);
                        fullPath = path_1.default.join(this.rootPath, dirpath, dirname);
                        return [4 /*yield*/, (0, promises_1.mkdir)(fullPath)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        throw "Couldn't create folder";
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.renameFile = function (oldPath, newPath) {
        return __awaiter(this, void 0, void 0, function () {
            var newHash, oldHash, socketId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (fs_1.default.existsSync(newPath)) {
                            throw 'File already exists';
                        }
                        return [4 /*yield*/, (0, promises_1.rename)(oldPath, newPath)];
                    case 1:
                        _a.sent();
                        newHash = (0, crypto_1.createHash)('sha1').update(newPath).digest('base64');
                        oldHash = (0, crypto_1.createHash)('sha1').update(oldPath).digest('base64');
                        socketId = this._openFiles.get(oldHash);
                        this._openFiles.delete(oldHash);
                        if (socketId) {
                            this.openFile(newHash, socketId);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FileService.prototype.deleteFiles = function (treeFiles) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, treeFiles_1, tree, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        _i = 0, treeFiles_1 = treeFiles;
                        _a.label = 1;
                    case 1:
                        if (!(_i < treeFiles_1.length)) return [3 /*break*/, 4];
                        tree = treeFiles_1[_i];
                        return [4 /*yield*/, (0, promises_1.rm)(tree.path, { recursive: true, force: true })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        throw "Couldn't delete all files";
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return FileService;
}());
exports.default = FileService;
