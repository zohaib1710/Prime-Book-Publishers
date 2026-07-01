(function () {
    var zendeskSnippetId = 'ze-snippet';
    var zendeskSnippetSrc = 'https://static.zdassets.com/ekr/snippet.js?key=3928d221-6f4b-41fe-a0c7-121aed1653d2';
    var existingZendeskScript = document.getElementById(zendeskSnippetId);

    function withZendesk(callback, attempt) {
        if (window.zE) {
            callback();
            return;
        }

        if ((attempt || 0) < 40) {
            window.setTimeout(function () {
                withZendesk(callback, (attempt || 0) + 1);
            }, 250);
        }
    }

    function showZendeskLauncher() {
        withZendesk(function () {
            try {
                window.zE('webWidget', 'show');
            } catch (error) {
                try {
                    window.zE('messenger', 'show');
                } catch (messengerError) {}
            }
        });
    }

    function openZendeskChat() {
        withZendesk(function () {
            try {
                window.zE('webWidget', 'show');
                window.zE('webWidget', 'open');
            } catch (error) {
                try {
                    window.zE('messenger', 'show');
                    window.zE('messenger', 'open');
                } catch (messengerError) {}
            }
        });
    }

    window.setButtonURL = openZendeskChat;
    window.toggleChat = openZendeskChat;

    if (existingZendeskScript) {
        if (existingZendeskScript.getAttribute('src') !== zendeskSnippetSrc) {
            existingZendeskScript.parentNode.removeChild(existingZendeskScript);
        } else {
            showZendeskLauncher();
            return;
        }
    }

    var zendeskScript = document.createElement('script');
    zendeskScript.id = zendeskSnippetId;
    zendeskScript.src = zendeskSnippetSrc;
    zendeskScript.async = true;
    zendeskScript.onload = showZendeskLauncher;
    document.head.appendChild(zendeskScript);
})();

(function () {
    document.addEventListener('click', function (event) {
        var callLink = event.target && event.target.closest ? event.target.closest('a[href^="tel:"]') : null;
        if (callLink) {
            var telHref = callLink.getAttribute('href').replace(/\s+/g, '');
            callLink.setAttribute('href', telHref);
            event.stopImmediatePropagation();
            window.location.href = telHref;
        }
    }, true);
})();

(function () {
    var formspreeEndpoint = 'https://formspree.io/f/xgojlbdl';
    var successText = 'Thank You! Your submission has been received';
    var errorText = 'Something went wrong. Please try again.';

    function getSubmitControl(form) {
        return form.querySelector('button[type="submit"], input[type="submit"], button:not([type]), .hero-form-submit, .btn-form, .submit-button');
    }

    function getSubmitText(control) {
        if (!control) {
            return '';
        }

        return control.tagName === 'INPUT' ? control.value : control.textContent;
    }

    function setSubmitText(control, text) {
        if (!control) {
            return;
        }

        if (control.tagName === 'INPUT') {
            control.value = text;
        } else {
            control.textContent = text;
        }
    }

    function setSubmitSuccess(control) {
        if (!control) {
            return;
        }

        control.disabled = false;
        setSubmitText(control, successText);
        control.classList.remove('is-submitting');
        control.classList.add('is-success');
        control.style.setProperty('background', '#20a844', 'important');
        control.style.setProperty('background-color', '#20a844', 'important');
        control.style.setProperty('background-image', 'none', 'important');
        control.style.setProperty('border-color', '#20a844', 'important');
        control.style.setProperty('color', '#fff', 'important');
        control.style.setProperty('-webkit-text-fill-color', '#fff', 'important');
    }

    function getMessageElement(form, submitControl) {
        var message = form.querySelector('[data-formspree-ajax-message], [data-homepage-hero-form-message], .formspree-ajax-message, .hero-form-ajax-message');
        if (message) {
            return message;
        }

        message = document.createElement('div');
        message.className = 'formspree-ajax-message';
        message.setAttribute('data-formspree-ajax-message', '');
        message.setAttribute('role', 'status');
        message.setAttribute('aria-live', 'polite');

        if (submitControl && submitControl.parentNode) {
            submitControl.insertAdjacentElement('afterend', message);
        } else {
            form.appendChild(message);
        }

        return message;
    }

    function setMessage(message, text, type) {
        if (!message) {
            return;
        }

        message.textContent = text;
        message.classList.remove('is-visible', 'is-success', 'is-error');

        if (text) {
            message.classList.add('is-visible', type === 'success' ? 'is-success' : 'is-error');
        }
    }

    function resetSubmitControl(control) {
        if (!control) {
            return;
        }

        control.disabled = false;
        setSubmitText(control, control.getAttribute('data-formspree-default-text') || 'Submit');
        control.classList.remove('is-submitting', 'is-success');
        control.style.removeProperty('background');
        control.style.removeProperty('background-color');
        control.style.removeProperty('background-image');
        control.style.removeProperty('border-color');
        control.style.removeProperty('color');
        control.style.removeProperty('-webkit-text-fill-color');
    }

    document.addEventListener('submit', function (event) {
        var form = event.target;

        if (!form || form.tagName !== 'FORM' || form.hasAttribute('data-formspree-ignore')) {
            return;
        }

        if (event.defaultPrevented) {
            return;
        }

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        var submitControl = getSubmitControl(form);
        var message = getMessageElement(form, submitControl);

        form.classList.add('is-formspree-ajax');
        form.setAttribute('data-formspree-ajax-ready', 'true');

        if (submitControl && !submitControl.hasAttribute('data-formspree-default-text')) {
            submitControl.setAttribute('data-formspree-default-text', getSubmitText(submitControl));
        }

        setMessage(message, '', '');

        if (submitControl) {
            submitControl.disabled = true;
            setSubmitText(submitControl, 'Submitting...');
            submitControl.classList.remove('is-success');
            submitControl.classList.add('is-submitting');
        }

        fetch(formspreeEndpoint, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                Accept: 'application/json'
            }
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Formspree submission failed');
                }

                form.reset();

                setSubmitSuccess(submitControl);
                setMessage(message, '', '');
            })
            .catch(function () {
                resetSubmitControl(submitControl);
                setMessage(message, errorText, 'error');
            });
    });
})();

