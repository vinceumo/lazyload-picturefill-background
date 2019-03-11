export default class lazyloadPicturefillBackground {
  constructor(options) {
    this.options = lazyloadPicturefillBackground.updateDefaultSettings(options);
    this.init();
  }

  static updateDefaultSettings(userSettings) {
    const defaultSettings = {
      pictureFillBackgroundSelector: ".picturefill-background",
      lazySelector: "is-lazy",
      pictureFillBackgroundSourceSelector: ".picturefill-background-source"
    };

    for (const attrname in userSettings) {
      defaultSettings[attrname] = userSettings[attrname];
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

          for (let match of matches) {
            const mq = window.matchMedia(match.media);

            if (window.matchMedia && mq.matches) {
              mqMatches.push(match.src);
            }

            mq.addListener(() => {
              if (mq.matches) {
                const exp = new RegExp(this.escapeRegExp(match.src));
                if (!exp.test(el.style.backgroundImage)) {
                  el.style.backgroundImage = "url('" + match.src + "')";
                }
              }
            });
          }

          if (el.classList.contains(this.options.lazySelector.substring(1))) {
            createObserver(el, mqMatches);
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

  createObserver(pictureFillBackgroundSelector, mqMatches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.classList.remove(this.options.lazySelector.substring(1));
          this.lazyBackgroundImageObserver.unobserve(lazyImage);

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
