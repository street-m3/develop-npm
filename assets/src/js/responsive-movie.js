window.addEventListener('load', () => {
    new ResponsiveMovies();
});
class ResponsiveMovies {
    constructor() {
        this.defaultMediaQuery = {
            mobile: matchMedia("(max-width: 575px)"),
            tablet: matchMedia("(min-width: 576px)"),
            desktop:matchMedia("(min-width: 992px)"),
        };
        
        this.rootMovie = document.querySelectorAll('.js-responsiveMovies');
        this.init();
    }

    init() {
        if(!this.rootMovie) return;
        for (let i = 0; i < this.rootMovie.length; i++) {
            let sourceArray = this.rootMovie[i].querySelectorAll('source');
            this.responsiveMovieController(sourceArray);
        }
    }

    responsiveMovieController(sources) {
        for (let i = 0; i < sources.length; i++) {
            let source = sources[i];
            const devicesize = source.dataset.media;
            const mediapath = source.dataset.src;
            const matchMq = this.defaultMediaQuery[source.dataset.media];

            if (!(devicesize && mediapath && matchMq)) continue;
            if (!(matchMq.matches)) continue;

            const srcSelector = document.createElement('source');
            srcSelector.src = source.dataset.src;
            source.parentElement.appendChild(srcSelector);
        }
    }
}