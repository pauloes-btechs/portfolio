import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Interactive from "../components/Interactive";
import { site } from "../lib/data";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Pauloes Berhe — Technical Product Manager & Founder",
    template: "%s · Pauloes Berhe",
  },
  description:
    "Technical product manager with 11+ years shipping platform products at enterprise scale; founder of mission-driven Bitcoin startups backed by Jack Dorsey's #startsmall and MIT's Digital Currency Initiative.",
  openGraph: {
    title: "Pauloes Berhe — Technical Product Manager & Founder",
    description:
      "11+ years shipping platform products. Founder chapter backed by #startsmall and MIT DCI. New York, NY.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Interactive />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
