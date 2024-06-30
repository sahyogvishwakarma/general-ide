export enum FileType {
  TEXT = "Text",
  NOTES = "Notes",
  MARKDOWN = "Markdown",
  LIST = "List",
}
export enum FileExtensions {
  TEXT = ".ed",
  NOTES = ".note",
  LIST = ".lt",
  MARKDOWN = ".readme",
}
export interface CurrentFile {
  id: string;
  filename: string;
  fileType: FileType;
  [key: string]: any;
}
export interface OpenedInEditor extends CurrentFile {
  isTemporarilyOpened: boolean;
}
export interface FileOrFolderCommon {
  id: string;
  name: string;
  isBranch: boolean;
  parent: string | null;
}
export interface FileCommon extends FileOrFolderCommon {
  isBranch: false;
  extension: FileExtensions;
}
export interface MarkDownTextFile extends FileCommon {
  extension: FileExtensions.MARKDOWN | FileExtensions.TEXT;
  content: string;
}
export interface ListFile extends FileCommon {
  extension: FileExtensions.LIST;
  content: string[];
  title: string;
}
export interface Folder extends FileOrFolderCommon {
  isBranch: true;
  readOnly?: boolean;
  children: string[];
}
export type FileOrFolder = FileCommon | Folder;
