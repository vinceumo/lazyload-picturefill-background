export default class lazyloadPicturefillBackground {
  constructor(options) {
    this.options = lazyloadPicturefillBackground.updateDefaultSettings(options);
    this.init();
  }

  static updateDefaultSettings(userSettings) {
    const defaultSettings = {
      pictureFillBackgroundSelector: ".picturefill-background",
      lazySelector: ".is-lazy",
      pictureFillBackgroundSourceSelector: ".picturefill-background-source"
    };

    for (const attrName in userSettings) {
      defaultSettings[attrName] = userSettings[attrName];
    }

    defaultSettings.pictureFillBackgroundSelector =
      typeof defaultSettings.pictureFillBackgroundSelector === "string"
        ? document.querySelectorAll(
            defaultSettings.pictureFillBackgroundSelector
          )
        : defaultSettings.pictureFillBackgroundSelector;

    return defaultSettings;
  }

  init() {
    if (this.options.pictureFillBackgroundSelector.length) {
      Array.prototype.forEach.call(
        this.options.pictureFillBackgroundSelector,
        el => {
          let matches = [];
          let mqMatches = [];
          const sources = el.querySelectorAll(
            this.options.pictureFillBackgroundSourceSelector
          );

          matches = this.getSources(sources);

          for (let i = 0; i < matches.length; i++) {
            const mq = window.matchMedia(matches[i].media);

            if (window.matchMedia && mq.matches) {
              mqMatches.push(matches[i].src);
            }

            mq.addListener(() => {
              if (mq.matches) {
                const exp = new RegExp(this.escapeRegExp(matches[i].src));
                if (!exp.test(el.style.backgroundImage)) {
                  el.style.backgroundImage = "url('" + matches[i].src + "')";
                }
              } else {
                const exp = new RegExp(this.escapeRegExp(matches[i - 1].src));
                if (!exp.test(el.style.backgroundImage)) {
                  el.style.backgroundImage =
                    "url('" + matches[i - 1].src + "')";
                }
              }
            });
          }

          if (el.classList.contains(this.options.lazySelector.substring(1))) {
            this.createObserver(el, mqMatches, matches);
          } else {
            let src = mqMatches.length ? mqMatches.pop() : matches[0].src;
            el.style.backgroundImage = "url('" + src + "')";
          }
        }
      );
    }
  }

  getSources(sourcesEls) {
    let matches = [];

    Array.prototype.forEach.call(sourcesEls, source => {
      const sourceObj = {
        src: source.getAttribute("data-src"),
        media: source.getAttribute("data-media")
      };

      matches.push(sourceObj);
    });

    return matches;
  }

  createObserver(pictureFillBackgroundSelector, mqMatches, matches) {
    const that = this;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.classList.remove(that.options.lazySelector.substring(1));
          observer.unobserve(lazyImage);

          let src = mqMatches.length ? mqMatches.pop() : matches[0].src;
          lazyImage.style.backgroundImage = "url('" + src + "')";
        }
      });
    });
    observer.observe(pictureFillBackgroundSelector);
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}