(function () {
    var servicePages = [
        'services.html',
        'audiobook-service.html',
        'author-website-design.html',
        'book-cover-design.html',
        'book-editing-services.html',
        'book-illustration-services.html',
        'book-marketing-services.html',
        'book-publishing-services.html',
        'ghostwriting-services.html'
    ];

    function initServicePopup() {
        var currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        if (servicePages.indexOf(currentPage) === -1) {
            return;
        }

        var modalElement = document.getElementById('mainpopupform');
        if (!modalElement) {
            return;
        }

        function cleanupServicePopupState() {
            document.querySelectorAll('.modal-backdrop').forEach(function (backdrop) {
                backdrop.remove();
            });
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('padding-right');
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            modalElement.setAttribute('aria-hidden', 'true');
            modalElement.removeAttribute('aria-modal');
            modalElement.removeAttribute('role');
        }

        function bindPopup(attempt) {
            if (!window.bootstrap || !window.bootstrap.Modal) {
                if (attempt < 25) {
                    window.setTimeout(function () {
                        bindPopup(attempt + 1);
                    }, 200);
                }
                return;
            }

            var popupInstance = window.bootstrap.Modal.getOrCreateInstance(modalElement, {
                backdrop: true,
                keyboard: true
            });

            document.querySelectorAll('[href="#mainpopupform"], [data-bs-target="#mainpopupform"]').forEach(function (trigger) {
                if (trigger.dataset.servicePopupBound === 'true') {
                    return;
                }
                trigger.dataset.servicePopupBound = 'true';
                trigger.addEventListener('click', function (event) {
                    event.preventDefault();
                    popupInstance.show();
                });
            });

            modalElement.addEventListener('hidden.bs.modal', cleanupServicePopupState);
            modalElement.addEventListener('hide.bs.modal', function () {
                window.setTimeout(cleanupServicePopupState, 450);
            });
            modalElement.querySelectorAll('[data-bs-dismiss="modal"], .popup-close').forEach(function (closeButton) {
                closeButton.addEventListener('click', function () {
                    window.setTimeout(cleanupServicePopupState, 450);
                });
            });

            window.setTimeout(function () {
                popupInstance.show();
            }, 20000);
        }

        bindPopup(0);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServicePopup);
    } else {
        initServicePopup();
    }
})();

if (window.AOS && typeof AOS.init === 'function') {
    AOS.init();
}

/* ------ Sticky Headers ------  */


window.addEventListener('scroll', () => {
    let navbar = document.querySelector('nav')
    if (!navbar || navbar.classList.contains('homepage-main-nav')) {
        return;
    }
    if (scrollY > 85) {
        navbar.classList.add('bg-white');
        navbar.classList.add('shadow-sm');
        navbar.classList.remove('pt-4');
    } else {
        navbar.classList.add('pt-4');
        navbar.classList.remove('bg-white');
        navbar.classList.remove('shadow-sm');
    }
})

document.addEventListener('DOMContentLoaded', function () {
    const homepageNav = document.querySelector('.homepage-main-nav');
    if (!homepageNav) {
        return;
    }

    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const servicePages = [
        'services.html',
        'audiobook-service.html',
        'author-website-design.html',
        'book-cover-design.html',
        'book-editing-services.html',
        'book-illustration-services.html',
        'book-marketing-services.html',
        'book-publishing-services.html',
        'ghostwriting-services.html'
    ];
    const activeHref = servicePages.includes(currentPage) ? 'services.html' : currentPage;

    homepageNav.querySelectorAll('.homepage-centered-nav > li > a').forEach(function (link) {
        const href = (link.getAttribute('href') || '').toLowerCase();
        link.removeAttribute('aria-current');
        if (href === activeHref) {
            link.setAttribute('aria-current', 'page');
        }
    });

    function syncHomepageNav() {
        if (window.scrollY > 16) {
            homepageNav.classList.add('is-scrolled');
        } else {
            homepageNav.classList.remove('is-scrolled');
        }
    }

    syncHomepageNav();
    window.addEventListener('scroll', syncHomepageNav, { passive: true });
});

