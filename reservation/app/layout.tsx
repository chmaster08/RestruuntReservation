import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter"


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <AppRouterCacheProvider>
            {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
