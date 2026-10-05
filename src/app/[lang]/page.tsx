import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { hasLocale } from "@/i18n/config";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import ContactFab from "@/components/ContactFab";
import FloatingShapes from "@/components/FloatingShapes";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);

  return (
    <>
      <FloatingShapes labels={c.guide} />
      <Nav lang={lang} nav={c.nav} />
      <main className="relative isolate">
        <Hero lang={lang} langLabel={c.nav.language} hero={c.hero} projectCount={c.projects.items.length} />
        <Intro intro={c.intro} />
        <About about={c.about} />
        <Skills skills={c.skills} />
        <Projects projects={c.projects} />
        <Services services={c.services} />
        <Education education={c.education} />
        <Contact contact={c.contact} />
      </main>
      <Footer name={`${c.hero.firstName} ${c.hero.lastName}`} footer={c.footer} />
      <ContactFab label={c.hero.more} email={c.contact.email} whatsapp={c.contact.whatsapp} linkedin={c.contact.linkedin} />
      <RevealObserver />
    </>
  );
}
