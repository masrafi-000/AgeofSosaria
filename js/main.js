$(document).ready(function() {
    // Mobile Menu Elements
    const $mobileMenuBtn = $('#mobile-menu-btn');
    const $closeMenuBtn = $('#close-menu-btn');
    const $mobileMenu = $('#mobile-menu');
    const $mobileMenuOverlay = $('#mobile-menu-overlay');
    const $body = $('body');

    // Toggle Menu Function
    function toggleMenu(forceClose = false) {
        const isOpen = !$mobileMenu.hasClass('translate-x-full');
        
        if (isOpen || forceClose) {
            // Close
            $mobileMenu.addClass('translate-x-full');
            $mobileMenuOverlay.addClass('hidden').removeClass('opacity-100');
            $body.removeClass('overflow-hidden');
        } else {
            // Open
            $mobileMenu.removeClass('translate-x-full');
            $mobileMenuOverlay.removeClass('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                $mobileMenuOverlay.addClass('opacity-100');
            }, 10);
            $body.addClass('overflow-hidden');
        }
    }

    // Event Listeners
    $mobileMenuBtn.on('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    $closeMenuBtn.on('click', function(e) {
        e.stopPropagation();
        toggleMenu(true); // Force close
    });

    $mobileMenuOverlay.on('click', function() {
        toggleMenu(true);
    });

    // Active State Handler based on URL
    function updateActiveState() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        $('.nav-link').removeClass('text-sosaria-gold italic translate-x-2');
        
        // Find links corresponding to current page active state
        $(`.nav-link[href="${currentPath}"]`).addClass('text-sosaria-gold italic translate-x-2');
    }
    
    // Run on load
    updateActiveState();

    // Close menu on link click
    $('.nav-link').on('click', function() {
        // If mobile menu is open, close it
        if (!$mobileMenu.hasClass('translate-x-full')) {
            toggleMenu(true);
        }
    });

    // Close menu when clicking outside (extra safety)
    $(document).on('click', function(e) {
        if (!$mobileMenu.is(e.target) && $mobileMenu.has(e.target).length === 0 && !$mobileMenuBtn.is(e.target) && $mobileMenuBtn.has(e.target).length === 0) {
            if (!$mobileMenu.hasClass('translate-x-full')) {
                toggleMenu(true);
            }
        }
    });
});
