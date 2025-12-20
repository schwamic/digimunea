import Header from '@src/app/home/_components/Header';
import Text from '@src/app/home/_components/Text';

export default function LegalNotice() {
    return (
        <>
            <Header title={content.title} />
            <main>
                {content.items.map((items, idx) => (
                    <section key={idx} className="mt-16">
                        <h2 className="mb-4 text-2xl">{items.title}</h2>
                        {items.description &&
                            items.description.map((fragments, jdx) => (
                                // @ts-expect-error literal object types
                                <Text className="text-md" content={fragments} key={jdx} />
                            ))}
                        {items.items &&
                            items.items.map((subitems, kdx) => (
                                <div key={kdx} className="mt-8">
                                    <h3 className="mb-4 text-xl">{subitems.title}</h3>
                                    {subitems.description &&
                                        subitems.description.map((fragments, ddx) => (
                                            // @ts-expect-error literal object types
                                            <Text className="text-md" content={fragments} key={ddx} />
                                        ))}
                                </div>
                            ))}
                    </section>
                ))}
            </main>
        </>
    );
}

const content = {
    title: 'impressum',
    contact: [],
    items: [
        {
            title: 'Angaben gemäß § 5 TMG',
            description: [
                [{ text: 'Michael Schwarz' }],
                [{ text: 'Schertlinstraße 10' }],
                [{ text: '86159 Augsburg' }],
            ],
            items: [
                {
                    title: 'Kontakt',
                    description: [[{ text: 'T: (+49) 179 422 53 70' }], [{ text: 'M: schwarz.michael@posteo.net' }]],
                },
                {
                    title: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
                    description: [
                        [{ text: 'Michael Schwarz' }],
                        [{ text: 'Schertlinstraße 10' }],
                        [{ text: '86159 Augsburg' }],
                    ],
                },
            ],
        },
        {
            title: 'EU-Streitschlichtung',
            description: [
                [
                    {
                        text: `Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: `,
                    },
                    {
                        text: `https://ec.europa.eu/consumers/odr`,
                        link: 'https://ec.europa.eu/consumers/odr',
                    },
                    {
                        text: `. Unsere E-Mail-Adresse finden Sie oben im Impressum.`,
                    },
                ],
            ],
        },
        {
            title: 'Verbraucher­streit­beilegung/Universal­schlichtungs­stelle',
            description: [
                [
                    {
                        text: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
                    },
                ],
            ],
            items: [
                {
                    title: 'Haftung für Inhalte',
                    description: [
                        [
                            {
                                text: `Als Diensteanbieter:innen sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen 
                                Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter:innen jedoch nicht verpflichtet, übermittelte 
                                oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit 
                                hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben 
                                hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung 
                                möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.`,
                            },
                        ],
                    ],
                },
                {
                    title: 'Haftung für Links',
                    description: [
                        [
                            {
                                text: `Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb 
                                können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets 
                                der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung 
                                auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. 
                                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung 
                                nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.`,
                            },
                        ],
                    ],
                },
                {
                    title: 'Urheberrecht',
                    description: [
                        [
                            {
                                text: `Die durch die Seitenbetreiber:innen erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des 
                                Urheberrechtes bedürfen der schriftlichen Zustimmung des:der jeweiligen Autor:in bzw. Ersteller:in. Downloads und Kopien 
                                dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht 
                                von dem:der Betreiber:in erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter 
                                als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen 
                                entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.`,
                            },
                        ],
                    ],
                },
            ],
        },
        {
            title: 'Quelle',
            description: [[{ text: 'e-recht24.de', link: 'https://e-recht24.de' }]],
        },
    ],
};
