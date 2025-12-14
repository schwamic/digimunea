'use client';

import { useTextAnimation } from '@/app/home/_hooks/useTextAnimation';
import Header from '@/app/home/_components/Header';
import ServiceCard from '@/app/home/_components/ServiceCard';
import Text from '@/app/home/_components/Text';
import Card from '@/app/home/_components/Card';
import PixelBoxIcon from '@/app/_assets/PixelBoxIcon';

export default function Main() {
    const title = useTextAnimation(content.header.frames);

    return (
        <>
            <Header title={title} subtitle={content.header.subtitle} size="large" />
            <main>
                <section className="mt-16">
                    {content.intro.map((fragments, idx) => (
                        // @ts-expect-error literal object types
                        <Text key={idx} className="mb-6 text-lg" content={fragments} />
                    ))}
                </section>
                <section className="mt-12 md:-mx-24 lg:-mx-32">
                    <div className="md:columns-2 gap-4 space-y-4">
                        {content.services.map((service, idx) => (
                            <ServiceCard key={idx} {...service} />
                        ))}
                        <Card className="box-border inline-flex items-center w-full">
                            <PixelBoxIcon className="ml-2 mr-6" width={45} height={45} />
                            {/* @ts-expect-error literal object types */}
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
        frames: ['digimunea', 'dig1munea', 'd1gimunea', 'digimun3a', 'd1g1munea', 'dig1mun3a', 'd1gimun3a'],
        subtitle: [{ text: 'Michael Schwarz M.Sc.' }, { text: '(er/ihm)' }],
    },
    intro: [
        [
            {
                text: 'Ich bin Softwareentwickler und Researcher. Aktuell arbeite ich als Open Source Developer & Analyst bei ',
            },
            { text: 'neuland21 e.V.', link: 'https://neuland21.de' },
            { text: ' und nebenberuflich als Freelancer.' },
        ],
        [
            { text: 'Ich freue mich immer über Austausch und Vernetzung – z.B. via ' },
            { text: 'LinkedIn', link: 'https://www.linkedin.com/in/schwamic' },
            { text: ' oder direkt per ' },
            { text: 'E-Mail', link: 'mailto:schwarz.michael@posteo.net' },
            { text: '. #gernperDu', styles: 'italic' },
        ],
        [{ text: 'Meine Leistungen im Überblick: ' }], //, { text: '(74€/h brutto)', styles: 'text-stone-400' }],
    ],
    services: [
        {
            title: 'Wissenschaftliche Mitarbeit',
            description: [
                {
                    text: 'Praktische Handreichungen, politische  Paper und Fachartikel zu aktuellen Themen wie Civic Tech, Smart Cities & Regions, künstliche Intelligenz und Open Source – qualitativ und nutzer:innenzentriert.',
                },
            ],
            style: 'sans' as const,
            symbol: 'circle' as const,
        },
        {
            title: 'Datenverarbeitung',
            description: [
                {
                    text: 'Zum Einsatz kommt alles was das Python Ökosystem zu bieten hat; z.B. für Web-Scraping, Data-Cleaning, Visualisierung, Analyse, Machine Learning, Regression und Klassifizierung. Python bietet zudem die Möglichkeit den Quellcode zu erweitern und modular einzubetten.',
                },
            ],
            style: 'mono' as const,
            symbol: 'square' as const,
        },
        {
            title: 'Softwareentwicklung',
            description: [
                {
                    list: [
                        'Von Beratung und Workshops bis Prototyping und Mitarbeit',
                        'TypeScript und Python zur Fullstack-/Cross-Plattform-Entwicklung und (Teil-) Automatisierung',
                        'Containerbasiertes Hosting für kleine bis mittlere Projekte (z.B. Hetzner VPS)',
                    ],
                },
            ],
            style: 'mono' as const,
            symbol: 'triangle' as const,
        },
    ],
    references: [
        { text: 'Hier eine Auswahl an ' },
        { text: 'Referenzprojekten', route: '/home/references' },
        { text: '.' },
    ],
};
