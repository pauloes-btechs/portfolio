import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
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
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Pauloes Berhe — Technical Product Manager & Founder — pauloes.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pauloes Berhe — Technical Product Manager & Founder",
    description:
      "11+ years shipping platform products. Founder chapter backed by #startsmall and MIT DCI. New York, NY.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
