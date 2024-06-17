import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
