'use client';

import { useEffect } from 'react';

/**
 * LiveChat Component - Tawk.to Integration
 *
 * This component integrates Tawk.to live chat widget into the website.
 * The chat widget appears as a floating button in the bottom-right corner.
 *
 * SETUP INSTRUCTIONS:
 * 1. Sign up for a free account at https://www.tawk.to/
 * 2. Create a new property for your website
 * 3. Get your unique Property ID and Widget ID from the Admin Panel
 * 4. Replace the placeholder IDs below with your actual IDs:
 *    - TAWK_PROPERTY_ID: Found in Admin > Property Settings
 *    - TAWK_WIDGET_ID: Found in Admin > Chat Widget > Direct Chat Link
 *
 * Example IDs format:
 * - Property ID: 5f1234567890abcdef123456
 * - Widget ID: 1abc2def3ghi4jkl
 *
 * The widget will automatically:
 * - Load only on the client-side
 * - Position itself in the bottom-right corner
 * - Show online/offline status
 * - Allow visitors to send messages even when offline
 * - Provide chat history and visitor tracking
 *
 * Customization:
 * You can customize the widget appearance, behavior, and triggers from the
 * Tawk.to dashboard under Admin > Chat Widget > Appearance/Behavior
 */

const LiveChat = () => {
    useEffect(() => {
        // Only load Tawk.to on client-side
        if (typeof window === 'undefined') return;

        // Replace these with your actual Tawk.to IDs
        // Get them from: https://dashboard.tawk.to/
        const TAWK_PROPERTY_ID = 'YOUR_TAWK_PROPERTY_ID'; // e.g., '5f1234567890abcdef123456'
        const TAWK_WIDGET_ID = 'YOUR_TAWK_WIDGET_ID'; // e.g., '1abc2def3ghi4jkl'

        // Check if IDs are configured
        if (TAWK_PROPERTY_ID === 'YOUR_TAWK_PROPERTY_ID' || TAWK_WIDGET_ID === 'YOUR_TAWK_WIDGET_ID') {
            console.warn(
                '⚠️ Tawk.to Live Chat is not configured.\n' +
                'Please update the TAWK_PROPERTY_ID and TAWK_WIDGET_ID in components/LiveChat.jsx\n' +
                'Sign up at: https://www.tawk.to/'
            );
            return;
        }

        // Prevent duplicate script loading
        if (window.Tawk_API) {
            return;
        }

        // Create and inject Tawk.to script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');

        // Initialize Tawk API placeholder
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        // Optional: Customize widget behavior
        window.Tawk_API.onLoad = function() {
            console.log('✅ Tawk.to Live Chat loaded successfully');

            // Example: Set custom attributes for visitors
            // window.Tawk_API.setAttributes({
            //     'source': 'Hostizzy Website',
            //     'page': window.location.pathname
            // }, function(error) {
            //     if (error) console.error('Tawk.to attribute error:', error);
            // });
        };

        // Optional: Handle widget visibility
        window.Tawk_API.onChatMaximized = function() {
            // Track chat opens in analytics if needed
            // console.log('Chat opened');
        };

        // Append script to document
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);

        // Cleanup function
        return () => {
            // Remove Tawk.to widget on component unmount
            if (window.Tawk_API && window.Tawk_API.hideWidget) {
                window.Tawk_API.hideWidget();
            }
        };
    }, []);

    // This component doesn't render anything visible
    // The Tawk.to script handles all UI
    return null;
};

export default LiveChat;
