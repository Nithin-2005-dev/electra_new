// src/app/layout.tsx
import BackgroundElectric from "../components/BackgroundElectric.jsx";
import "./globals.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
export const metadata = {
  title: "Electra",
  description: "Electra Society",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-textPrimary antialiased">
        <Header />
        <BackgroundElectric />
        <main className="pt-16">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
