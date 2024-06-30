import { FileContext } from "@/contexts/FileContext";
import { fileToTree } from "@/contexts/FileContext/helper";
import { FileExtensions } from "@/contexts/FileContext/types";
import { cn } from "@/lib/utils";
import React, { useCallback, useContext, useMemo } from "react";
import TreeView, {
  INode,
  ITreeViewOnExpandProps,
} from "react-accessible-treeview";
import { IFlatMetadata } from "react-accessible-treeview/dist/TreeView/utils";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import {
  VscFile,
  VscGist,
  VscListUnordered,
  VscMarkdown,
  VscNote,
} from "react-icons/vsc";

function DirectoryTreeView() {
  const { allFiles = [] } = useContext(FileContext);
  const data = useMemo(() => {
    return fileToTree(allFiles);
  }, [allFiles]);
  const onExpand = useCallback(({ ...props }: ITreeViewOnExpandProps) => {
    // need to complete the function
  }, []);
  return (
    <div>
      <div className="flex justify-end"></div>
      <div className="ide">
        <TreeView
          data={data}
          aria-label="directory tree"
          togglableSelect
          clickAction="EXCLUSIVE_SELECT"
          onExpand={onExpand}
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
            handleSelect,
            isDisabled,
          }) => (
            <div
              {...getNodeProps()}
              style={{ paddingLeft: 20 * (level - 1) }}
              className={cn(
                "flex gap-2 items-center",
                isDisabled
                  ? "cursor-default pointer-events-none"
                  : "cursor-pointer"
              )}
            >
              {isBranch ? (
                <FolderIcon isOpen={isExpanded} />
              ) : (
                <FileIcon {...element} />
              )}
              {element.name}
            </div>
          )}
        />
      </div>
    </div>
  );
}

const FolderIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) =>
  isOpen ? <FaRegFolderOpen color="e8a87c" /> : <FaRegFolder color="e8a87c" />;

const FileIcon: React.FC<INode<IFlatMetadata>> = ({ name, metadata }) => {
  const extension = metadata?.extension;
  switch (extension) {
    case FileExtensions.MARKDOWN:
      return <VscMarkdown />;
    case FileExtensions.LIST:
      return <VscListUnordered />;
    case FileExtensions.NOTES:
      return <VscNote />;
    case FileExtensions.TEXT:
      return <VscGist />;
    default:
      return <VscFile />;
  }
};
export default DirectoryTreeView;
