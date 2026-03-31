'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import SEO from '../../components/SEO';
import ScrollReveal from '../../components/ScrollReveal';
import {
    Home, Building2, Trees, House, Sparkles, ArrowRight, TrendingUp,
    BarChart3, Info, Lock, Check, Star, MapPin, IndianRupee, Zap,
    ChevronDown, MessageCircle, Search
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

// --- MARKET DATA (All Indian markets with serviceModel) ---
const MARKET_DATA = {
    // North India
    'Delhi': { base: 4500, occ: 75, grade: 'B+', seas: [80, 90, 80, 70, 60, 50, 50, 60, 70, 90, 100, 90], region: 'North India', serviceModel: 'full', marketContext: 'Business & leisure hub — steady year-round demand, 70–80% occupancy typical' },
    'Gurgaon': { base: 5000, occ: 72, grade: 'B+', seas: [75, 85, 75, 65, 55, 50, 50, 55, 65, 85, 95, 85], region: 'North India', serviceModel: 'full', marketContext: 'Corporate travel hub — strong weekday demand, 65–75% occupancy typical' },
    'Noida': { base: 4200, occ: 68, grade: 'B', seas: [70, 80, 70, 65, 55, 45, 45, 55, 65, 80, 90, 80], region: 'North India', serviceModel: 'full', marketContext: 'IT corridor demand — corporate stays drive occupancy, 60–72% typical' },
    'Sohna': { base: 5500, occ: 58, grade: 'B', seas: [60, 70, 60, 55, 45, 35, 35, 45, 55, 75, 85, 75], region: 'North India', serviceModel: 'full', marketContext: 'Weekend getaway from Delhi NCR — growing villa market, 50–65% occupancy' },
    'Lucknow': { base: 3800, occ: 60, grade: 'B', seas: [70, 80, 70, 55, 40, 35, 35, 45, 55, 80, 90, 85], region: 'North India', serviceModel: 'full', marketContext: 'Heritage tourism & business — seasonal peaks Oct-Mar, 55–65% occupancy' },
    'Varanasi': { base: 4000, occ: 65, grade: 'B+', seas: [80, 85, 75, 60, 45, 35, 35, 50, 60, 85, 95, 90], region: 'North India', serviceModel: 'full', marketContext: 'Pilgrimage & cultural tourism — strong winter demand, 58–70% occupancy' },
    'Agra': { base: 4500, occ: 70, grade: 'A-', seas: [85, 90, 80, 60, 40, 30, 30, 45, 60, 90, 100, 95], region: 'North India', serviceModel: 'full', marketContext: 'Taj tourism — international demand peaks Oct-Mar, 62–75% occupancy' },

    // Himalayan
    'Manali': { base: 6500, occ: 68, grade: 'A', seas: [40, 50, 60, 90, 100, 100, 70, 60, 50, 70, 60, 80], region: 'Himalayan', serviceModel: 'full', marketContext: 'High leisure demand — peak Apr-Jun & Dec, 55–75% occupancy typical' },
    'Shimla': { base: 6000, occ: 65, grade: 'A-', seas: [40, 45, 60, 85, 100, 90, 60, 50, 50, 70, 60, 85], region: 'Himalayan', serviceModel: 'full', marketContext: 'Heritage hill station — peak summer & Christmas, 55–70% occupancy' },
    'Kasauli': { base: 5800, occ: 58, grade: 'B+', seas: [35, 45, 60, 85, 95, 85, 55, 45, 50, 70, 55, 75], region: 'Himalayan', serviceModel: 'full', marketContext: 'Weekend escape from Delhi/Chandigarh — growing market, 50–65% occupancy' },
    'Mussoorie': { base: 5800, occ: 62, grade: 'B+', seas: [35, 45, 65, 90, 100, 90, 50, 40, 50, 70, 60, 80], region: 'Himalayan', serviceModel: 'full', marketContext: 'Queen of hills — strong summer demand, 55–68% occupancy typical' },
    'Rishikesh': { base: 5500, occ: 72, grade: 'A', seas: [60, 70, 80, 80, 60, 50, 40, 40, 70, 90, 80, 70], region: 'Himalayan', serviceModel: 'full', marketContext: 'Yoga & adventure tourism — year-round demand, 65–78% occupancy' },
    'Dharamshala': { base: 5200, occ: 60, grade: 'B', seas: [30, 40, 60, 80, 90, 80, 40, 30, 50, 70, 60, 50], region: 'Himalayan', serviceModel: 'full', marketContext: 'Spiritual & backpacker hub — peak Mar-Jun, 52–66% occupancy' },
    'Dehradun': { base: 4800, occ: 62, grade: 'B+', seas: [50, 55, 65, 80, 90, 85, 55, 50, 55, 75, 65, 70], region: 'Himalayan', serviceModel: 'full', marketContext: 'Gateway to Uttarakhand — steady demand, 55–68% occupancy' },
    'Mukteshwar': { base: 5500, occ: 55, grade: 'B', seas: [30, 40, 55, 80, 90, 85, 50, 40, 50, 65, 55, 65], region: 'Himalayan', serviceModel: 'full', marketContext: 'Offbeat Kumaon retreat — growing villa market, 48–62% occupancy' },
    'Nainital': { base: 5200, occ: 63, grade: 'B+', seas: [35, 45, 60, 85, 100, 95, 55, 45, 50, 70, 55, 75], region: 'Himalayan', serviceModel: 'full', marketContext: 'Popular hill station — heavy summer rush, 55–70% occupancy' },
    'Haridwar': { base: 4500, occ: 68, grade: 'B+', seas: [65, 75, 85, 80, 55, 45, 40, 45, 65, 85, 75, 70], region: 'Himalayan', serviceModel: 'full', marketContext: 'Pilgrimage hub — consistent religious tourism, 60–74% occupancy' },
    'Almora': { base: 4800, occ: 50, grade: 'B-', seas: [25, 35, 50, 75, 85, 80, 45, 35, 45, 60, 50, 55], region: 'Himalayan', serviceModel: 'full', marketContext: 'Quiet Kumaon escape — niche market growing, 42–58% occupancy' },
    'Lansdowne': { base: 4500, occ: 48, grade: 'B-', seas: [25, 35, 50, 70, 80, 75, 40, 30, 40, 55, 45, 50], region: 'Himalayan', serviceModel: 'full', marketContext: 'Army cantonment retreat — weekend getaway, 40–55% occupancy' },
    'Bir Billing': { base: 4800, occ: 52, grade: 'B', seas: [30, 40, 60, 80, 90, 75, 40, 35, 55, 75, 60, 50], region: 'Himalayan', serviceModel: 'full', marketContext: 'Paragliding capital — adventure tourism peak Mar-Jun, 45–60% occupancy' },
    'Dalhousie': { base: 5000, occ: 55, grade: 'B', seas: [30, 40, 55, 80, 95, 85, 50, 40, 50, 65, 55, 65], region: 'Himalayan', serviceModel: 'full', marketContext: 'Colonial hill station — strong summer peak, 48–62% occupancy' },

    // Rajasthan
    'Jaipur': { base: 5500, occ: 60, grade: 'B+', seas: [80, 90, 70, 50, 30, 20, 30, 40, 60, 80, 90, 90], region: 'Rajasthan', serviceModel: 'full', marketContext: 'Pink City tourism — international demand Oct-Mar, 52–68% occupancy' },
    'Udaipur': { base: 6500, occ: 62, grade: 'A-', seas: [80, 90, 70, 50, 30, 20, 30, 40, 60, 90, 100, 90], region: 'Rajasthan', serviceModel: 'full', marketContext: 'Lake city luxury — wedding & heritage tourism, 55–70% occupancy' },
    'Jodhpur': { base: 5200, occ: 58, grade: 'B+', seas: [80, 85, 65, 45, 25, 20, 25, 35, 55, 80, 90, 85], region: 'Rajasthan', serviceModel: 'full', marketContext: 'Blue city heritage — strong winter season, 50–65% occupancy' },
    'Mount Abu': { base: 4800, occ: 55, grade: 'B', seas: [70, 75, 60, 50, 40, 55, 50, 45, 50, 65, 75, 80], region: 'Rajasthan', serviceModel: 'full', marketContext: 'Rajasthan\'s only hill station — summer & winter peaks, 48–62% occupancy' },
    'Pushkar': { base: 4500, occ: 52, grade: 'B', seas: [75, 80, 60, 40, 25, 20, 25, 35, 50, 80, 100, 85], region: 'Rajasthan', serviceModel: 'full', marketContext: 'Spiritual & fair tourism — peak around Pushkar Mela, 45–60% occupancy' },
    'Ranthambore': { base: 6000, occ: 50, grade: 'B+', seas: [80, 85, 75, 60, 30, 10, 10, 20, 40, 80, 95, 90], region: 'Rajasthan', serviceModel: 'full', marketContext: 'Tiger safari tourism — Oct-Jun season, 42–58% occupancy' },

    // North East
    'Gangtok': { base: 5000, occ: 55, grade: 'B', seas: [40, 50, 70, 90, 100, 60, 50, 40, 60, 90, 80, 60], region: 'North East', serviceModel: 'full', marketContext: 'Sikkim gateway — peak Mar-May & Oct-Nov, 48–62% occupancy' },
    'Shillong': { base: 4500, occ: 52, grade: 'B', seas: [40, 50, 60, 80, 85, 55, 45, 40, 55, 80, 70, 55], region: 'North East', serviceModel: 'full', marketContext: 'Scotland of the East — growing tourism market, 45–60% occupancy' },
    'Tawang': { base: 4800, occ: 45, grade: 'B-', seas: [30, 40, 60, 80, 85, 50, 35, 30, 50, 75, 65, 45], region: 'North East', serviceModel: 'full', marketContext: 'Remote monastery town — niche adventure tourism, 38–52% occupancy' },
    'Darjeeling': { base: 5200, occ: 58, grade: 'B+', seas: [40, 50, 70, 90, 95, 55, 45, 40, 60, 85, 75, 55], region: 'North East', serviceModel: 'full', marketContext: 'Tea tourism & heritage — peak Mar-May & Oct-Nov, 50–65% occupancy' },

    // Coastal
    'Goa (North)': { base: 9000, occ: 75, grade: 'A+', seas: [95, 85, 60, 50, 40, 30, 30, 40, 50, 70, 90, 100], region: 'Coastal', serviceModel: 'shared', marketContext: 'India\'s top beach destination — peak Nov-Feb, 65–82% occupancy' },
    'Goa (South)': { base: 8500, occ: 70, grade: 'A', seas: [90, 80, 55, 45, 30, 20, 20, 30, 40, 60, 85, 95], region: 'Coastal', serviceModel: 'shared', marketContext: 'Premium quieter beaches — luxury traveller market, 60–78% occupancy' },
    'Lonavala': { base: 7500, occ: 65, grade: 'A', seas: [60, 50, 50, 60, 80, 100, 100, 90, 70, 60, 70, 90], region: 'Coastal', serviceModel: 'shared', marketContext: 'Mumbai weekend getaway — monsoon & winter peaks, 58–72% occupancy' },
    'Alibaug': { base: 8000, occ: 60, grade: 'A-', seas: [60, 50, 50, 60, 70, 50, 40, 40, 50, 70, 80, 100], region: 'Coastal', serviceModel: 'shared', marketContext: 'Luxury beach escape from Mumbai — premium villas, 52–68% occupancy' },
    'Mahabaleshwar': { base: 6000, occ: 55, grade: 'B+', seas: [50, 50, 60, 70, 90, 60, 50, 50, 40, 60, 70, 90], region: 'Coastal', serviceModel: 'shared', marketContext: 'Pune/Mumbai hill escape — strong summer demand, 48–62% occupancy' },
    'Varkala': { base: 5000, occ: 60, grade: 'B', seas: [80, 80, 60, 50, 40, 30, 30, 40, 50, 60, 70, 90], region: 'Coastal', serviceModel: 'shared', marketContext: 'Kerala cliff beach — international backpacker market, 52–66% occupancy' },
    'Pondicherry': { base: 6500, occ: 72, grade: 'A-', seas: [90, 80, 60, 50, 60, 50, 60, 70, 60, 70, 70, 100], region: 'Coastal', serviceModel: 'shared', marketContext: 'French Quarter charm — year-round appeal, 62–78% occupancy' },

    // Southern
    'Coorg': { base: 7000, occ: 68, grade: 'A', seas: [70, 70, 70, 80, 90, 70, 60, 60, 50, 70, 80, 100], region: 'Southern', serviceModel: 'shared', marketContext: 'Coffee estate tourism — Bangalore weekend market, 60–75% occupancy' },
    'Wayanad': { base: 6200, occ: 64, grade: 'B+', seas: [70, 70, 70, 80, 90, 60, 50, 50, 60, 70, 80, 90], region: 'Southern', serviceModel: 'shared', marketContext: 'Kerala highlands — eco-tourism growing fast, 56–70% occupancy' },
    'Ooty': { base: 5800, occ: 66, grade: 'B+', seas: [60, 60, 70, 90, 100, 70, 60, 50, 60, 70, 60, 80], region: 'Southern', serviceModel: 'shared', marketContext: 'Nilgiris queen — summer & holiday peaks, 58–72% occupancy' },
    'Munnar': { base: 6000, occ: 70, grade: 'A-', seas: [70, 70, 70, 80, 90, 60, 50, 50, 60, 70, 80, 100], region: 'Southern', serviceModel: 'shared', marketContext: 'Tea garden paradise — strong honeymoon market, 62–76% occupancy' },
};

const REGIONS = ['North India', 'Himalayan', 'Rajasthan', 'North East', 'Coastal', 'Southern'];

const PROPERTY_TYPES = [
    { key: 'villa', label: 'Villa', icon: Home, emoji: '' },
    { key: 'apartment', label: 'Apartment', icon: Building2, emoji: '' },
    { key: 'farmhouse', label: 'Farmhouse', icon: Trees, emoji: '' },
    { key: 'cottage', label: 'Cottage', icon: House, emoji: '' },
];

const FINISH_LEVELS = [
    { key: 'standard', label: 'Standard', stars: 0, boost: 'Base rate', pct: '' },
    { key: 'premium', label: 'Premium', stars: 1, boost: '+6% ADR', pct: '+6%' },
    { key: 'luxury', label: 'Luxury', stars: 2, boost: '+12% ADR', pct: '+12%' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// --- ANIMATED COUNTER ---
const AnimatedCounter = ({ value, prefix = '\u20B9', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!value) return;
        let start = 0;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else { setCount(Math.floor(start)); }
        }, 16);
        return () => clearInterval(timer);
    }, [value, duration]);
    return <span>{prefix}{count.toLocaleString('en-IN')}</span>;
};

