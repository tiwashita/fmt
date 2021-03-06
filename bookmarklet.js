(function(window) {

    if (window.MetadataTool) {
        runMetadataTool();
        return;
    }

    function runMetadataTool() {
        if (window.sforce) {
            MetadataTool.$.trigger('run');
        } else {
            setTimeout(runMetadataTool, 1000);
        }
    }

    var urls = [
        'https://rawgithub.com/tiwashita/fmt/master/lib/jquery-1.8.3.min.js',
        'https://rawgithub.com/tiwashita/fmt/master/lib/JSZip/jszip.js',
        'https://rawgithub.com/tiwashita/fmt/master/lib/JSZip/jszip-load.js',
        'https://rawgithub.com/tiwashita/fmt/master/lib/JSZip/jszip-inflate.js',
        'https://rawgithub.com/tiwashita/fmt/master/lib/JSZip/jszip-deflate.js',
        'https://rawgithub.com/tiwashita/fmt/master/lib/Hogan.js/hogan-2.0.0.min.js',
        'https://rawgithub.com/tiwashita/fmt/master/forcedotcommetadatatool.user.js'
    ];

    var next = runMetadataTool;
    var loaders = urls.reverse().map(function(url) {
        var loader = function() {
            var el = document.createElement('script');
            el.src = url;
            el.onload = loader.next;
            document.head.appendChild(el);
        };
        loader.next = next;
        next = loader;
        return loader;
    });
    loaders[loaders.length - 1]();


    window.GM_getValue = function() {
        return null;
    };
    window.GM_setValue = function() {
        return null;
    };
    window.GM_addStyle = function(css) {
        var el = document.createElement('style');
        el.type = 'text/css';
        el.innerHTML = css;
        document.head.appendChild(el);
    };

}(this));