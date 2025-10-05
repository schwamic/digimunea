import Header from '@/app/_components/Header';
import Text from '@/app/_components/Text';

export default function PrivacyPolicy() {
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
                                <Text className="mb-4 text-md" content={fragments} key={jdx} />
                            ))}
                    </section>
                ))}
            </main>
        </>
    );
}

const content = {
    title: 'datenschutzerklärung',
    items: [
        {
            title: 'Benennung der verantwortlichen Stelle',
            description: [
                [{ text: 'Die verantwortliche Stelle für die Datenverarbeitung auf dieser Webseite ist: Michael Schwarz.' }],
                [
                    {
                        text: 'Die verantwortliche Stelle entscheidet allein oder gemeinsam mit Anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).',
                    },
                ],
            ],
        },
        {
            title: 'Widerruf Ihrer Einwilligung zur Datenverarbeitung',
            description: [
                [
                    {
                        text: `Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der Datenverarbeitung möglich. 
            Ein Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf genügt 
            eine formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung 
            bleibt vom Widerruf unberührt.`,
                    },
                ],
            ],
        },
        {
            title: 'Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde',
            description: [
                [
                    {
                        text: `Als Betroffene:r steht Ihnen im Falle eines datenschutzrechtlichen Verstoßes ein Beschwerderecht bei
                    der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde bezüglich datenschutzrechtlicher
                    Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem sich der Sitz unseres
                    Unternehmens befindet. Der folgende Link stellt eine Liste der Datenschutzbeauftragten sowie deren
                    Kontaktdaten bereit: `,
                    },
                    { text: 'bfdi.bund.de', link: 'https://bfdi.bund.de' },
                    { text: '.' },
                ],
            ],
        },
        {
            title: 'Recht auf Datenübertragbarkeit',
            description: [
                [
                    {
                        text: `Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
                    Vertrags automatisiert verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die Bereitstellung
                    erfolgt in einem maschinenlesbaren Format. Sofern Sie die direkte Übertragung der Daten an einen
                    anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.`,
                    },
                ],
            ],
        },
        {
            title: 'Recht auf Auskunft, Berichtigung, Sperrung, Löschung',
            description: [
                [
                    {
                        text: `Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen das Recht auf unentgeltliche
                    Auskunft über Ihre gespeicherten personenbezogenen Daten, Herkunft der Daten, deren Empfänger und
                    den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser
                    Daten. Diesbezüglich und auch zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich
                    jederzeit über die im Impressum aufgeführten Kontaktmöglichkeiten an uns wenden.`,
                    },
                ],
            ],
        },

        {
            title: 'Server-Log-Dateien',
            description: [
                [
                    {
                        text: 'In Server-Log-Dateien erhebt und speichert der Provider der Webseite automatisch Informationen, die Ihr Browser automatisch an uns übermittelt. Dies sind:',
                    },
                ],
                [
                    {
                        list: [
                            'Besuchte Seite auf unserer Domain',
                            'Datum und Uhrzeit der Serveranfrage',
                            'Browsertyp und Browserversion',
                            'Verwendetes Betriebssystem',
                            'Referrer URL',
                            'Hostname des zugreifenden Rechners',
                            'IP-Adresse',
                        ],
                    },
                ],
                [
                    {
                        text: `Es findet keine Zusammenführung dieser Daten mit anderen Datenquellen statt. Grundlage der
                    Datenverarbeitung bildet Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung
                    eines Vertrags oder vorvertraglicher Maßnahmen gestattet.`,
                    },
                ],
            ],
        },
        {
            title: 'SSL- bzw. TLS-Verschlüsselung',
            description: [
                [
                    {
                        text: `Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, die Sie an uns als
                    Seitenbetreiber senden, nutzt unsere Webseite eine SSL-bzw. TLS-Verschlüsselung. Damit sind Daten,
                    die Sie über diese Webseite übermitteln, für Dritte nicht mitlesbar. Sie erkennen eine
                    verschlüsselte Verbindung an der „https://“ Adresszeile Ihres Browsers und am Schloss-Symbol in der
                    Browserzeile.`,
                    },
                ],
            ],
        },
        {
            title: 'Quelle',
            description: [[{ text: 'e-recht24.de', link: 'https://e-recht24.de' }]],
        },
    ],
};
