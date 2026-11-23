import { ReactNode } from "react";
import "./kambaz.css";
import Session from "./account/Session";
import KambazNavigation from "./Navigation";

import { AccountProvider } from "./account/AccountContext";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AccountProvider>
      <Session>
        <div id="wd-kambaz" className="font-sans">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">{children}</div>
        </div>
      </Session>
    </AccountProvider>
  );
}