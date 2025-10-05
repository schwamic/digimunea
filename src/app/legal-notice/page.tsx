import Header from '@/app/_components/Header';

export default function LegalNotice() {
    return (
        <>
            <Header title={content.title} />
            <main>Impressum works!</main>
        </>
    );
}

const content = {
    title: 'impressum',
};
