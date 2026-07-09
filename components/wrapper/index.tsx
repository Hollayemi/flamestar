import type { ReactNode } from "react";
import { Header } from "@/components/wrapper/Header";
import { Footer } from "@/components/wrapper/Footer";

type HomeWrapperProps = {
  children: ReactNode;
};

export function HomeWrapper({ children }: HomeWrapperProps) {
  return (
    <div className="flex bg-white min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export { Header } from "@/components/wrapper/Header";
export { Footer } from "@/components/wrapper/Footer";
