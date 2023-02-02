import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Footer, NavBar } from "../../components/molecules";

interface ILayoutContext {
  isMobileMenuVisible: boolean;
  setIsMobileMenuVisible: Dispatch<SetStateAction<boolean>>;
}

const LayoutContext = React.createContext<Partial<ILayoutContext>>({});

export function useLayout() {
  return useContext(LayoutContext);
}
export function LayoutProvider({ children }: any) {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        isMobileMenuVisible: isMobileMenuVisible,
        setIsMobileMenuVisible: setIsMobileMenuVisible,
      }}
    >
      <NavBar />
      {/* <div>{children}</div> */}
      <div className="main-content-wrapper">{children}</div>
      <Footer />
    </LayoutContext.Provider>
  );
}
