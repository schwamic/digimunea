'use client'

import {useTextAnimation} from "@/app/_hooks/useTextAnimation";
import Header from "@/app/_components/Header";
import ServiceCard from "@/app/_components/ServiceCard";
import Text from "@/app/_components/Text";
import Card from "@/app/_components/Card";
import PixelBoxIcon from "@/app/_assets/PixelBoxIcon";

export default function Home() {
  const title = useTextAnimation(content.header.frames)
  
  return (
    <>
      <Header title={title} subtitle={content.header.subtitle} size="large" />
      <main>
        {/* Intro Section */}
        <section className="mt-16">
          {content.intro.map((fragments, idx) => (
            // @ts-ignore
            <Text key={idx} className="mb-6 text-lg" content={fragments} />
          ))}
        </section>
        {/* Services Section */}
        <section className="mt-12 mb-24 -mx-24">
          <div className="columns-2 gap-4 space-y-4">
              {content.services.map((service, idx) => (
                <ServiceCard key={idx} {...service} />
              ))}
              <Card className="box-border inline-flex items-center w-full">
                <PixelBoxIcon width={75} height={75} className="ml-2 mr-6"/>
                {/* @ts-ignore */}
                <Text className="font-sans-monolike text-lg-monolike" content={content.references} />
              </Card>
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
      description: "Praktische Handreichungen, politische  Paper und Fachartikel zu aktuellen Themen wie Civic Tech, Smart Cities & Regions, künstliche Intelligenz und Open Source – qualitativ und nutzer:innenzentriert. ",
      style: "sans" as const,
      symbol: "circle" as const 
    },
    {
      title: "Datenverarbeitung",
      description: "Zum Einsatz kommt alles was das Python Ökosystem zu bieten hat; z.B. für Web-Scraping, Data-Cleaning, Visualisierung, Analyse, Machine Learning, Regression und Klassifizierung. Python bietet zudem die Möglichkeit den Quellcode zu erweitern und modular einzubetten.",
      style: "mono" as const,
      symbol: "square" as const
    },
    {
      title: "Softwareentwicklung",
      description: [
        "Von Beratung und Workshops bis Prototyping und Mitarbeit",
        "TypeScript und Python zur Fullstack-/Cross-Plattform-Entwicklung und (Teil-) Automatisierung",
        "Containerbasiertes Hosting für kleine bis mittlere Projekte (z.B. Hetzner VPS)",
      ],
      style: "mono" as const,
      symbol: "triangle" as const
    },
  ],
  references: [
    {text: "Hier eine Auswahl an "},
    {text: "Referenzprojekten", route: "/references"},
    {text: "."},
  ]
}
