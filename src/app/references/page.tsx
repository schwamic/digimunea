'use client';

import { useTextAnimation } from '@/app/_hooks/useTextAnimation';
import Header from '@/app/_components/Header';
import Text from '@/app/_components/Text';

export default function References() {
    const title = useTextAnimation(content.header.frames);

    return (
        <>
            <Header title={title} />
            <main>
                <section className="mt-16">
                    {/* @ts-expect-error literal object types */}
                    <Text className="mb-6 text-lg" content={content.intro} />
                    <ul className="list-none -ml-3">
                        {content.caption.map((item, idx) => (
                            <li key={idx} className="flex items-center">
                                <div className={`scale-25 ${item.symbol} ${item.style}`} />
                                <p className="font-sans text-md">{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="mt-12">
                    <ul className="list-none">
                        {content.projects.map((project, idx) => (
                            <li key={idx} className="text-lg mb-6">
                                <div className="flex -ml-1.5 -mb-2">
                                    {project.symbols.map((symbol, sidx) => (
                                        <div key={sidx} className={`scale-25 -mx-2 ${symbol}`} />
                                    ))}
                                </div>
                                {/* @ts-expect-error literal object types */}
                                <Text content={project.company} />
                                {/* @ts-expect-error literal object types */}
                                <Text content={project.description} />
                            </li>
                        ))}
                        <li>[...]</li>
                    </ul>
                </section>
            </main>
        </>
    );
}

const content = {
    header: {
        frames: [
            'referenzen',
            'r3ferenzen',
            'ref3renzen',
            'referenz3n',
            'r3fer3nzen',
            'r3ferenz3n',
            'refer3nz3n',
            'referen7en',
        ],
    },
    intro: [
        {
            text: 'Informationen zu meinem Lebenslauf sind auf ',
        },
        {
            text: 'LinkedIn',
            link: 'https://www.linkedin.com/in/schwamic',
        },
        {
            text: ' zu finden. Hier eine kleine Auswahl an Projekten:',
        },
    ],
    caption: [
        { symbol: 'circle', description: 'Wissenschaftliche Mitarbeit', style: '-ml-0.5 -mr-0.5' },
        { symbol: 'square', description: 'Datenverarbeitung', style: '' },
        { symbol: 'triangle', description: 'Softwareentwicklung', style: '-ml-1 -mr-1' },
    ],
    projects: [
        {
            symbols: ['circle', 'square', 'triangle'],
            company: [{ text: '2025 | ' }, { text: 'neuland21 e.V.', link: 'https://neuland21.de' }],
            description: [
                { text: 'REINVENT', link: 'https://neuland21.de/projekte/reinvent' },
                { text: ' – Inventur und Recherche zu Open-Source Förder- und Modellprojekten' },
            ],
        },
        {
            symbols: ['circle'],
            company: [{ text: '2025 | ' }, { text: 'TH Augsburg', link: 'https://tha.de' }],
            description: [
                { text: 'STANDORT', link: 'https://www.springerprofessional.de/standort/5054282' },
                { text: '-Submission zu KI-Methoden in der Stadtentwicklung' },
            ],
        },
        {
            symbols: ['triangle'],
            company: [{ text: '2024 | ' }, { text: 'Nebenprojekt(e)', link: 'https://github.com/schwamic' }],
            description: [
                { text: 'Vortrag bei ' },
                { text: 'Web&Wine', link: 'https://webandwine.org' },
                { text: ': „' },
                { text: 'CleonGPT', link: 'https://github.com/schwamic/cleon-gpt' },
                { text: ' – How to build a ChatGPT clone (~ReAct Agent)“' },
            ],
        },
        {
            symbols: ['circle', 'square', 'triangle'],
            company: [
                { text: '2024 | ' },
                { text: 'Stadt Laichingen', link: 'https://www.laichingen.de' },
                { text: ', ' },
                { text: 'credium GmbH', link: 'https://credium.de' },
                { text: ', ' },
                { text: 'THA', link: 'https://tha.de' },
            ],
            description: [
                { text: 'Masterarbeit zu ' },
                {
                    text: '„KI-gestütztes Baugenehmigungsverfahren“',
                    link: 'https://github.com/schwamic/master-thesis-documents',
                },
            ],
        },
        {
            symbols: ['circle', 'square', 'triangle'],
            company: [
                { text: '2023 | ' },
                { text: 'Hans Sauer Stiftung', link: 'https://www.hanssauerstiftung.de' },
                { text: ', ' },
                { text: 'THA', link: 'https://tha.de' },
            ],
            description: [
                { text: 'Studie zu ' },
                {
                    text: '„KI-gestützte Workshop-Prozesse“',
                    link: 'https://github.com/schwamic/hss-prompt-engineering',
                },
            ],
        },
        {
            symbols: ['triangle'],
            company: [{ text: '2022 | ' }, { text: 'XITASO GmbH', link: 'https://xitaso.com' }],
            description: [
                { text: 'Technische Mitarbeit an der ' },
                {
                    text: 'Asset Performance Management (APM)',
                    link: 'https://www.reinhausen.com/fileadmin/downloadcenter/products/asset_management/tessa_r_apm/flyer/tessa_apm_en.pdf',
                },
                { text: ' Software' },
            ],
        },
        {
            symbols: ['square', 'triangle'],
            company: [
                { text: '2020-2021 | ' },
                { text: 'tresmo GmbH', link: 'https://www.linkedin.com/company/tresmonauten' },
            ],
            description: [
                { text: 'Konzeption und technische Umsetzung der IoT-Projekte ' },
                {
                    text: 'Witty-Analytic Connect',
                    link: 'https://www.witty.eu/gesamtloesungen/schwimmbad/technische-anlagen-wasseraufbereitung/witty-analytic-connect',
                },
                { text: ' und ' },
                {
                    text: 'HSW Connect App',
                    link: 'https://www.henkesasswolf.de/veterinaerprodukte/produkte/mobile-app/hsw-connect-app',
                },
            ],
        },
    ],
};
