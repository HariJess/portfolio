import "../styles/globals.css";
import "../styles/code-block.css";
import "react-loading-skeleton/dist/skeleton.css";
import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import Layout from "../components/layout/Layout";
import { AppProvider } from "@/context/AppContext";
import ProgressBarClient from "@/components/ProgressBarClient";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hari Jess",
  description: "Home page portofolio",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={firaCode.className}>
        <AppProvider>
          <ProgressBarClient />
          <Layout>{children}</Layout>
        </AppProvider>
      </body>
    </html>
  );
}