document.addEventListener('DOMContentLoaded', function () {
    const homepageNavs = document.querySelectorAll('.homepage-main-nav');
    if (!homepageNavs.length) {
        return;
    }

    homepageNavs.forEach(function (homepageNav) {
        const navbar = homepageNav.querySelector('.homepage-navbar');
        const navList = homepageNav.querySelector('.homepage-centered-nav');
        if (!navbar || !navList) {
            return;
        }

        homepageNav.classList.add('is-mobile-ready');

        navList.querySelectorAll('li').forEach(function (item) {
            const dropdown = item.querySelector('.homepage-services-dropdown');
            const trigger = item.querySelector(':scope > a');
            if (!dropdown || !trigger) {
                return;
            }

            trigger.classList.add('homepage-services-trigger');
            trigger.setAttribute('role', 'button');
            trigger.setAttribute('aria-haspopup', 'true');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.addEventListener('click', function (event) {
                event.preventDefault();
            });
            item.addEventListener('mouseenter', function () {
                trigger.setAttribute('aria-expanded', 'true');
            });
            item.addEventListener('mouseleave', function () {
                trigger.setAttribute('aria-expanded', 'false');
            });
        });

        let menuButton = navbar.querySelector('.homepage-mobile-menu-toggle');
        if (!menuButton) {
            menuButton = document.createElement('button');
            menuButton.type = 'button';
            menuButton.className = 'homepage-mobile-menu-toggle';
            menuButton.setAttribute('aria-label', 'Open navigation menu');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.innerHTML = '<span></span><span></span><span></span>';
            navbar.appendChild(menuButton);
        }

        let mobileMenu = navbar.querySelector('.homepage-mobile-menu');
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'homepage-mobile-menu';
            mobileMenu.setAttribute('aria-label', 'Mobile navigation');

            Array.from(navList.children).forEach(function (item) {
                if (item.classList.contains('homepage-centered-nav__logo')) {
                    return;
                }

                const link = item.querySelector(':scope > a');
                if (!link) {
                    return;
                }

                const dropdown = item.querySelector('.homepage-services-dropdown');
                if (dropdown) {
                    const group = document.createElement('div');
                    group.className = 'homepage-mobile-menu__group';

                    const parentButton = document.createElement('button');
                    parentButton.type = 'button';
                    parentButton.className = 'homepage-mobile-menu__link homepage-mobile-menu__link--parent';
                    parentButton.textContent = link.textContent.trim() || 'Services';
                    parentButton.setAttribute('aria-expanded', 'false');
                    group.appendChild(parentButton);

                    const subMenu = document.createElement('div');
                    subMenu.className = 'homepage-mobile-menu__submenu';
                    dropdown.querySelectorAll('a').forEach(function (dropdownLink) {
                        const clonedDropdownLink = dropdownLink.cloneNode(true);
                        clonedDropdownLink.classList.add('homepage-mobile-menu__sublink');
                        subMenu.appendChild(clonedDropdownLink);
                    });

                    group.appendChild(subMenu);
                    mobileMenu.appendChild(group);

                    parentButton.addEventListener('click', function (event) {
                        event.preventDefault();
                        event.stopPropagation();

                        const isOpen = group.classList.toggle('is-open');
                        parentButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                    });

                    return;
                }

                const clonedLink = link.cloneNode(true);
                clonedLink.classList.add('homepage-mobile-menu__link');
                mobileMenu.appendChild(clonedLink);
            });

            navbar.appendChild(mobileMenu);
        }

        function closeMobileMenu() {
            homepageNav.classList.remove('is-mobile-open');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Open navigation menu');
            mobileMenu.querySelectorAll('.homepage-mobile-menu__group.is-open').forEach(function (group) {
                group.classList.remove('is-open');
                const parentButton = group.querySelector('.homepage-mobile-menu__link--parent');
                if (parentButton) {
                    parentButton.setAttribute('aria-expanded', 'false');
                }
            });
        }

        menuButton.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = homepageNav.classList.toggle('is-mobile-open');
            menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        });

        mobileMenu.addEventListener('click', function (event) {
            if (event.target.closest('a')) {
                closeMobileMenu();
            }
        });

        document.addEventListener('click', function (event) {
            if (!homepageNav.contains(event.target)) {
                closeMobileMenu();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMobileMenu();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    let rail = document.getElementById('sticky-social-icons-container');
    if (!rail) {
        rail = document.createElement('div');
        rail.id = 'sticky-social-icons-container';
        rail.className = 'design-rounded alignment-left with-animation';
        rail.setAttribute('aria-hidden', 'false');
        document.body.appendChild(rail);
    }

    rail.setAttribute('aria-label', 'Quick contact links');
    rail.classList.remove('hide-in-mobile');
    rail.classList.add('site-contact-rail');
    rail.innerHTML = [
        '<ul>',
        '<li class="site-contact-rail__item site-contact-rail__item--chat"><a href="javascript:void(0)" class="site-contact-rail__link site-contact-rail__link--chat" aria-label="Live Chat"><i class="fas fa-comments" aria-hidden="true"></i><span>Live Chat</span></a></li>',
        '<li class="site-contact-rail__item"><a href="tel:+14076800272" class="site-contact-rail__link" aria-label="Phone"><i class="fas fa-phone" aria-hidden="true"></i><span>Phone</span></a></li>',
        '<li class="site-contact-rail__item"><a href="https://wa.me/19544107418" target="_blank" rel="noopener" class="site-contact-rail__link" aria-label="Whatsapp"><i class="fab fa-whatsapp" aria-hidden="true"></i><span>Whatsapp</span></a></li>',
        '<li class="site-contact-rail__item"><a href="https://www.instagram.com/primebookpublishinglabs?igsh=enMycTZ1c3R1N3h3" target="_blank" rel="noopener" class="site-contact-rail__link" aria-label="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i><span>Instagram</span></a></li>',
        '<li class="site-contact-rail__item"><a href="https://www.facebook.com/share/199TppQJES/?mibextid=wwXIfr" target="_blank" rel="noopener" class="site-contact-rail__link" aria-label="Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i><span>Facebook</span></a></li>',
        '</ul>'
    ].join('');

    const chatLink = rail.querySelector('.site-contact-rail__link--chat');
    if (chatLink) {
        chatLink.addEventListener('click', function (event) {
            event.preventDefault();
            if (typeof window.setButtonURL === 'function') {
                window.setButtonURL();
            } else if (typeof window.toggleChat === 'function') {
                window.toggleChat();
            } else if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
                window.Tawk_API.maximize();
            } else if (window.zE) {
                window.zE('webWidget', 'open');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-homepage-book-portfolio]').forEach(function (slider) {
        const track = slider.querySelector('.homepage-book-portfolio__track');
        if (!track || track.dataset.autoScrollReady === 'true') {
            return;
        }

        Array.prototype.slice.call(track.children).forEach(function (slide) {
            const clone = slide.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        });

        track.dataset.autoScrollReady = 'true';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (currentPage === 'index.html') {
        return;
    }

    const sliders = Array.from(document.querySelectorAll('.homepage-reviews-slider'));
    if (sliders.length === 0) {
        return;
    }

    const sliderGroups = sliders.map(function (slider) {
        return {
            slider: slider,
            cards: Array.from(slider.querySelectorAll('.homepage-review-card'))
        };
    }).filter(function (group) {
        return group.cards.length > 0;
    });

    if (sliderGroups.length === 0) {
        return;
    }

    if (document.body) {
        document.body.classList.add('service-reviews-enhanced');
    }

    function syncCenteredReviewCards() {
        sliderGroups.forEach(function (group) {
            const sliderRect = group.slider.getBoundingClientRect();
            const sliderCenter = sliderRect.left + (sliderRect.width / 2);
            let closestCard = null;
            let closestDistance = Infinity;

            group.cards.forEach(function (card) {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + (cardRect.width / 2);
                const distance = Math.abs(sliderCenter - cardCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCard = card;
                }
            });

            group.cards.forEach(function (card) {
                card.classList.toggle('homepage-review-card--center', card === closestCard);
            });
        });

        window.requestAnimationFrame(syncCenteredReviewCards);
    }

    window.requestAnimationFrame(syncCenteredReviewCards);
});

document.addEventListener('DOMContentLoaded', function () {
    if (document.body && document.body.dataset.sectionButtonColorsReady === 'true') {
        return;
    }

    if (document.body) {
        document.body.dataset.sectionButtonColorsReady = 'true';
    }

    const buttonSelector = [
        'a.main-btn',
        'button.main-btn',
        'a.book-btn',
        'button.book-btn',
        'a.cta-btn-small.main-btn.book-btn',
        'button.cta-btn-small.main-btn.book-btn',
        '.editing-process-cta__button',
        'button.hero-form-submit',
        'button.btn-form',
        'button.submit-button',
        '.submit-button',
        '.btn-hover:not(.popup-close)',
        '.pf-btn',
        'input[type="submit"]'
    ].join(',');

    const ignoredAncestorSelector = [
        '.homepage-main-nav',
        '.site-header-v2',
        '.homepage-book-portfolio__controls',
        '.homepage-book-portfolio__dots',
        '.accordion',
        '.modal',
        '.popup-close',
        '#scrollTopBtn',
        '.site-contact-rail',
        '#sticky-social-icons-container'
    ].join(',');

    function isWhiteLike(rgbValue) {
        const match = (rgbValue || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
        if (!match) {
            return false;
        }

        return Number(match[1]) >= 245 && Number(match[2]) >= 245 && Number(match[3]) >= 245;
    }

    function isCreamLike(rgbValue) {
        const match = (rgbValue || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
        if (!match) {
            return false;
        }

        const red = Number(match[1]);
        const green = Number(match[2]);
        const blue = Number(match[3]);

        return red >= 235 && green >= 225 && blue >= 210;
    }

    function isTransparent(rgbValue) {
        return !rgbValue || rgbValue === 'transparent' || /rgba?\(\s*0,\s*0,\s*0,\s*0\s*\)/i.test(rgbValue);
    }

    function isDarkLike(rgbValue) {
        if (isTransparent(rgbValue)) {
            return false;
        }

        const match = (rgbValue || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
        if (!match) {
            return false;
        }

        const red = Number(match[1]);
        const green = Number(match[2]);
        const blue = Number(match[3]);
        const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

        return brightness < 120;
    }

    function hasWhiteBackgroundImage(backgroundImage) {
        return (backgroundImage || '').indexOf('home-section-white-bg.png') !== -1;
    }

    function hasNonWhiteBackgroundImage(backgroundImage) {
        return Boolean(backgroundImage && backgroundImage !== 'none' && !hasWhiteBackgroundImage(backgroundImage));
    }

    function hasLightClass(element) {
        if (!element || !element.classList) {
            return false;
        }

        return element.classList.contains('bg-light') ||
            element.classList.contains('_bg-light') ||
            element.classList.contains('bg-white') ||
            element.classList.contains('bg-grdient') ||
            element.classList.contains('bg-gredient') ||
            element.classList.contains('bg-gredient-1');
    }

    function hasDarkClass(element) {
        if (!element || !element.classList) {
            return false;
        }

        return element.classList.contains('section-dark') ||
            element.classList.contains('service-hero-bg') ||
            element.classList.contains('homepage-service-stack') ||
            element.classList.contains('homepage-publish-services-section') ||
            element.classList.contains('homepage-platforms-section') ||
            element.classList.contains('homepage-dream-section') ||
            element.classList.contains('pricing-section--editing-process') ||
            element.classList.contains('service-workflow-section');
    }

    function isLightShowcaseSection(element) {
        if (!element || !element.classList) {
            return false;
        }

        return element.classList.contains('complete-Solution-section') &&
            (element.classList.contains('bg-grdient') ||
                element.classList.contains('bg-light') ||
                element.classList.contains('_bg-light'));
    }

    function getInlineBackgroundIntent(element) {
        const styleText = ((element && element.getAttribute('style')) || '').toLowerCase();
        if (!styleText) {
            return null;
        }

        if (styleText.indexOf('home-section-white-bg.png') !== -1 ||
            styleText.indexOf('var(--theme-cream') !== -1 ||
            styleText.indexOf('#f8f4ee') !== -1 ||
            styleText.indexOf('rgb(248, 244, 238)') !== -1 ||
            styleText.indexOf('background-color: white') !== -1 ||
            styleText.indexOf('background-color: #fff') !== -1 ||
            styleText.indexOf('background: #fff') !== -1) {
            return 'light';
        }

        if (styleText.indexOf('url(') !== -1 ||
            styleText.indexOf('#061c45') !== -1 ||
            styleText.indexOf('#081d33') !== -1 ||
            styleText.indexOf('#0b2d63') !== -1 ||
            styleText.indexOf('var(--theme-navy') !== -1) {
            return 'dark';
        }

        return null;
    }

    function findColorSection(button) {
        let node = button.parentElement;

        while (node && node !== document.body) {
            const styles = window.getComputedStyle(node);
            const hasBackgroundImage = styles.backgroundImage && styles.backgroundImage !== 'none';
            const hasTransparentBackground = isTransparent(styles.backgroundColor) && !hasBackgroundImage;
            const hasLightBackground = isWhiteLike(styles.backgroundColor) || isCreamLike(styles.backgroundColor);
            const hasDarkBackground = isDarkLike(styles.backgroundColor);
            const inlineIntent = getInlineBackgroundIntent(node);

            if (inlineIntent === 'light') {
                return {
                    useNavy: true
                };
            }

            if (inlineIntent === 'dark') {
                return {
                    useNavy: false
                };
            }

            if (hasTransparentBackground) {
                node = node.parentElement;
                continue;
            }

            if (isLightShowcaseSection(node)) {
                return {
                    useNavy: true
                };
            }

            if (hasNonWhiteBackgroundImage(styles.backgroundImage) || hasDarkClass(node)) {
                return {
                    useNavy: false
                };
            }

            if (hasWhiteBackgroundImage(styles.backgroundImage) || hasLightClass(node) || hasLightBackground) {
                return {
                    useNavy: true
                };
            }

            if (hasDarkBackground) {
                return {
                    useNavy: false
                };
            }

            if (hasBackgroundImage) {
                return {
                    useNavy: false
                };
            }

            if (!isTransparent(styles.backgroundColor)) {
                return {
                    useNavy: false
                };
            }

            node = node.parentElement;
        }

        return {
            useNavy: isWhiteLike(window.getComputedStyle(document.body).backgroundColor) || isCreamLike(window.getComputedStyle(document.body).backgroundColor)
        };
    }

    function applySectionButtonColors() {
        document.querySelectorAll(buttonSelector).forEach(function (button) {
            if (button.closest(ignoredAncestorSelector)) {
                return;
            }

            const colorSection = findColorSection(button);
            const useNavy = colorSection.useNavy;
            const background = useNavy ? '#061C45' : 'var(--site-metal-gold-gradient, linear-gradient(180deg, #F9EC79 0%, #F4D95E 18%, #DDB447 40%, #C9962D 60%, #AE7D1E 80%, #7D5510 100%))';
            const backgroundImage = useNavy ? 'none' : 'var(--site-metal-gold-gradient, linear-gradient(180deg, #F9EC79 0%, #F4D95E 18%, #DDB447 40%, #C9962D 60%, #AE7D1E 80%, #7D5510 100%))';
            const border = useNavy ? '#061C45' : 'rgba(125, 85, 16, 0.5)';
            const color = useNavy ? '#ffffff' : '#0B2742';

            button.style.setProperty('background', background, 'important');
            button.style.setProperty('background-color', useNavy ? '#061C45' : '#D4A55A', 'important');
            button.style.setProperty('background-image', backgroundImage, 'important');
            button.style.setProperty('border-color', border, 'important');
            button.style.setProperty('color', color, 'important');
            button.style.setProperty('-webkit-text-fill-color', color, 'important');
            button.style.setProperty('text-shadow', 'none', 'important');
            button.style.setProperty('transition', 'transform 220ms ease, box-shadow 220ms ease', 'important');

            button.querySelectorAll('*').forEach(function (child) {
                child.style.setProperty('color', color, 'important');
                child.style.setProperty('-webkit-text-fill-color', color, 'important');
            });
        });
    }

    applySectionButtonColors();
    window.addEventListener('load', applySectionButtonColors);
    setTimeout(applySectionButtonColors, 500);
    setTimeout(applySectionButtonColors, 1500);
});


/* ------ Slick Sliders ------  */


 $(document).on('ready', function() {
      $(".regular").slick({
        dots: false,
        loop: true,
        autoplay:true,
        autoplaySpeed:4000,
        centerMode: true,
        centerPadding: '0px',

        slidesToShow: 5,
        slidesToScroll: 1,
        arrows:true,
        nav:true,
        responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
      });
});

$(document).on('ready', function() {
      $(".regular-portfolio").slick({
        dots: false,
        loop: true,
        autoplay:true,
        autoplaySpeed:3000,
        centerMode: false,
        centerPadding: '60px',

        slidesToShow: 6,
        slidesToScroll: 1,
        arrows:true,
        nav:true,
        responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
      });
});


$(document).on('ready', function() {
  $(".regular-1").not("#reviews-container .regular-1").slick({
        dots: true,
        infinite: true,
        autoplay:true,
        autoplaySpeed:3000,
        centerMode: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        nav:true
      });
});


/* ------ Typewriter Editor ------  */


$(document).ready(function($) { 
 
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap-banner-text">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 10; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = `.typewrite {
  border-right: .1em solid currentColor;
  padding: 0 3px;
  animation: blink-caret 600ms step-end infinite
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: currentColor }
}`;
        document.body.appendChild(css);
    };
      
    });


/* ------ Search Overlay  ------  */


function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}


/* ------ Navigation Menu Active  ------  */


$(document).on('ready', function() {
  var urlact = window.location;
  $('.navbar-nav li > a[href="' + urlact + '"]').parent().addClass('text-primary fw-bold');
  $('.navbar-nav li > a').filter(function () {
          return this.href == urlact;
  }).addClass('text-primary fw-bold').addClass('text-text-primary fw-bold');
});

 
/* ------ For Nav  ------  */



let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .fa-bars");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
if (menuOpenBtn && navLinks) {
    menuOpenBtn.onclick = function() {
        navLinks.style.left = "0";
    }
}
if (menuCloseBtn && navLinks) {
    menuCloseBtn.onclick = function() {
        navLinks.style.left = "-100%";
    }
}


let htmlcssArrow = document.querySelector(".htmlcss-arrow");
if (htmlcssArrow && navLinks) {
    htmlcssArrow.onclick = function() {
        navLinks.classList.toggle("show1");
    }
}

// Search Function


$(document).ready(function () {
    function fetchData() {
        var s = $("#search-box").val();
        if (s == '') { 
            $('#dropdown').css('display', 'none');
        }
        $.post("backend/search-api/autocomplete.html",
            {
                s: s
            },
            function (data, status) {
                if (data != "not found") {
                    $('#dropdown').css('display', 'block');
                    $('#dropdown').html(data);
                }
            });
    }
    $('#search-box').on('input', fetchData);
    $("body").on('click', () => {
        $('#dropdown').css('display', 'none');
    });
    $('#search-box').on('click', fetchData);
});

//  CTA Form

$(document).ready(function () {

    $(".cta_for_emb_form").click(function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $("#after_cta").offset().top -50
      }, 1000);
    });
});




// site counter 

$(document).ready(function () {

$('.count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
});

// video caousel 


if (typeof GLightbox === 'function') {
var lightbox = GLightbox();
    lightbox.on('open', (target) => {
        console.log('lightbox opened');
    });
    var lightboxDescription = GLightbox({
        selector: '.glightbox2'
    });
    var lightboxVideo = GLightbox({
        selector: '.glightbox3'
    });
    lightboxVideo.on('slide_changed', ({ prev, current }) => {
        console.log('Prev slide', prev);
        console.log('Current slide', current);

        const { slideIndex, slideNode, slideConfig, player } = current;

        if (player) {
            if (!player.ready) {
                // If player is not ready
                player.on('ready', (event) => {
                    // Do something when video is ready
                });
            }

            player.on('play', (event) => {
                console.log('Started play');
            });

            player.on('volumechange', (event) => {
                console.log('Volume change');
            });

            player.on('ended', (event) => {
                console.log('Video ended');
            });
        }
    });

    var lightboxInlineIframe = GLightbox({
        selector: '.glightbox4'
    });
}

// anas js    

function myFunction1() {
  var dots = document.getElementById("dots-1");
  var moreText = document.getElementById("more-1");
  var btnText = document.getElementById("myBtn-1");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

document.addEventListener('DOMContentLoaded', function () {
    var currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (currentPage === 'index.html') {
        return;
    }
    var servicePages = [
        'audiobook-service.html',
        'author-website-design.html',
        'book-cover-design.html',
        'book-editing-services.html',
        'book-illustration-services.html',
        'book-marketing-services.html',
        'book-publishing-services.html',
        'ghostwriting-services.html',
        'services.html'
    ];
    if (servicePages.indexOf(currentPage) !== -1) {
        return;
    }
    var popupSessionKey = 'offerShown:' + currentPage;

    function buildSitewidePopupInnerMarkup() {
        return [
            '<div class="modal-dialog modal-dialog-centered modal-xl">',
            '  <div class="modal-content">',
            '    <div class="offer-popup-box">',
            '      <div class="offer-left">',
            '        <div class="offer-left__content">',
            '          <div class="offer-left__eyebrow">',
            '            <img src="assets/img/popup-homepage/element-4.png" alt="Prime popup icon">',
            '            <span>Prime Book Publishing Labs</span>',
            '          </div>',
            '          <div class="offer-left__divider" aria-hidden="true"></div>',
            '          <h2 class="offer-left__title">Publish Your<br><span>Book.</span><br>Build Your Legacy.</h2>',
            '          <p class="offer-left__copy">Professional publishing support crafted for authors who want a smoother path from manuscript to market-ready book.</p>',
            '          <div class="offer-left__note">Professional publishing.<br>Wider reach.<br>A stronger author presence.</div>',
            '        </div>',
            '        <div class="offer-left__art">',
            '          <img src="assets/img/popup-homepage/element-5a.png" alt="Prime Book Publishing Labs popup artwork">',
            '        </div>',
            '        <div class="offer-left__features" aria-label="Popup benefits">',
            '          <div class="offer-left__feature"><img src="assets/img/popup-homepage/element-1.png" alt=""><span>Book Publishing</span></div>',
            '          <div class="offer-left__feature"><img src="assets/img/popup-homepage/element-2.png" alt=""><span>Global Reach</span></div>',
            '          <div class="offer-left__feature"><img src="assets/img/popup-homepage/element-3.png" alt=""><span>Premium Results</span></div>',
            '        </div>',
            '      </div>',
            '      <div class="offer-right">',
            '        <button class="popup-close" id="offerClose" type="button" data-bs-dismiss="modal" aria-label="Close">&times;</button>',
            '        <div class="offer-head">',
            '          <div class="offer-head__badge"><img src="assets/img/prime-logo1.png" alt="Prime Book Publishing Labs"></div>',
            '          <div class="offer-head__copy">',
            '            <p class="offer-tagline">Start Your Publishing Journey</p>',
            '            <h2>Become A Published Author</h2>',
            '            <p class="offer-sub">Fill in the details below and our team will help you move your book project forward with clarity and confidence.</p>',
            '          </div>',
            '        </div>',
            '        <form class="main-form" id="popupMainForm" action="https://formspree.io/f/xgojlbdl" method="POST">',
            '          <input type="hidden" name="type" value="formlongsiteMain">',
            '          <div class="pf-row pf-row--two-col">',
            '            <div class="pf-col">',
            '              <label class="pf-label" for="formname">Full Name</label>',
            '              <div class="form-group"><input type="text" name="name" class="form-control pf-input" id="formname" placeholder="Your Name" required value=""></div>',
            '              <p class="d-none error" data-field="name">Name field is required</p>',
            '            </div>',
            '            <div class="pf-col">',
            '              <label class="pf-label" for="formcw">Phone Number</label>',
            '              <div class="form-group"><input type="tel" name="phone" class="form-control pf-input" id="formcw" inputmode="tel" placeholder="Phone Number" required value=""></div>',
            '              <p class="d-none error" data-field="phone">Phone field is required</p>',
            '            </div>',
            '          </div>',
            '          <div class="pf-row pf-row--two-col">',
            '            <div class="pf-col">',
            '              <label class="pf-label" for="formemail">Email Address</label>',
            '              <div class="form-group"><input type="email" name="email" pattern="[^ @]*@[^ @]*" class="form-control pf-input" id="formemail" placeholder="Email" required value=""></div>',
            '              <p class="d-none error" data-field="email">Email field is required</p>',
            '            </div>',
            '            <div class="pf-col">',
            '              <label class="pf-label" for="popup-manuscript-ready">Manuscript Status</label>',
            '              <div class="form-group"><select class="custom-select-arrow w-100 pf-input pf-select form-control" name="manuscript_ready" id="popup-manuscript-ready" required><option value="" disabled selected>Do you have a manuscript ready?</option><option value="yes">Yes</option><option value="no">No</option><option value="unsure">In Progress</option></select></div>',
            '              <p class="d-none error" data-field="manuscript_ready">Manuscript readiness field is required</p>',
            '            </div>',
            '          </div>',
            '          <div class="pf-row">',
            '            <div class="pf-col">',
            '              <label class="pf-label" for="popup-published-before">Published Before?</label>',
            '              <div class="form-group"><select class="custom-select-arrow w-100 pf-input pf-select form-control" name="published_before" id="popup-published-before" required><option value="" disabled selected>Have you published before?</option><option value="yes">Yes</option><option value="no">No</option><option value="unsure">In Progress</option></select></div>',
            '              <p class="d-none error" data-field="published_before">Publishing history field is required</p>',
            '            </div>',
            '            <div class="pf-col">',
            '              <label class="pf-label" for="popup-book-type">Book Type</label>',
            '              <div class="form-group"><select class="custom-select-arrow w-100 pf-input pf-select form-control" name="book_type" id="popup-book-type" required><option value="" disabled selected>What type of book do you plan on publishing?</option><option value="fiction">Fiction</option><option value="non-fiction">Non-Fiction</option><option value="memoir">Academic</option><option value="other">Other</option></select></div>',
            '              <p class="d-none error" data-field="book_type">Book type field is required</p>',
            '            </div>',
            '          </div>',
            '          <div class="pf-row">',
            '            <div class="pf-col pf-full">',
            '              <label class="pf-label" for="popup-services-category">Services Needed</label>',
            '              <div class="form-group"><select class="custom-select-arrow w-100 pf-input pf-select form-control" name="services_category" id="popup-services-category" required><option value="" disabled selected>Pick Services For Your Book</option><option value="ghostwriting">Self Publishing</option><option value="editing">Proofreading</option><option value="cover-design">Cover Design</option><option value="marketing">Book Marketing</option><option value="audiobook">Audiobook</option><option value="editing-service">Editing</option><option value="formatting">Formatting</option><option value="illustrations">Illustrations</option><option value="printing">Book Printing</option></select></div>',
            '              <p class="d-none error" data-field="services_category">Service field is required</p>',
            '            </div>',
            '          </div>',
            '          <div class="pf-row">',
            '            <div class="pf-col pf-full"><div class="form-group pt-40"><button type="submit" name="submit_contact" class="btn-form btn-hover cta-btn-small w-100 pf-btn">Submit Your Form</button></div></div>',
            '          </div>',
            '        </form>',
            '      </div>',
            '    </div>',
            '  </div>',
            '</div>'
        ].join('');
    }

    var modalElement = document.getElementById('mainpopupform');

    if (!modalElement) {
        modalElement = document.createElement('div');
        modalElement.id = 'mainpopupform';
        document.body.appendChild(modalElement);
    }

    modalElement.className = 'modal fade sitewide-offer-popup';
    modalElement.setAttribute('tabindex', '-1');
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.innerHTML = buildSitewidePopupInnerMarkup();

    if (typeof bootstrap === 'undefined') {
        return;
    }

    var popupInstance = new bootstrap.Modal(modalElement, {
        backdrop: true,
        keyboard: true
    });

    document.querySelectorAll('[href="#mainpopupform"], [data-bs-target="#mainpopupform"]').forEach(function (trigger) {
        trigger.addEventListener('click', function (event) {
            event.preventDefault();
            popupInstance.show();
        });
    });

    if (!sessionStorage.getItem(popupSessionKey)) {
        window.setTimeout(function () {
            popupInstance.show();
            sessionStorage.setItem(popupSessionKey, '1');
        }, 20000);
    }
});
