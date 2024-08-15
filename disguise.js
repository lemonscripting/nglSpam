//hook to only allow /api/submit and not collect data
(function() {
    const originalAjax = $.ajax;
    $.ajax = function(options) {
        const apiBlockPattern = /^\/api\/(?!submit).*$/;
        if (apiBlockPattern.test(options.url)) {
            console.log(`Request to ${options.url} has been intercepted and stopped.`);
            return;
        }
        return originalAjax.apply(this, arguments);
    };
})();

//hook to reload src to implement changes
(function() {
    function removeScript(src) {
        const scripts = document.querySelectorAll(`script[src="${src}"]`);
        scripts.forEach(script => {
            script.parentNode.removeChild(script);
        });
    }
    function loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.async = true;
        document.head.appendChild(script);
    }
    const scriptUrl = '/scripts/main.js?v=59';
    removeScript(scriptUrl);
    const cacheBustedUrl = `${scriptUrl}&cb=${new Date().getTime()}`;
    loadScript(cacheBustedUrl);
})();


