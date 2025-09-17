(function() {
    'use strict';

    // Get configuration from PHP

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const resellerId = urlParams.get('id') || '';
    const config = window.trcConfig || {};
    const RESELLER_API_URL = config.apiUrl+resellerId || 'https://thewebgo.com//wp-json/api/v1/reseller/' + resellerId;
    const DEFAULT_WEBSITE = config.defaultWebsite || 'https://thewebgo.com';
    const DEFAULT_PHONE = config.defaultPhone || '0988 888 888';
    const DEFAULT_NAME = config.defaultName || 'thewebgo.com';
    const BUTTON_POSITION = config.buttonPosition || 'bottom-right';
    const BUTTON_COLOR = config.buttonColor || '#ffffff';
    const BUTTON_SPACING = config.buttonSpacing || '10';
    const ENABLE_BUTTON = config.enableButton !== false;
    const MODAL_BACKGROUND_COLOR = config.modalBackgroundColor || '#1e73be';
    const DEFAULT_MESSAGE = config.defaultMessage || 'Bạn đang xem demo từ ';

    // Initialize with default values
    let resellerData = {
        nickname: DEFAULT_NAME,
        billing_phone: DEFAULT_PHONE,
        url: DEFAULT_WEBSITE
    };

    // Exit early if button is disabled
    if (!ENABLE_BUTTON) {
        return;
    }

    // Get button position styles
    function getPositionStyles(position, spacing) {
        const spacingPx = spacing + 'px';
        switch(position) {
            case 'bottom-left':
                return `bottom: ${spacingPx}; left: ${spacingPx};`;
            case 'top-right':
                return `top: ${spacingPx}; right: ${spacingPx};`;
            case 'top-left':
                return `top: ${spacingPx}; left: ${spacingPx};`;
            default:
                return `bottom: ${spacingPx}; right: ${spacingPx};`;
        }
    }

    // Create styles
    const style = document.createElement('style');
    style.textContent = `
        .trc-float-btn {
            position: fixed;
            ${getPositionStyles(BUTTON_POSITION, BUTTON_SPACING)}
            background: ${BUTTON_COLOR};
            width: 20px;
            height: 20px;
            border-radius: 0;
            border: none;
            color: ${MODAL_BACKGROUND_COLOR};
            font-size: 12px;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            text-transform: lowercase;
            font-family: serif;
            letter-spacing: 1px;
        }
        .trc-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-size: 85%;
        }
        .trc-modal-content {
            color: ${BUTTON_COLOR};
            background: ${MODAL_BACKGROUND_COLOR};
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            width: 90%;
        }
        .trc-btn {
            display: inline-block;
            margin: 10px;
            padding: 12px 24px;
            background: ${BUTTON_COLOR};
            color: ${MODAL_BACKGROUND_COLOR};
            text-decoration: none;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            font-weight: bold;
        }
        .trc-btn:hover {
            opacity: 0.8;
        }
        .trc-close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Cookie helper functions
    function setCookie(name, value, days = 7) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    function saveResellerDataToCookie(data) {
        setCookie('trc_reseller_data', JSON.stringify(data));
    }

    function getResellerDataFromCookie() {
        const cookieData = getCookie('trc_reseller_data');
        if (cookieData) {
            try {
                return JSON.parse(cookieData);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    // Fetch reseller data
    function fetchResellerData() {
        // Create button immediately with default data
        createFloatButton();
        
        // Check if we have cached reseller data in cookies
        const cachedData = getResellerDataFromCookie();
        if (cachedData && cachedData.nickname && cachedData.billing_phone && cachedData.url) {
            // Use cached data
            resellerData = {
                nickname: cachedData.nickname,
                billing_phone: cachedData.billing_phone,
                url: cachedData.url
            };
            console.log('Using cached reseller data from cookies');
            return;
        }
        
        // No cached data or incomplete data, fetch from API
        else if (resellerId) {
            fetch(RESELLER_API_URL)
                .then(response => response.json())
                .then(data => {
                    // Update resellerData with API response
                    if (data && data.data.status === 200) {
                        resellerData = {
                            nickname: data.data.reseller.nickname || resellerData.nickname,
                            billing_phone: data.data.reseller.billing_phone || resellerData.billing_phone,
                            url: data.data.reseller.url || resellerData.url
                        };
                        // Save to cookies for future visits
                        saveResellerDataToCookie(resellerData);
                        console.log('Fetched and cached new reseller data');
                    } else {
                        // Show modal after 3 seconds
                        setTimeout(() => showModal(), 3000);
                    }
                })
                .catch(() => {
                    // If API fails, keep using default data
                    console.log('API call failed, using default reseller data');
                });
        }
        else {
            // Show modal after 3 seconds
            setTimeout(() => showModal(), 3000);
        }
    }

    // Create floating button
    function createFloatButton() {
        const btn = document.createElement('button');
        btn.className = 'trc-float-btn';
        btn.innerHTML = '[i]';
        btn.title = 'Contact Reseller';
        btn.onclick = showModal;
        document.body.appendChild(btn);
    }

    // Show modal
    function showModal() {
        const modal = document.createElement('div');
        modal.className = 'trc-modal';
        
        const content = document.createElement('div');
        content.className = 'trc-modal-content';
        content.style.position = 'relative';

        const close = document.createElement('span');
        close.className = 'trc-close';
        close.innerHTML = '×';
        close.onclick = () => modal.remove();

        const phoneBtn = document.createElement('a');
        phoneBtn.className = 'trc-btn';
        phoneBtn.textContent = '📞 '+ resellerData.billing_phone;
        phoneBtn.href = 'tel:' + resellerData.billing_phone;

        const websiteBtn = document.createElement('a');
        websiteBtn.className = 'trc-btn';
        websiteBtn.textContent = '🌐 Website';
        websiteBtn.href = resellerData.url;
        websiteBtn.target = '_blank';

        const message = document.createElement('p');
        message.textContent = DEFAULT_MESSAGE+" "+resellerData.nickname;

        content.appendChild(close);
        content.appendChild(message);
        content.appendChild(phoneBtn);
        content.appendChild(websiteBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);

        // Close on outside click
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fetchResellerData);
    } else {
        fetchResellerData();
    }
})();
