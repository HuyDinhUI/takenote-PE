import { Header } from "@/components/ui/header";
import { Sidebar } from "@/components/ui/side-bar";
import type { ReactNode } from "react";


type Props = {
  children: ReactNode;
};

 const BoardsLayout = ({ children }: Props) => {

  return (
    <div className="wrapper">
        <Header/>
        <div className="flex justify-center">
            <Sidebar/>
            {children}
        </div>
    </div>
  )
}

export default BoardsLayout

