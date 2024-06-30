import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useState,
} from "react";
import { CurrentFile, FileCommon, FileOrFolder, OpenedInEditor } from "./types";
import { getFileTypeFromExtension } from "./helper";
export interface FileFolderContext {
  currentFile?: CurrentFile | null;
  openInEditor?: Record<string, OpenedInEditor>;
  allFiles?: FileOrFolder[];
  onFileOpen: (id: string, isTemp: boolean) => void;
  onFileClose: (id: string) => void;
}
const defaultFiles: FileOrFolder[] = [
  {
    name: "ROOT",
    isBranch: true,
    id: "root",
    parent: null,
    readOnly: true,
    children: [],
  },
];
export const FileContext = createContext<FileFolderContext>({
  currentFile: null,
  openInEditor: {},
  allFiles: defaultFiles,
  onFileOpen: () => void 0,
  onFileClose: () => void 0,
});

export const FileContextProvider: React.FC<any> = ({ children }) => {
  const [currentFile, setCurrentFile] = useState<CurrentFile | null>(null);
  const [openInEditor, setOpen] = useState<Record<string, OpenedInEditor>>({});
  const [allFiles, setFiles] = useState<FileOrFolder[]>(defaultFiles);
  const addFileOrFolder = useCallback((fof: FileOrFolder) => {
    setFiles((prev) => [...prev, fof]);
  }, []);
  const onFileOpen = useCallback<FileFolderContext["onFileOpen"]>(
    (id, isTemp) => {
      let FoF =
        id && (allFiles.find((_) => _.id === id && !_.isBranch) as FileCommon);
      if (FoF)
        setOpen((prev) => {
          prev[id] = {
            filename: FoF.name,
            fileType: getFileTypeFromExtension(FoF.extension),
            id,
            isTemporarilyOpened: isTemp,
          };
          setCurrentFile(prev[id]);
          return { ...prev };
        });
    },
    [allFiles]
  );
  const onFileClose = useCallback<FileFolderContext["onFileClose"]>(
    (id) => {
      if (id)
        setOpen((prev) => {
          const _prev = { ...prev };
          delete _prev[id];
          return _prev;
        });
    },
    [allFiles]
  );
  return (
    <>
      <FileContext.Provider
        value={{
          allFiles,
          currentFile,
          openInEditor,
          onFileOpen,
          onFileClose,
        }}
      >
        {children}
      </FileContext.Provider>
    </>
  );
};
