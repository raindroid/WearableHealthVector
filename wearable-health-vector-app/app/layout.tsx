import "./globals.css";
import { Nunito } from "next/font/google";
import { ReactNode } from "react";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Wearable Health Monitoring System",
  description: "Wearable Health Monitoring System by Vector Database",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactNode {
  return (
    <html
      suppressHydrationWarning={true}
    >
      <head />
      <body suppressHydrationWarning={true} className={nunito.className}>
        {children}
      </body>
    </html>
  );
}
