'use client'

import Link from "next/link";
import Image from "next/image";
import {useTextAnimation} from "@/app/_hooks/useTextAnimation";
import Header from "@/app/_components/Header";
import ExternalLink from "@/app/_components/ExternalLink";
import ServiceCard from "@/app/_components/ServiceCard";
import PixelBox from "@/app/_assets/PixelBox";

export default function Home() {
  const title = useTextAnimation(content.header.frames)
  
  return (
    <>
      <Header title={title} subtitle={content.header.subtitle} size="large" />
      <main>
        <section className="mt-16">
          {content.intro.map((items, idx) => (
            <p key={idx} className="mb-6 text-lg">
              {items.map((item, idx) => item.link ? (
                <ExternalLink key={idx} link={item.link} text={item.text}/>
              ) : (
                <span key={idx} className={item.color ?? ""}>{item.text}</span>
              ))} 
            </p>
          ))}
        </section>
        <section className="mt-12 mb-24 -mx-24">
          <div className="columns-2 gap-4 space-y-4">
              {content.services.map((service, idx) => (
                <ServiceCard key={idx} {...service} />
              ))}
              <div className="box-border inline-flex items-center w-full p-6 rounded-3xl bg-black">
                <PixelBox width={65} height={65} className="ml-2 mr-6"/>
                <p className="text-lg">
                  <span>Hier eine Auswahl an </span>
                  <Link href="/references" className="underline">Referenzprojekten</Link>.
                </p>
              </div>
          </div>
        </section>
      </main>
    </>
  );
}

const content = {
  header: {
    frames: [
          "digimunea",
          "dig1munea",
          "d1gimunea",
          "digimun3a",
          "d1g1munea",
          "dig1mun3a",
          "d1gimun3a"
        ],
    subtitle: [
      {text: "Michael Schwarz M.Sc."},
      {text: "(er/ihm)"},
    ],
  },
  intro: [
    [
      {text: "Ich bin Softwareentwickler und Researcher. Aktuell arbeite ich als Open Source Developer & Analyst bei "},
      {text: "neuland21 e.V.", link: "https://neuland21.de"},
      {text: " und nebenberuflich als Freelancer"},
      {text: " (regulärer Stundensatz 74€ Brutto)", color: "text-stone-400"},
      {text: "."}
    ],
    [
      {text: "Ich freue mich immer über Austausch und Vernetzung – z.B. via "},
      {text: "LinkedIn", link: "https://www.linkedin.com/in/schwamic"},
      {text: " oder direkt per "},
      {text: "E-Mail", link: "mailto:schwarz.michael@posteo.net"},
      {text: " . #gernperDu"}
    ],
    [
      {text: "Meine Leistungen im Überblick:"}
    ],
  ],
  services: [
    {
      title: "Wissenschaftliche Mitarbeit",
      description: "Praktische Handreichungen, politische  Paper und Fachartikel zu aktuellen Themen wie Civic Tech, Smart Cities & Regions, künstliche Intelligenz und Open Source. ",
      style: "sans",
      symbol: "circle"
    },
    {
      title: "Datenverarbeitung",
      description: "Zum Einsatz kommt alles was das Python Ökosystem zu bieten hat; z.B. für Web-Scraping, Data-Cleaning, Visualisierung, Analyse, Machine Learning, Regression und Klassifizierung. Python bietet zudem die Möglichkeit den Quellcode zu erweitern und modular einzubetten.",
      style: "mono",
      symbol: "square"
    },
    {
      title: "Softwareentwicklung",
      description: [
        "Von Beratung und Workshops bis Prototyping und Mitarbeit",
        "TypeScript und Python zur Fullstack-/Cross-Plattform-Entwicklung und (Teil-) Automatisierung",
        "Containerbasiertes Hosting für kleine bis mittlere Projekte (z.B. Hetzner VPS)",
      ],
      style: "mono",
      symbol: "triangle"
    },
  ],
  references: [
    {text: "Hier eine Auswahl an "},
    {text: "Referenzen", link: "/references"},
    {text: " ."},
  ]
}
