
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "@/components/libs/query-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Todofy",
  description: "A Note Application for the web.",
  icons: {
    icon: "/app/favicon-32x32.png",
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <main className="container mx-auto">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