// --- CONFIDENCE SCORE ---
const getConfidenceScore = (cityData, occupancy) => {
    let score = 0;
    const gradePoints = { 'A+': 4, 'A': 3.5, 'A-': 3, 'B+': 2.5, 'B': 2, 'B-': 1.5, 'C+': 1, 'C': 0.5 };
    score += gradePoints[cityData.grade] || 2;

    if (occupancy >= 75) score += 3;
    else if (occupancy >= 65) score += 2.5;
    else if (occupancy >= 55) score += 2;
    else score += 1;

    const avgSeason = cityData.seas.reduce((a, b) => a + b, 0) / 12;
    const variance = cityData.seas.reduce((sum, val) => sum + Math.pow(val - avgSeason, 2), 0) / 12;
    const stability = Math.max(0, 3 - (variance / 500));
    score += stability;

    return Math.min(10, Math.max(0, score)).toFixed(1);
};

export default function Calculator() {
    // --- STATE ---
    const [cityInput, setCityInput] = useState('Manali');
    const [selectedCity, setSelectedCity] = useState('Manali');
    const [activeRegion, setActiveRegion] = useState('Himalayan');
    const [propertyType, setPropertyType] = useState('villa');
    const [bedrooms, setBedrooms] = useState(3);
    const [finishes, setFinishes] = useState('luxury');

    // Occupancy slider
    const [occupancyOverride, setOccupancyOverride] = useState(68);
    const [userAdjustedOccupancy, setUserAdjustedOccupancy] = useState(false);

    // Monthly/Annual toggle
    const [viewMode, setViewMode] = useState('monthly'); // 'monthly' | 'annual'

    // Advanced options
    const [advancedOpen, setAdvancedOpen] = useState(false);
    const [monthlyCosts, setMonthlyCosts] = useState('');

    // Results state
    const [showResults, setShowResults] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    // Lead capture state
    const [emailUnlocked, setEmailUnlocked] = useState(false);
    const [leadEmail, setLeadEmail] = useState('');
    const [emailSubmitting, setEmailSubmitting] = useState(false);

    // AI integration state
    const [aiLoading, setAiLoading] = useState(false);
    const [aiData, setAiData] = useState(null);
    const [aiError, setAiError] = useState(false);

    // Derived: current city data and service model
    const currentCityData = MARKET_DATA[selectedCity] || null;
    const currentServiceModel = aiData?.serviceModel
        ? (aiData.serviceModel === 'full' ? 'full' : 'shared')
        : (currentCityData?.serviceModel || 'full');
    const currentMarketContext = aiData?.marketContext || currentCityData?.marketContext || null;

    // Update occupancy default when city changes
    useEffect(() => {
        if (!userAdjustedOccupancy) {
            const data = MARKET_DATA[selectedCity];
            setOccupancyOverride(data ? data.occ : 60);
        }
    }, [selectedCity, userAdjustedOccupancy]);

    // Handle city chip click
    const handleCityChipClick = (city) => {
        setCityInput(city);
        setSelectedCity(city);
        setUserAdjustedOccupancy(false);
    };

    // --- CALCULATION ENGINE ---
    const calculate = useCallback(() => {
        const cityData = MARKET_DATA[selectedCity] || {
            base: 5000, occ: 60, grade: 'B', seas: [60, 60, 60, 70, 80, 70, 60, 55, 60, 70, 70, 65],
            region: 'Unknown', serviceModel: 'full', marketContext: null,
        };
        const typeMult = propertyType === 'villa' ? 1.2 : (propertyType === 'farmhouse' ? 1.15 : 1.0);
        const bedMult = 1 + (bedrooms - 1) * 0.15;
        const finishMult = finishes === 'luxury' ? 1.12 : (finishes === 'premium' ? 1.06 : 1.0);

        const avgNightlyRate = Math.round(cityData.base * typeMult * bedMult * finishMult);
        const annualOccupancy = Math.min(occupancyOverride + (finishes === 'luxury' ? 3 : 0), 85);
        const daysBooked = 365 * (annualOccupancy / 100);

        const grossRev = avgNightlyRate * daysBooked;
        const hostizzyFee = grossRev * 0.20;
        const otaCommission = grossRev * 0.18;
        const opsCost = grossRev * 0.15;
        const netIncome = grossRev - hostizzyFee - otaCommission - opsCost;

        // Self-managed calculation
        const selfOccupancy = Math.max(annualOccupancy - 15, 30);
        const selfDaysBooked = 365 * (selfOccupancy / 100);
        const selfGross = avgNightlyRate * 0.85 * selfDaysBooked;
        const selfOtaFee = selfGross * 0.18;
        const selfNet = selfGross - selfOtaFee;

        const confidenceScore = getConfidenceScore(cityData, annualOccupancy);

        return {
            adr: avgNightlyRate,
            occupancy: annualOccupancy,
            daysBooked: Math.round(daysBooked),
            revpar: Math.round(grossRev / 365),
            grossRevenue: Math.round(grossRev),
            netIncome: Math.round(netIncome),
            confidenceScore,
            marketGrade: cityData.grade,
            seas: cityData.seas,
            breakdown: {
                net: Math.round(netIncome),
                fee: Math.round(hostizzyFee),
                ota: Math.round(otaCommission),
                ops: Math.round(opsCost),
            },
            self: {
                occupancy: selfOccupancy,
                grossRevenue: Math.round(selfGross),
                netIncome: Math.round(selfNet),
            },
            difference: Math.round(netIncome - selfNet),
            differencePercent: Math.round(((netIncome - selfNet) / selfNet) * 100),
        };
    }, [selectedCity, propertyType, bedrooms, finishes, occupancyOverride]);

    const [results, setResults] = useState(null);

    // Recalculate when user adjusts occupancy after results are shown
    useEffect(() => {
        if (showResults && userAdjustedOccupancy) {
            const calcResults = calculate();
            setResults(calcResults);
        }
    }, [occupancyOverride, showResults, userAdjustedOccupancy, calculate]);

    const handleCalculate = async () => {
        // Use cityInput as selectedCity if different
        const trimmed = cityInput.trim();
        if (trimmed && trimmed !== selectedCity) {
            setSelectedCity(trimmed);
        }
        const cityToUse = trimmed || selectedCity;

        setIsCalculating(true);
        setAiData(null);
        setAiError(false);

        // Simulate brief calculation delay for UX
        await new Promise(r => setTimeout(r, 800));

        // Recalculate with potentially new city
        const cityData = MARKET_DATA[cityToUse] || {
            base: 5000, occ: 60, grade: 'B', seas: [60, 60, 60, 70, 80, 70, 60, 55, 60, 70, 70, 65],
            region: 'Unknown', serviceModel: 'full', marketContext: null,
        };
        const typeMult = propertyType === 'villa' ? 1.2 : (propertyType === 'farmhouse' ? 1.15 : 1.0);
        const bedMult = 1 + (bedrooms - 1) * 0.15;
        const finishMult = finishes === 'luxury' ? 1.12 : (finishes === 'premium' ? 1.06 : 1.0);
        const avgNightlyRate = Math.round(cityData.base * typeMult * bedMult * finishMult);
        const occ = userAdjustedOccupancy ? occupancyOverride : cityData.occ;
        const annualOccupancy = Math.min(occ + (finishes === 'luxury' ? 3 : 0), 85);
        const daysBooked = 365 * (annualOccupancy / 100);
        const grossRev = avgNightlyRate * daysBooked;
        const hostizzyFee = grossRev * 0.20;
        const otaCommission = grossRev * 0.18;
        const opsCost = grossRev * 0.15;
        const netIncome = grossRev - hostizzyFee - otaCommission - opsCost;
        const selfOccupancy = Math.max(annualOccupancy - 15, 30);
        const selfDaysBooked = 365 * (selfOccupancy / 100);
        const selfGross = avgNightlyRate * 0.85 * selfDaysBooked;
        const selfOtaFee = selfGross * 0.18;
        const selfNet = selfGross - selfOtaFee;
        const confidenceScore = getConfidenceScore(cityData, annualOccupancy);

        const calcResults = {
            adr: avgNightlyRate,
            occupancy: annualOccupancy,
            daysBooked: Math.round(daysBooked),
            revpar: Math.round(grossRev / 365),
            grossRevenue: Math.round(grossRev),
            netIncome: Math.round(netIncome),
            confidenceScore,
            marketGrade: cityData.grade,
            seas: cityData.seas,
            breakdown: {
                net: Math.round(netIncome),
                fee: Math.round(hostizzyFee),
                ota: Math.round(otaCommission),
                ops: Math.round(opsCost),
            },
            self: {
                occupancy: selfOccupancy,
                grossRevenue: Math.round(selfGross),
                netIncome: Math.round(selfNet),
            },
            difference: Math.round(netIncome - selfNet),
            differencePercent: Math.round(((netIncome - selfNet) / selfNet) * 100),
        };

        setResults(calcResults);
        setShowResults(true);
        setIsCalculating(false);

        // Fire AI estimate in background
        fetchAIEstimate(cityToUse);
    };

    const fetchAIEstimate = async (city) => {
        setAiLoading(true);
        setAiError(false);
        try {
            const res = await fetch('/api/ai-estimate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    city: city || selectedCity,
                    propertyType,
                    bedrooms,
                    finishLevel: finishes,
                }),
            });
            const data = await res.json();
            if (data.fallback || data.error) {
                setAiError(true);
                setAiData(null);
            } else {
                setAiData(data);
            }
        } catch {
            setAiError(true);
            setAiData(null);
        } finally {
            setAiLoading(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!leadEmail) return;
        setEmailSubmitting(true);
        try {
            const res = await fetch('/api/calculator-leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: leadEmail,
                    city: selectedCity,
                    propertyType,
                    bedrooms,
                    finishes,
                    revenue: results?.grossRevenue,
                    netIncome: results?.netIncome,
                }),
            });
            if (res.ok) {
                setEmailUnlocked(true);
            }
        } catch {
            // Fallback: unlock anyway
            setEmailUnlocked(true);
        } finally {
            setEmailSubmitting(false);
        }
    };

    // --- DERIVED VALUES ---
    const parsedMonthlyCosts = parseInt(monthlyCosts.replace(/[^\d]/g, ''), 10) || 0;
    const annualCostDeduction = parsedMonthlyCosts * 12;

    const rawDisplayNet = aiData ? aiData.netIncome : results?.netIncome;
    const rawDisplayGross = aiData ? aiData.grossRevenue : results?.grossRevenue;
    const displayOcc = aiData ? aiData.occupancy : results?.occupancy;

    // Apply monthly costs deduction
    const adjustedNetAnnual = rawDisplayNet ? rawDisplayNet - annualCostDeduction : 0;
    const adjustedNetMonthly = Math.round(adjustedNetAnnual / 12);
    const displayNet = viewMode === 'monthly' ? adjustedNetMonthly : adjustedNetAnnual;
    const displayGross = viewMode === 'monthly' ? Math.round((rawDisplayGross || 0) / 12) : rawDisplayGross;

    // ADR range
    const baseAdr = aiData?.adr || results?.adr || 0;
    const adrLow = aiData?.adrRange ? aiData.adrRange[0] : Math.round(baseAdr * 0.85);
    const adrHigh = aiData?.adrRange ? aiData.adrRange[1] : Math.round(baseAdr * 1.15);

    const confidenceLabel = results?.confidenceScore >= 7.5 ? 'Strong Market' : results?.confidenceScore >= 6 ? 'Moderate Market' : 'Emerging Market';
    const confidenceColor = results?.confidenceScore >= 7.5 ? '#10b981' : results?.confidenceScore >= 6 ? '#f59e0b' : '#ef4444';

    const citiesInRegion = Object.entries(MARKET_DATA).filter(([, d]) => d.region === activeRegion).map(([name]) => name);

    const seasonalData = results ? results.seas.map((val, idx) => ({
        month: MONTHS[idx],
        demand: val,
        revenue: Math.round((results.adr * val / 100) * (results.occupancy / 100) * 30),
    })) : [];

    // WhatsApp link builder
    const buildWhatsAppLink = () => {
        const gross = rawDisplayGross ? `\u20B9${rawDisplayGross.toLocaleString('en-IN')}` : '';
        const svcLabel = currentServiceModel === 'full' ? 'full management' : 'shared services';
        const msg = `Hi, I used the Hostizzy calculator for my ${bedrooms} BHK ${propertyType} in ${selectedCity}. Estimated revenue: ${gross}. I'd like to know more about your ${svcLabel} model.`;
        return `https://wa.me/919560494001?text=${encodeURIComponent(msg)}`;
    };

    // View-mode-aware values for comparison cards
    const selfNetDisplay = results ? (viewMode === 'monthly' ? Math.round(results.self.netIncome / 12) : results.self.netIncome) : 0;
    const selfGrossDisplay = results ? (viewMode === 'monthly' ? Math.round(results.self.grossRevenue / 12) : results.self.grossRevenue) : 0;
    const hostizzyNetDisplay = results ? (viewMode === 'monthly' ? Math.round(results.netIncome / 12) : results.netIncome) : 0;
    const hostizzyGrossDisplay = results ? (viewMode === 'monthly' ? Math.round(results.grossRevenue / 12) : results.grossRevenue) : 0;
    const diffDisplay = results ? (viewMode === 'monthly' ? Math.round(results.difference / 12) : results.difference) : 0;

    // Breakdown values aware of view mode
    const breakdownValues = results ? {
        net: viewMode === 'monthly' ? Math.round(results.breakdown.net / 12) : results.breakdown.net,
        fee: viewMode === 'monthly' ? Math.round(results.breakdown.fee / 12) : results.breakdown.fee,
        ota: viewMode === 'monthly' ? Math.round(results.breakdown.ota / 12) : results.breakdown.ota,
        ops: viewMode === 'monthly' ? Math.round(results.breakdown.ops / 12) : results.breakdown.ops,
    } : null;

    return (
        <>
            <SEO title="Revenue Calculator | Hostizzy" description="AI-powered vacation rental revenue calculator for 50+ Indian markets. Estimate your property earnings with Hostizzy." />

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
                .calc-fade-in { animation: fadeInUp 0.6s ease-out both; }
                .calc-fade-in-delay { animation: fadeInUp 0.6s ease-out 0.2s both; }
                .calc-fade-in-delay-2 { animation: fadeInUp 0.6s ease-out 0.4s both; }
                .calc-region-pill { padding: 0.5rem 1.25rem; border-radius: 999px; border: 1.5px solid #e2e8f0; background: white; cursor: pointer; font-size: 0.875rem; font-weight: 600; color: #64748b; transition: all 0.2s ease; }
                .calc-region-pill:hover { border-color: #cbd5e1; color: #334155; }
                .calc-region-pill.active { background: var(--color-primary); border-color: var(--color-primary); color: white; }
                .calc-city-chip { padding: 0.4rem 1rem; border-radius: 999px; border: 1.5px solid #e2e8f0; background: white; cursor: pointer; font-size: 0.8rem; font-weight: 500; color: #475569; transition: all 0.2s ease; }
                .calc-city-chip:hover { border-color: var(--color-primary-light); background: #fff5f5; }
                .calc-city-chip.active { background: linear-gradient(135deg, #FE5858 0%, #FF8A80 100%); border-color: var(--color-primary); color: white; font-weight: 600; }
                .calc-type-card { padding: 1rem 1.25rem; border-radius: 1rem; border: 2px solid #e2e8f0; background: white; cursor: pointer; text-align: center; transition: all 0.2s ease; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; min-width: 100px; }
                .calc-type-card:hover { border-color: #fca5a5; background: #fff5f5; }
                .calc-type-card.active { border-color: var(--color-primary); background: linear-gradient(135deg, #fff5f5, #ffe4e4); box-shadow: 0 0 0 3px rgba(254,88,88,0.15); }
                .calc-bed-chip { width: 44px; height: 44px; border-radius: 12px; border: 2px solid #e2e8f0; background: white; cursor: pointer; font-size: 1rem; font-weight: 700; color: #475569; transition: all 0.15s ease; display: flex; align-items: center; justify-content: center; }
                .calc-bed-chip:hover { border-color: #fca5a5; }
                .calc-bed-chip.active { border-color: var(--color-primary); background: var(--color-primary); color: white; }
                .calc-finish-card { flex: 1; padding: 1rem; border-radius: 1rem; border: 2px solid #e2e8f0; background: white; cursor: pointer; text-align: center; transition: all 0.2s ease; }
                .calc-finish-card:hover { border-color: #fca5a5; }
                .calc-finish-card.active { border-color: var(--color-primary); background: linear-gradient(135deg, #fff5f5, #ffe4e4); box-shadow: 0 0 0 3px rgba(254,88,88,0.15); }
                .calc-bar-segment { height: 14px; transition: width 0.8s ease; }
                .calc-comparison-card { flex: 1; padding: 2rem; border-radius: 1.5rem; border: 2px solid #e2e8f0; background: white; }
                .calc-comparison-card.highlighted { border-color: var(--color-primary); background: linear-gradient(160deg, #fffbfb, #fff5f5); box-shadow: 0 8px 30px rgba(254,88,88,0.12); }
                .calc-toggle-btn { padding: 0.5rem 1.5rem; border-radius: 999px; border: 1.5px solid #e2e8f0; background: white; cursor: pointer; font-size: 0.85rem; font-weight: 600; color: #64748b; transition: all 0.2s ease; }
                .calc-toggle-btn.active { background: #1e293b; border-color: #1e293b; color: white; }
                .calc-toggle-btn:hover:not(.active) { border-color: #cbd5e1; color: #334155; }

                /* Range slider styling */
                .calc-range-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 999px; background: #e2e8f0; outline: none; transition: background 0.2s; }
                .calc-range-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #FE5858; cursor: pointer; border: 3px solid white; box-shadow: 0 2px 8px rgba(254,88,88,0.4); transition: transform 0.15s; }
                .calc-range-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
                .calc-range-slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: #FE5858; cursor: pointer; border: 3px solid white; box-shadow: 0 2px 8px rgba(254,88,88,0.4); }
                .calc-range-slider::-moz-range-track { height: 6px; border-radius: 999px; background: #e2e8f0; }

                .calc-city-input { width: 100%; padding: 0.85rem 1rem 0.85rem 2.75rem; border-radius: 1rem; border: 2px solid #e2e8f0; font-size: 1rem; font-weight: 500; color: #1e293b; outline: none; transition: border-color 0.2s, box-shadow 0.2s; background: white; }
                .calc-city-input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(254,88,88,0.12); }
                .calc-city-input::placeholder { color: #94a3b8; font-weight: 400; }

                .calc-whatsapp-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 1.75rem; border-radius: 999px; background: #25D366; color: white; font-size: 0.95rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; text-decoration: none; }
                .calc-whatsapp-btn:hover { background: #1fb855; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,211,102,0.3); }

                .calc-advanced-toggle { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0.6rem 0; font-size: 0.85rem; font-weight: 600; color: #64748b; background: none; border: none; transition: color 0.2s; }
                .calc-advanced-toggle:hover { color: #334155; }
                .calc-advanced-chevron { transition: transform 0.3s ease; }
                .calc-advanced-chevron.open { transform: rotate(180deg); }

                .calc-service-badge { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.3rem 0.85rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
                .calc-service-badge.full { background: #dcfce7; color: #15803d; }
                .calc-service-badge.shared { background: #dbeafe; color: #1d4ed8; }

                @media (max-width: 768px) {
                    .calc-comparison-row { flex-direction: column !important; }
                    .calc-dash-grid { grid-template-columns: 1fr !important; }
                    .calc-type-row { flex-wrap: wrap !important; }
                    .calc-bed-row { flex-wrap: wrap !important; }
                    .calc-finish-row { flex-direction: column !important; }
                    .calc-region-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
                }
            `}</style>

            {/* ===== 1. HERO SECTION ===== */}
            <section style={{
                background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
                padding: '5rem 0 4rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.04,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                }} />
                <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
                    <ScrollReveal>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            background: 'linear-gradient(135deg, rgba(254,88,88,0.15), rgba(139,92,246,0.15))',
                            border: '1px solid rgba(254,88,88,0.3)',
                            padding: '0.4rem 1rem', borderRadius: '999px', marginBottom: '1.5rem',
                            color: '#FF8A80', fontSize: '0.8rem', fontWeight: 600,
                        }}>
                            <Sparkles size={14} /> AI-Powered
                        </div>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                            fontWeight: 700,
                            color: 'white',
                            lineHeight: 1.15,
                            marginBottom: '1rem',
                        }}>
                            How Much Can Your Property Earn?
                        </h1>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#94a3b8',
                            maxWidth: '520px',
                            margin: '0 auto',
                            lineHeight: 1.6,
                        }}>
                            AI-powered revenue estimates for any Indian city
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== 2. INPUT SECTION ===== */}
            <section className="section" style={{ background: '#f8fafc' }}>
                <div className="container" style={{ maxWidth: '880px' }}>

                    {/* Step 1: Select Market */}
                    <ScrollReveal>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    width: '28px', height: '28px', borderRadius: '50%',
                                    background: 'var(--color-primary)', color: 'white', fontSize: '0.8rem', fontWeight: 700,
                                }}>1</span>
                                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>Select Market</span>
                            </div>

                            {/* City text input */}
                            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                <Search size={18} style={{
                                    position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)',
                                    color: '#94a3b8', pointerEvents: 'none',
                                }} />
                                <input
                                    type="text"
                                    className="calc-city-input"
                                    placeholder="Type any Indian city (e.g. Manali, Coorg, Jaipur...)"
                                    value={cityInput}
                                    onChange={(e) => {
                                        setCityInput(e.target.value);
                                        // If exact match in MARKET_DATA, auto-select
                                        if (MARKET_DATA[e.target.value]) {
                                            setSelectedCity(e.target.value);
                                            setUserAdjustedOccupancy(false);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleCalculate();
                                        }
                                    }}
                                />
                            </div>

                            {/* Market context + service badge (shown when a city is typed or selected) */}
                            {cityInput.trim() && (currentMarketContext || currentCityData) && (
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem',
                                    flexWrap: 'wrap',
                                }}>
                                    <span className={`calc-service-badge ${currentServiceModel}`}>
                                        {currentServiceModel === 'full' ? 'Full Management' : 'Shared Services'}
                                    </span>
                                    {currentMarketContext && (
                                        <span style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>
                                            {currentMarketContext}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Popular Locations label */}
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
                                Popular Locations
                            </div>

                            {/* Region pills */}
                            <div className="calc-region-scroll" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                {REGIONS.map(region => (
                                    <button
                                        key={region}
                                        className={`calc-region-pill ${activeRegion === region ? 'active' : ''}`}
                                        onClick={() => setActiveRegion(region)}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>

                            {/* City chips */}
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {citiesInRegion.map(city => (
                                    <button
                                        key={city}
                                        className={`calc-city-chip ${selectedCity === city && cityInput === city ? 'active' : ''}`}
                                        onClick={() => handleCityChipClick(city)}
                                    >
                                        <MapPin size={12} style={{ marginRight: '0.25rem', verticalAlign: '-1px' }} />
                                        {city}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Step 2: Property Details */}
                    <ScrollReveal>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    width: '28px', height: '28px', borderRadius: '50%',
                                    background: 'var(--color-primary)', color: 'white', fontSize: '0.8rem', fontWeight: 700,
                                }}>2</span>
                                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>Property Details</span>
                            </div>

                            {/* Property Type */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Property Type</div>
                                <div className="calc-type-row" style={{ display: 'flex', gap: '0.75rem' }}>
                                    {PROPERTY_TYPES.map(pt => {
                                        const Icon = pt.icon;
                                        return (
                                            <button
                                                key={pt.key}
                                                className={`calc-type-card ${propertyType === pt.key ? 'active' : ''}`}
                                                onClick={() => setPropertyType(pt.key)}
                                            >
                                                <Icon size={22} strokeWidth={1.8} style={{ color: propertyType === pt.key ? 'var(--color-primary)' : '#64748b' }} />
                                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: propertyType === pt.key ? '#1e293b' : '#64748b' }}>{pt.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bedrooms */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bedrooms</div>
                                <div className="calc-bed-row" style={{ display: 'flex', gap: '0.5rem' }}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <button
                                            key={n}
                                            className={`calc-bed-chip ${bedrooms === n ? 'active' : ''}`}
                                            onClick={() => setBedrooms(n)}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Finish Level */}
                            <div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Finish Level</div>
                                <div className="calc-finish-row" style={{ display: 'flex', gap: '0.75rem' }}>
                                    {FINISH_LEVELS.map(fl => (
                                        <button
                                            key={fl.key}
                                            className={`calc-finish-card ${finishes === fl.key ? 'active' : ''}`}
                                            onClick={() => setFinishes(fl.key)}
                                        >
                                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: finishes === fl.key ? '#1e293b' : '#475569', marginBottom: '0.2rem' }}>
                                                {fl.label}
                                                {fl.stars > 0 && <span style={{ color: '#f59e0b', marginLeft: '0.3rem' }}>{'★'.repeat(fl.stars)}</span>}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: finishes === fl.key ? 'var(--color-primary)' : '#94a3b8', fontWeight: 500 }}>
                                                {fl.boost}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Step 3: Occupancy Slider */}
                    <ScrollReveal>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    width: '28px', height: '28px', borderRadius: '50%',
                                    background: 'var(--color-primary)', color: 'white', fontSize: '0.8rem', fontWeight: 700,
                                }}>3</span>
                                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>Expected Occupancy</span>
                            </div>
                            <div style={{
                                background: 'white', borderRadius: '1rem', padding: '1.25rem 1.5rem',
                                border: '1.5px solid #e2e8f0',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                                        Drag to adjust occupancy rate
                                    </span>
                                    <span style={{
                                        fontSize: '1.25rem', fontWeight: 800, color: '#FE5858',
                                        background: 'linear-gradient(135deg, #fff5f5, #ffe4e4)',
                                        padding: '0.2rem 0.75rem', borderRadius: '0.5rem',
                                    }}>
                                        {occupancyOverride}%
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    className="calc-range-slider"
                                    min="30"
                                    max="90"
                                    value={occupancyOverride}
                                    onChange={(e) => {
                                        setOccupancyOverride(parseInt(e.target.value, 10));
                                        setUserAdjustedOccupancy(true);
                                    }}
                                    style={{
                                        background: `linear-gradient(to right, #FE5858 0%, #FE5858 ${((occupancyOverride - 30) / 60) * 100}%, #e2e8f0 ${((occupancyOverride - 30) / 60) * 100}%, #e2e8f0 100%)`,
                                    }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                                    <span>30%</span>
                                    <span>90%</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Advanced Options (Expandable) */}
                    <ScrollReveal>
                        <div style={{ marginBottom: '2rem' }}>
                            <button
                                className="calc-advanced-toggle"
                                onClick={() => setAdvancedOpen(!advancedOpen)}
                            >
                                <ChevronDown size={16} className={`calc-advanced-chevron ${advancedOpen ? 'open' : ''}`} />
                                Advanced Options
                            </button>
                            {advancedOpen && (
                                <div style={{
                                    background: 'white', borderRadius: '1rem', padding: '1.25rem 1.5rem',
                                    border: '1.5px solid #e2e8f0', marginTop: '0.5rem',
                                    animation: 'fadeInUp 0.3s ease-out both',
                                }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Monthly Running Costs
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="e.g. 40000"
                                        value={monthlyCosts}
                                        onChange={(e) => setMonthlyCosts(e.target.value.replace(/[^\d]/g, ''))}
                                        style={{
                                            width: '100%',
                                            padding: '0.7rem 1rem',
                                            borderRadius: '0.75rem',
                                            border: '1.5px solid #e2e8f0',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            color: '#1e293b',
                                        }}
                                    />
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                                        Include EMI, maintenance, staff salaries, etc. This amount will be deducted from your net income.
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollReveal>

                    {/* Calculate Button */}
                    <ScrollReveal>
                        <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
                            <button
                                onClick={handleCalculate}
                                disabled={isCalculating}
                                className="btn btn-gradient"
                                style={{
                                    padding: '1.1rem 3rem',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    borderRadius: '999px',
                                    opacity: isCalculating ? 0.7 : 1,
                                    cursor: isCalculating ? 'wait' : 'pointer',
                                    boxShadow: '0 8px 30px rgba(254,88,88,0.3)',
                                }}
                            >
                                {isCalculating ? (
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ width: '18px', height: '18px', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                                        Analyzing {cityInput || selectedCity} market with AI...
                                    </span>
                                ) : (
                                    <>Calculate My Earnings</>
                                )}
                            </button>
                            {!isCalculating && (
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                                    <Sparkles size={12} /> Get AI-Powered Estimate
                                </div>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== 3. RESULTS SECTION ===== */}
            {showResults && results && (
                <>
                    {/* Monthly/Annual Toggle */}
                    <section style={{ background: 'white', padding: '1.5rem 0 0' }}>
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                            <button
                                className={`calc-toggle-btn ${viewMode === 'monthly' ? 'active' : ''}`}
                                onClick={() => setViewMode('monthly')}
                            >
                                Monthly
                            </button>
                            <button
                                className={`calc-toggle-btn ${viewMode === 'annual' ? 'active' : ''}`}
                                onClick={() => setViewMode('annual')}
                            >
                                Annual
                            </button>
                        </div>
                    </section>

                    {/* --- Primary Result Card --- */}
                    <section style={{
                        background: 'linear-gradient(135deg, #FE5858 0%, #d83a3a 50%, #b91c1c 100%)',
                        padding: '3.5rem 0',
                    }}>
                        <div className="container calc-fade-in" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                                Estimated {viewMode === 'monthly' ? 'Monthly' : 'Annual'} Net Income
                                {aiData && (
                                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', marginLeft: '0.5rem', verticalAlign: 'middle' }}>AI Enhanced</span>
                                )}
                            </div>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                                fontWeight: 800,
                                color: 'white',
                                lineHeight: 1,
                                marginBottom: '1rem',
                            }}>
                                <AnimatedCounter value={displayNet} />
                            </div>

                            {/* ADR Range */}
                            <div style={{
                                fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginBottom: '1rem',
                            }}>
                                Estimated {'\u20B9'}{adrLow.toLocaleString('en-IN')} &ndash; {'\u20B9'}{adrHigh.toLocaleString('en-IN')} / night
                            </div>

                            {/* Confidence badge */}
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                background: 'rgba(255,255,255,0.15)',
                                padding: '0.4rem 1rem', borderRadius: '999px',
                                color: 'white', fontSize: '0.85rem', fontWeight: 600,
                                marginBottom: '0.75rem',
                                backdropFilter: 'blur(8px)',
                            }}>
                                <span style={{
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: confidenceColor, display: 'inline-block',
                                }} />
                                {confidenceLabel} ({results.confidenceScore}/10)
                            </div>

                            {parsedMonthlyCosts > 0 && (
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
                                    After deducting {'\u20B9'}{(viewMode === 'monthly' ? parsedMonthlyCosts : annualCostDeduction).toLocaleString('en-IN')} in {viewMode === 'monthly' ? 'monthly' : 'annual'} running costs
                                </div>
                            )}
                        </div>
                    </section>

                    {/* --- Comparison Cards --- */}
                    <section className="section" style={{ background: 'white' }}>
                        <div className="container" style={{ maxWidth: '920px' }}>
                            <ScrollReveal>
                                <div className="calc-comparison-row" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>

                                    {/* Self-Managed */}
                                    <div className="calc-comparison-card" style={{ opacity: 0.85 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Self-Managed</div>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#475569', marginBottom: '0.5rem' }}>
                                            {'\u20B9'}{selfNetDisplay.toLocaleString('en-IN')}
                                            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8', marginLeft: '0.25rem' }}>/{viewMode === 'monthly' ? 'mo' : 'yr'}</span>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>Net after {results.self.occupancy}% occupancy & 18% OTA fees</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
                                                <span>Occupancy</span><span style={{ fontWeight: 600 }}>{results.self.occupancy}%</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
                                                <span>Gross Revenue</span><span style={{ fontWeight: 600 }}>{'\u20B9'}{selfGrossDisplay.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
                                                <span>Pricing</span><span style={{ fontWeight: 600 }}>Static</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* With Hostizzy */}
                                    <div className="calc-comparison-card highlighted" style={{ position: 'relative' }}>
                                        <div style={{
                                            position: 'absolute', top: '-12px', right: '1.5rem',
                                            background: 'linear-gradient(135deg, #FE5858, #FF8A80)',
                                            color: 'white', fontSize: '0.65rem', fontWeight: 800,
                                            padding: '0.3rem 0.8rem', borderRadius: '999px',
                                            textTransform: 'uppercase', letterSpacing: '0.08em',
                                        }}>
                                            Recommended
                                        </div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>With Hostizzy</div>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
                                            {'\u20B9'}{hostizzyNetDisplay.toLocaleString('en-IN')}
                                            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8', marginLeft: '0.25rem' }}>/{viewMode === 'monthly' ? 'mo' : 'yr'}</span>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>Net after {results.occupancy}% occupancy & professional management</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569' }}>
                                                <span>Occupancy</span><span style={{ fontWeight: 600 }}>{results.occupancy}%</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569' }}>
                                                <span>Gross Revenue</span><span style={{ fontWeight: 600 }}>{'\u20B9'}{hostizzyGrossDisplay.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569' }}>
                                                <span>Pricing</span><span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Dynamic AI</span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid #fecaca', paddingTop: '1rem' }}>
                                            {['Dynamic Pricing', 'Professional Photos', '24/7 Guest Support', 'Multi-channel Distribution'].map(item => (
                                                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#475569' }}>
                                                    <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} /> {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Difference callout */}
                                {results.difference > 0 && (
                                    <div style={{
                                        textAlign: 'center',
                                        background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
                                        border: '1px solid #bbf7d0',
                                        borderRadius: '1rem',
                                        padding: '1rem 1.5rem',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        color: '#15803d',
                                    }}>
                                        <Zap size={16} style={{ verticalAlign: '-3px', marginRight: '0.35rem' }} />
                                        With Hostizzy, you earn {'\u20B9'}{diffDisplay.toLocaleString('en-IN')} more per {viewMode === 'monthly' ? 'month' : 'year'} (+{results.differencePercent}%)
                                    </div>
                                )}
                            </ScrollReveal>
                        </div>
                    </section>

                    {/* ===== 4. DETAIL DASHBOARD ===== */}
                    <section className="section" style={{ background: '#f8fafc', paddingTop: '2rem' }}>
                        <div className="container" style={{ maxWidth: '960px' }}>
                            <ScrollReveal>
                                <div className="calc-dash-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: '1.5rem',
                                }}>
                                    {/* Column 1: Key Metrics */}
                                    <div className="card" style={{ padding: '1.5rem', borderRadius: '1.25rem', background: 'white' }}>
                                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <BarChart3 size={16} style={{ color: 'var(--color-primary)' }} /> Key Metrics
                                        </h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {[
                                                { label: 'ADR (Avg Daily Rate)', value: `\u20B9${adrLow.toLocaleString('en-IN')} \u2013 \u20B9${adrHigh.toLocaleString('en-IN')}` },
                                                { label: 'Annual Occupancy', value: `${displayOcc}%` },
                                                { label: 'RevPAR', value: `\u20B9${(aiData ? Math.round(aiData.grossRevenue / 365) : results.revpar).toLocaleString('en-IN')}` },
                                                { label: 'Days Booked', value: `${results.daysBooked} / 365` },
                                                { label: 'Market Grade', value: results.marketGrade },
                                            ].map(m => (
                                                <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{m.label}</span>
                                                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>{m.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Column 2: Revenue Breakdown */}
                                    <div className="card" style={{ padding: '1.5rem', borderRadius: '1.25rem', background: 'white' }}>
                                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <IndianRupee size={16} style={{ color: 'var(--color-primary)' }} /> Revenue Breakdown
                                            <span style={{ fontSize: '0.7rem', fontWeight: 500, color: '#94a3b8', marginLeft: 'auto' }}>/{viewMode === 'monthly' ? 'mo' : 'yr'}</span>
                                        </h3>

                                        {/* Stacked bar */}
                                        <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                                            <div className="calc-bar-segment" style={{ width: '47%', background: '#10b981' }} />
                                            <div className="calc-bar-segment" style={{ width: '20%', background: '#3b82f6' }} />
                                            <div className="calc-bar-segment" style={{ width: '18%', background: '#f59e0b' }} />
                                            <div className="calc-bar-segment" style={{ width: '15%', background: '#ef4444' }} />
                                        </div>

                                        {breakdownValues && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                                {[
                                                    { label: 'Net Income', pct: '47%', color: '#10b981', amount: breakdownValues.net },
                                                    { label: 'Management', pct: '20%', color: '#3b82f6', amount: breakdownValues.fee },
                                                    { label: 'OTA Fees', pct: '18%', color: '#f59e0b', amount: breakdownValues.ota },
                                                    { label: 'Operations', pct: '15%', color: '#ef4444', amount: breakdownValues.ops },
                                                ].map(item => (
                                                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.color, flexShrink: 0 }} />
                                                        <span style={{ flex: 1, fontSize: '0.8rem', color: '#64748b' }}>{item.label}</span>
                                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{item.pct}</span>
                                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', minWidth: '80px', textAlign: 'right' }}>{'\u20B9'}{item.amount.toLocaleString('en-IN')}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Column 3: AI Insight / Methodology */}
                                    <div className="card" style={{
                                        padding: '1.5rem', borderRadius: '1.25rem',
                                        background: aiData ? 'linear-gradient(160deg, #eff6ff, #f0f9ff)' : 'white',
                                        border: aiData ? '1px solid #bfdbfe' : undefined,
                                    }}>
                                        {aiData ? (
                                            <>
                                                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <Sparkles size={16} /> Market Insight
                                                </h3>
                                                <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6, marginBottom: '1rem' }}>
                                                    {aiData.marketInsight}
                                                </p>
                                                {aiData.recommendations && (
                                                    <>
                                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.5rem' }}>Recommendations</div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                                            {aiData.recommendations.map((rec, i) => (
                                                                <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.4rem', fontSize: '0.8rem', color: '#334155' }}>
                                                                    <Check size={13} style={{ color: '#22c55e', marginTop: '2px', flexShrink: 0 }} /> {rec}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <Info size={16} style={{ color: 'var(--color-primary)' }} /> Market Intelligence
                                                </h3>
                                                {aiLoading ? (
                                                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                                        <div style={{ width: '32px', height: '32px', border: '3px solid #e2e8f0', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 0.75rem' }} />
                                                        <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Generating AI insights...</p>
                                                    </div>
                                                ) : (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                        {[
                                                            { label: 'Data Source', value: 'Hostizzy proprietary database (2,500+ properties)' },
                                                            { label: 'Update Frequency', value: 'Monthly rolling average' },
                                                            { label: 'Methodology', value: 'Conservative multi-layer projections' },
                                                        ].map(item => (
                                                            <div key={item.label} style={{ borderLeft: '3px solid #e2e8f0', paddingLeft: '0.75rem' }}>
                                                                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                                                                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.15rem' }}>{item.value}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                {aiError && (
                                                    <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.75rem' }}>AI estimation unavailable. Showing formula-based results.</p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </section>

                    {/* ===== 5. SEASONAL CHART (Gated) ===== */}
                    <section className="section" style={{ background: 'white' }}>
                        <div className="container" style={{ maxWidth: '800px' }}>
                            <ScrollReveal>
                                <div style={{ position: 'relative' }}>
                                    {/* Chart content */}
                                    <div style={{
                                        filter: !emailUnlocked ? 'blur(6px)' : 'none',
                                        pointerEvents: !emailUnlocked ? 'none' : 'auto',
                                        transition: 'filter 0.4s ease',
                                    }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <TrendingUp size={18} style={{ color: 'var(--color-primary)' }} /> Seasonal Revenue Trend
                                        </h3>
                                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Month-by-month demand index for {selectedCity}</p>
                                        {seasonalData.length > 0 && (
                                            <ResponsiveContainer width="100%" height={280}>
                                                <LineChart data={aiData?.seasonalTrend ? aiData.seasonalTrend.map((val, idx) => ({ month: MONTHS[idx], demand: val, revenue: Math.round((results.adr * val / 100) * (results.occupancy / 100) * 30) })) : seasonalData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                                    <Line type="monotone" dataKey="demand" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} name="Demand Index" />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        )}
                                    </div>

                                    {/* Gate overlay */}
                                    {!emailUnlocked && (
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            zIndex: 10,
                                        }}>
                                            <div style={{
                                                background: 'white',
                                                padding: '2rem',
                                                borderRadius: '1.5rem',
                                                boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                                                maxWidth: '380px',
                                                textAlign: 'center',
                                                border: '1px solid #e2e8f0',
                                            }}>
                                                <Lock size={28} style={{ color: 'var(--color-primary)', marginBottom: '0.75rem' }} />
                                                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.4rem' }}>Unlock Seasonal Insights</h4>
                                                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                                                    Enter your email to see month-by-month projections and download a PDF report.
                                                </p>
                                                <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <input
                                                        type="email"
                                                        required
                                                        placeholder="you@email.com"
                                                        value={leadEmail}
                                                        onChange={(e) => setLeadEmail(e.target.value)}
                                                        style={{
                                                            flex: 1,
                                                            padding: '0.7rem 1rem',
                                                            borderRadius: '0.75rem',
                                                            border: '1.5px solid #e2e8f0',
                                                            fontSize: '0.85rem',
                                                            outline: 'none',
                                                        }}
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={emailSubmitting}
                                                        className="btn btn-gradient"
                                                        style={{
                                                            padding: '0.7rem 1.25rem',
                                                            fontSize: '0.85rem',
                                                            borderRadius: '0.75rem',
                                                            whiteSpace: 'nowrap',
                                                            opacity: emailSubmitting ? 0.7 : 1,
                                                        }}
                                                    >
                                                        {emailSubmitting ? '...' : 'Unlock'}
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        </div>
                    </section>

                    {/* ===== 6. BOTTOM CTA ===== */}
                    <section style={{
                        background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
                        padding: '4rem 0',
                    }}>
                        <div className="container" style={{ textAlign: 'center' }}>
                            <ScrollReveal>
                                {currentServiceModel === 'full' ? (
                                    <>
                                        <h2 style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                            fontWeight: 700,
                                            color: 'white',
                                            marginBottom: '0.75rem',
                                        }}>
                                            Want this exact performance?
                                        </h2>
                                        <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
                                            Get a verified audit from our revenue management team.
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                            <Link
                                                href={`/contact?type=owner&loc=${encodeURIComponent(selectedCity)}&rev=${displayGross}`}
                                                className="btn btn-gradient"
                                                style={{
                                                    padding: '1rem 2.5rem',
                                                    fontSize: '1.05rem',
                                                    fontWeight: 700,
                                                    borderRadius: '999px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    boxShadow: '0 8px 30px rgba(254,88,88,0.3)',
                                                }}
                                            >
                                                Get Full Management Quote <ArrowRight size={18} />
                                            </Link>
                                            <a
                                                href={buildWhatsAppLink()}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="calc-whatsapp-btn"
                                            >
                                                <MessageCircle size={18} /> Talk to Us on WhatsApp
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2 style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                            fontWeight: 700,
                                            color: 'white',
                                            marginBottom: '0.75rem',
                                        }}>
                                            We offer revenue management & marketing for {selectedCity}
                                        </h2>
                                        <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '2rem', maxWidth: '520px', margin: '0 auto 2rem' }}>
                                            Let us help you maximize your property&apos;s potential with shared services.
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                            <Link
                                                href={`/contact?type=shared&loc=${encodeURIComponent(selectedCity)}&rev=${displayGross}`}
                                                className="btn btn-outline"
                                                style={{
                                                    padding: '1rem 2.5rem',
                                                    fontSize: '1.05rem',
                                                    fontWeight: 700,
                                                    borderRadius: '999px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    color: 'white',
                                                    borderColor: 'rgba(255,255,255,0.3)',
                                                }}
                                            >
                                                Explore Shared Services <ArrowRight size={18} />
                                            </Link>
                                            <a
                                                href={buildWhatsAppLink()}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="calc-whatsapp-btn"
                                            >
                                                <MessageCircle size={18} /> Talk to Us on WhatsApp
                                            </a>
                                        </div>
                                    </>
                                )}
                            </ScrollReveal>
                        </div>
                    </section>
                </>
            )}
        </>
    );
}
