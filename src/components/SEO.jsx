import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type, schema }) => {
    const [dynamicSEO, setDynamicSEO] = React.useState(null);

    React.useEffect(() => {
        const fetchSEO = async () => {
            try {
                const res = await fetch('/api/seo');
                const data = await res.json();
                const currentPath = window.location.pathname;
                const pageSEO = data.find(item => item.path === currentPath);
                if (pageSEO) {
                    setDynamicSEO(pageSEO);
                }
            } catch (err) {
                console.error("SEO fetch error:", err);
            }
        };
        fetchSEO();
    }, []);

    const finalTitle = dynamicSEO?.title || title || 'Hostizzy';
    const finalDescription = dynamicSEO?.description || description || 'Empowering Property Owners, Enriching Guest Experiences.';

    // Default Schema: Organization
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Hostizzy",
        "url": "https://hostizzy.com",
        "logo": "https://hostizzy.com/images/logo.jpg",
        "sameAs": [
            "https://www.instagram.com/hostizzy",
            "https://www.linkedin.com/company/hostizzy"
        ]
    };

    const jsonLd = schema ? {
        "@context": "https://schema.org",
        ...schema
    } : defaultSchema;

    return (
        <Helmet>
            <title>{finalTitle} | Hostizzy</title>
            <meta name='description' content={finalDescription} />
            {dynamicSEO?.keywords && <meta name="keywords" content={dynamicSEO.keywords} />}

            <meta property="og:type" content={type || 'website'} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />

            <meta name="twitter:creator" content={name || 'Hostizzy'} />
            <meta name="twitter:card" content={type === 'article' ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />

            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    )
}

export default SEO;
