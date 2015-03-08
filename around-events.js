(function() {
    Reveal.slideHandlers = {};

    Reveal.addSlideHandler = function(name, routine) {
        Reveal.slideHandlers[name] = routine;
    };

    Reveal.removeSlideHandler = function(name) {
        if (Reveal.slideHandlers[name])
            Reveal.slideHandlers[name] = null;
    };

    Reveal.callHandlers = function(handlers, args) {
        handlers.forEach(function(handlerName) {
            Reveal.slideHandlers[handlerName] && Reveal.slideHandlers[handlerName](args);
        });
    };

    var onSlideChanged = function(event) {
        if (Reveal.onNextSlide) {
            Reveal.callHandlers(Reveal.onNextSlide.handlers, Reveal.onNextSlide.slide);
            Reveal.onNextSlide = null;
        }

        var preHandlers = event.currentSlide.getAttribute('data-before'),
            postHandlers = event.currentSlide.getAttribute('data-after');

        preHandlers = preHandlers ? preHandlers.split(' ') : [];
        postHandlers = postHandlers ? postHandlers.split(' ') : [];

        Reveal.callHandlers(preHandlers, event.currentSlide);

        Reveal.onNextSlide = {
            slide: event.currentSlide,
            handlers: postHandlers
        };
    };

    Reveal.addEventListener('slidechanged', onSlideChanged);
    Reveal.addEventListener('ready', onSlideChanged);
})();