'use client';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    name,
    type,
    schema,
    image, // NEW: Allow custom OG image per page
    keywords // NEW: Allow custom keywords array
}) => {
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
    const finalImage = dynamicSEO?.image || image || 'https://hostizzy.com/og-default.jpg';
    const finalKeywords = dynamicSEO?.keywords || (keywords ? keywords.join(', ') : '');
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://hostizzy.com';

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
            {finalKeywords && <meta name="keywords" content={finalKeywords} />}

            {/* Comprehensive Crawler Tags for All Major LLMs */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow, max-image-preview:large" />
            <meta name="bingbot" content="index, follow" />

            {/* OpenAI GPTBot (ChatGPT) */}
            <meta name="gptbot" content="index, follow" />

            {/* Anthropic ClaudeBot */}
            <meta name="claudebot" content="index, follow" />

            {/* Perplexity */}
            <meta name="perplexitybot" content="index, follow" />

            {/* Google Gemini */}
            <meta name="google-extended" content="index, follow" />

            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type || 'website'} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={finalTitle} />
            <meta property="og:site_name" content="Hostizzy" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@hostizzy" />
            <meta name="twitter:creator" content={name || '@hostizzy'} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    )
}

export default SEO;
