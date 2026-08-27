import ContactForm from "../../components/ContactForm";
import { site } from "../../lib/data";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="wrap">
      <section className="role-hero">
        <h1>Get in <span className="co">touch</span></h1>
        <p className="lede">
          Hiring managers, recruiters, researchers, and mission-driven builders —
          I read everything. You can also reach me directly at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or on{" "}
          <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>.
        </p>
      </section>
      <section className="section" style={{ paddingBottom: 60 }}>
        <ContactForm />
      </section>
    </div>
  );
}
