import { NavbarLanguage } from "@/components/navbar/navbar-language";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <NavbarLanguage />
      {children}
    </main>
  );
};

export default Layout;