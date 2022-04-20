/// <reference types="node" />
import http from 'http';
import { Socket } from 'socket.io';
import { Cell, Chapter } from '../types';
import FileService from './FileService';
import NotebookService from './NotebokService';
export declare class Gateway {
    private readonly fileService;
    private readonly notebookService;
    private readonly ioServer;
    constructor(server: http.Server, fileService: FileService, notebookService: NotebookService);
    initListeners(): void;
    onDisconnect(socket: Socket): Promise<void>;
    deleteFiles(payload: {
        trees: {
            path: string;
        }[];
    }, ack: (error: {
        msg: string;
    } | undefined) => void): Promise<void>;
    renameFile(payload: {
        oldPath: string;
        newPath: string;
    }, ack: (error: {
        msg: string;
    } | undefined) => void): Promise<void>;
    saveNotebook(socket: Socket, payload: {
        path: string;
        data: {
            chapters: Chapter[];
            cells: Cell[];
        };
    }, ack: (error: {
        msg: string;
    } | undefined) => void, isNew: boolean): Promise<void>;
    createNotebook(payload: {
        path: string;
    }, ack: (error: {
        msg: string;
    } | undefined, filename?: string) => void): Promise<void>;
    onFetchCells(socket: Socket, payload: {
        filepath: string;
    }, ack: (error: {
        msg: string;
    } | undefined, data?: {}) => void): Promise<void>;
    onCreateFolder(payload: {
        path: string;
    }, ack: (error: {
        msg: string;
    } | undefined) => void): Promise<void>;
    private emitTree;
}
