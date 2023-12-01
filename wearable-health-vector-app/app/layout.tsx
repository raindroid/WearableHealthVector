import "./globals.css";
import { Nunito } from "next/font/google";
import { ReactNode } from "react";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Text2SQL by GenAI",
  description: "Generated SQL with native language",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactNode {
  return (
    <html suppressHydrationWarning={true}>
      <head />
      <body suppressHydrationWarning={true} className={nunito.className}>
        {children}
      </body>
    </html>
  );
}
