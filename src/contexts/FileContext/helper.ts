import { INode, ITreeViewProps } from "react-accessible-treeview";
import { FileExtensions, FileOrFolder, FileType, Folder } from "./types";
import { IFlatMetadata } from "react-accessible-treeview/dist/TreeView/utils";

export const fileToTree = (
  allFiles: FileOrFolder[]
): ITreeViewProps["data"] => {
  const children: Record<string, string[]> = {};
  allFiles?.forEach((node) => {
    if (node.parent) {
      const parent = node.parent;
      if (Array.isArray(children[parent])) children[parent].push(node.id);
      else children[parent] = [node.id];
    }
  });
  return allFiles.map(
    ({ id, isBranch, name, parent,...otherProps }) =>
      ({
        id,
        isBranch,
        name,
        parent,
        children: children[id] || [],
        metadata: {
          id,
          isBranch,
          name,
          parent,
          children: children[id]?.join?.(";"),
          ...otherProps
        },
      } as INode)
  );
};

export const filterFolders = (allFiles: FileOrFolder[]) =>
  allFiles.filter((_) => _.isBranch) as unknown as Folder[];

export const getFileTypeFromExtension = (ext: FileExtensions) => {
  switch (ext) {
    case FileExtensions.TEXT:
      return FileType.TEXT;
    case FileExtensions.LIST:
      return FileType.LIST;
    case FileExtensions.MARKDOWN:
      return FileType.MARKDOWN;
    case FileExtensions.NOTES:
      return FileType.NOTES;
    default:
      throw new Error("Unknown file extension");
  }
};

export const getFileExtensionFromType = (ext: FileType) => {
  switch (ext) {
    case FileType.TEXT:
      return FileExtensions.TEXT;
    case FileType.LIST:
      return FileExtensions.LIST;
    case FileType.MARKDOWN:
      return FileExtensions.MARKDOWN;
    case FileType.NOTES:
      return FileExtensions.NOTES;
    default:
      throw new Error("Unknown file extension");
  }
};
