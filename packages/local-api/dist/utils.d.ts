import { DirectoryTree } from 'directory-tree';
export declare const findTree: (tree: (DirectoryTree & {
    id?: string;
    active?: boolean;
}) | null, lookingFor: string) => (DirectoryTree & {
    id?: string;
    active?: boolean;
}) | null;
