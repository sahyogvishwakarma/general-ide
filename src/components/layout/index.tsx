import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import Header from "./Header";
import Sidebar from "./Sidebar";
interface Props {}
const Layout: React.FC<Props> = () => {
  return (
    <>
      <div className="h-screen">
        <Header className="p-2" />
        <div></div>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={15} maxSize={50} defaultSize={15}>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={15}>Two</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};
export default Layout;
