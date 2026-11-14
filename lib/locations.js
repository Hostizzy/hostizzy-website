export const LOCATIONS = {
    'delhi-ncr': {
        name: 'Delhi NCR',
        slug: 'delhi-ncr',
        // Photo of a Hostizzy-managed home, served by the booking site's ImageKit.
        heroImage: { src: 'https://ik.imagekit.io/hostizzy/hostsuite/properties/0582cdbe-62e3-456b-b915-60230c514c3f/airbnb_2_1778223279684_NGdgIKcBsy.jpg', alt: 'Private pool and lawn at a Hostizzy-managed villa in Gurugram', town: 'Gurugram', href: 'https://book.hostizzy.com/stays/gurugram' },
        serviceModel: 'full',
        heroTitle: 'Vacation Rental Management in Delhi NCR',
        heroSubtitle: 'End-to-end property management for farmhouses, villas, and apartments across Delhi, Gurgaon, Noida, and Sohna.',
        description: 'Delhi NCR is India\'s largest urban vacation rental market. With growing demand for weekend farmhouse getaways, corporate retreats, and luxury villa stays, professional management is essential to maximize occupancy and revenue.',
        cities: ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Sohna', 'Manesar'],
        propertyTypes: ['Farmhouses', 'Villas', 'Apartments', 'Boutique Homes'],
        stats: { peakSeason: 'Oct-Mar' },
        marketHighlights: [
            'India\'s largest weekend getaway market with year-round demand',
            'Corporate retreat and event venue demand driving premium rates',
            'Strong Airbnb, MakeMyTrip, and direct booking channels',
            'Average nightly rates \u20B95,000-\u20B925,000 depending on property type'
        ],
        keywords: ['property management Delhi NCR', 'Airbnb management Gurgaon', 'farmhouse management Delhi', 'vacation rental Noida', 'villa management Sohna']
    },
    'himachal-pradesh': {
        name: 'Himachal Pradesh',
        slug: 'himachal-pradesh',
        // Photo of a Hostizzy-managed home, served by the booking site's ImageKit.
        heroImage: { src: 'https://ik.imagekit.io/hostizzy/hostsuite/properties/80e785a3-8216-4708-96a7-81c5fa0b5b3f/194ba1ce-4965-425d-be8d-87520bc31b72_y07_j5Wp0.avif', alt: 'Hillside terrace at dusk at a Hostizzy-managed stay in Barog', town: 'Barog', href: 'https://book.hostizzy.com/stays/barog' },
        serviceModel: 'full',
        heroTitle: 'Vacation Rental Management in Himachal Pradesh',
        heroSubtitle: 'Professional management for mountain homes, cottages, and boutique stays across Shimla, Manali, Kasauli, and beyond.',
        description: 'Himachal Pradesh is one of India\'s most popular hill station destinations. With millions of tourists visiting annually, professionally managed vacation rentals consistently outperform self-managed properties in occupancy and revenue.',
        cities: ['Shimla', 'Manali', 'Kasauli', 'Dharamshala', 'Dalhousie', 'Bir Billing'],
        propertyTypes: ['Mountain Cottages', 'Villas', 'Boutique Homestays', 'Heritage Homes'],
        stats: { peakSeason: 'Mar-Jun & Oct-Jan' },
        marketHighlights: [
            'Year-round tourism with dual peak seasons (summer & winter)',
            'Strong demand for snow season stays in Shimla and Manali',
            'Growing digital nomad and workation segment in Kasauli & Bir',
            'Average nightly rates \u20B94,000-\u20B915,000 for managed properties'
        ],
        keywords: ['property management Himachal', 'Airbnb management Shimla', 'villa management Manali', 'homestay management Kasauli', 'vacation rental Himachal Pradesh']
    },
    'uttarakhand': {
        name: 'Uttarakhand',
        slug: 'uttarakhand',
        // Photo of a Hostizzy-managed home, served by the booking site's ImageKit.
        heroImage: { src: 'https://ik.imagekit.io/hostizzy/hostsuite/properties/430857b2-5ee8-466a-ab33-af36962ec71d/airbnb_1_1780471582669_5gGoP5c0K.jpg', alt: 'Balcony with a view of the hills at a Hostizzy-managed home in Mussoorie', town: 'Mussoorie', href: 'https://book.hostizzy.com/stays/mussoorie' },
        serviceModel: 'full',
        heroTitle: 'Vacation Rental Management in Uttarakhand',
        heroSubtitle: 'Expert management for mountain retreats, farmstays, and wellness properties across Mussoorie, Rishikesh, Mukteshwar, and Nainital.',
        description: 'Uttarakhand\'s diverse landscape \u2014 from spiritual Rishikesh to serene Mukteshwar \u2014 attracts millions of travelers seeking unique stays. Professional management ensures your property captures this demand with optimized pricing and exceptional guest experiences.',
        cities: ['Mussoorie', 'Rishikesh', 'Mukteshwar', 'Nainital', 'Dehradun', 'Haridwar', 'Almora', 'Lansdowne'],
        propertyTypes: ['Mountain Retreats', 'Farmstays', 'Wellness Properties', 'Riverside Homes'],
        stats: { peakSeason: 'Mar-Jun & Sep-Nov' },
        marketHighlights: [
            'Diverse tourism \u2014 spiritual, adventure, wellness, and leisure',
            'Rishikesh is India\'s yoga capital with strong international demand',
            'Mukteshwar & Nainital offer premium mountain retreat experiences',
            'Average nightly rates \u20B94,500-\u20B912,000 for managed properties'
        ],
        keywords: ['property management Uttarakhand', 'Airbnb management Rishikesh', 'villa management Mussoorie', 'homestay management Mukteshwar', 'vacation rental Nainital']
    },
    'rajasthan': {
        name: 'Rajasthan',
        slug: 'rajasthan',
        // Photo of a Hostizzy-managed home, served by the booking site's ImageKit.
        heroImage: { src: 'https://ik.imagekit.io/hostizzy/hostsuite/properties/c9ee1c86-62ab-41d1-a39d-abf829cf1434/airbnb_13_1780641267687_9QmrFdlPEv.jpg', alt: 'Waarah Ville, a Hostizzy-managed villa with a pool in Jawai, lit up at dusk', town: 'Jawai', href: 'https://book.hostizzy.com/stays/jawai' },
        // Co-hosting today; full management is in the pipeline.
        serviceModel: 'shared',
        fullManagementSoon: true,
        heroTitle: 'Vacation Rental Management in Rajasthan',
        heroSubtitle: 'Co-hosting for heritage havelis, desert camps and luxury villas across Jaipur, Udaipur, Jodhpur and beyond. Full management is coming soon.',
        description: 'Rajasthan is India\'s most iconic tourism state, attracting domestic and international travelers to its heritage properties, desert experiences, and palace stays. Professional management transforms these unique properties into high-performing vacation rentals.',
        cities: ['Jaipur', 'Udaipur', 'Jodhpur', 'Pushkar', 'Mount Abu', 'Ranthambore', 'Jawai'],
        propertyTypes: ['Heritage Havelis', 'Luxury Villas', 'Desert Camps', 'Palace Stays'],
        stats: { peakSeason: 'Oct-Mar' },
        marketHighlights: [
            'India\'s #1 international tourism destination with premium pricing',
            'Heritage and palace properties command \u20B910,000-\u20B950,000/night',
            'Wedding and event venue demand creates high-value bookings',
            'Strong presence on international OTAs (Booking.com, Expedia, Airbnb)'
        ],
        keywords: ['property management Rajasthan', 'Airbnb management Jaipur', 'villa management Udaipur', 'haveli management Jodhpur', 'vacation rental Rajasthan']
    }
};

export const getLocation = (slug) => LOCATIONS[slug] || null;
export const getAllLocationSlugs = () => Object.keys(LOCATIONS);
