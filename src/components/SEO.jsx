import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type, schema }) => {

    // Default Schema: Organization
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Hostizzy",
        "url": "https://hostizzy.com", // Keeping domain generic until deployment info known
        "logo": "https://hostizzy.com/images/logo.jpg",
        "sameAs": [
            "https://www.instagram.com/hostizzy",
            "https://www.linkedin.com/company/hostizzy"
        ]
    };

    // If specific schema passed (e.g. VacationRental), use it, otherwise use default
    const jsonLd = schema ? {
        "@context": "https://schema.org",
        ...schema
    } : defaultSchema;

    return (
        <Helmet>
            { /* Standard metadata tags */}
            <title>{title} | Hostizzy</title>
            <meta name='description' content={description} />

            { /* End standard metadata tags */}

            { /* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            { /* End Facebook tags */}

            { /* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            { /* End Twitter tags */}

            { /* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    )
}

SEO.defaultProps = {
    title: 'Hostizzy',
    description: 'Empowering Property Owners, Enriching Guest Experiences. Premium Vacation Rental Management.',
    name: 'Hostizzy',
    type: 'website'
}

export default SEO;
