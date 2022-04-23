"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTree = void 0;
var findTree = function (tree, lookingFor) {
    if (!tree) {
        return null;
    }
    var BFS = [tree];
    var tmp;
    while (BFS.length) {
        tmp = BFS.shift();
        if (lookingFor === '' || tmp.id === lookingFor) {
            return tmp;
        }
        if (tmp.children) {
            BFS.push.apply(BFS, tmp.children);
        }
    }
    return tree;
};
exports.findTree = findTree;
