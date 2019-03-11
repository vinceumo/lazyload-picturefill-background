function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var lazyloadPicturefillBackground =
  /*#__PURE__*/
  (function() {
    function lazyloadPicturefillBackground(options) {
      _classCallCheck(this, lazyloadPicturefillBackground);

      this.options = lazyloadPicturefillBackground.updateDefaultSettings(
        options
      );
      this.init();
    }

    _createClass(
      lazyloadPicturefillBackground,
      [
        {
          key: "init",
          value: function init() {
            var _this = this;

            if (this.options.pictureFillBackgroundSelector.length) {
              Array.prototype.forEach.call(
                this.options.pictureFillBackgroundSelector,
                function(el) {
                  var matches = [];
                  var mqMatches = [];
                  var sources = el.querySelectorAll(
                    _this.options.pictureFillBackgroundSourceSelector
                  );
                  matches = _this.getSources(sources);
                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    var _loop = function _loop() {
                      var match = _step.value;
                      var mq = window.matchMedia(match.media);

                      if (window.matchMedia && mq.matches) {
                        mqMatches.push(match.src);
                      }

                      mq.addListener(function() {
                        if (mq.matches) {
                          var exp = new RegExp(_this.escapeRegExp(match.src));

                          if (!exp.test(el.style.backgroundImage)) {
                            el.style.backgroundImage =
                              "url('" + match.src + "')";
                          }
                        }
                      });
                    };

                    for (
                      var _iterator = matches[Symbol.iterator](), _step;
                      !(_iteratorNormalCompletion = (_step = _iterator.next())
                        .done);
                      _iteratorNormalCompletion = true
                    ) {
                      _loop();
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (
                        !_iteratorNormalCompletion &&
                        _iterator.return != null
                      ) {
                        _iterator.return();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }

                  if (
                    el.classList.contains(
                      _this.options.lazySelector.substring(1)
                    )
                  ) {
                    createObserver(el, mqMatches);
                  } else {
                    var src = mqMatches.length
                      ? mqMatches.pop()
                      : matches[0].src;
                    el.style.backgroundImage = "url('" + src + "')";
                  }
                }
              );
            }
          }
        },
        {
          key: "getSources",
          value: function getSources(sourcesEls) {
            var matches = [];
            Array.prototype.forEach.call(sourcesEls, function(source) {
              var sourceObj = {
                src: source.getAttribute("data-src"),
                media: source.getAttribute("data-media")
              };
              matches.push(sourceObj);
            });
            return matches;
          }
        },
        {
          key: "createObserver",
          value: function createObserver(
            pictureFillBackgroundSelector,
            mqMatches
          ) {
            var observer = new IntersectionObserver(function(entries) {
              entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                  var lazyImage = entry.target;
                  lazyImage.classList.remove(
                    this.options.lazySelector.substring(1)
                  );
                  this.lazyBackgroundImageObserver.unobserve(lazyImage);
                  var src = mqMatches.length ? mqMatches.pop() : matches[0].src;
                  lazyImage.style.backgroundImage = "url('" + src + "')";
                }
              });
            });
            observer.observe(pictureFillBackgroundSelector);
          }
        },
        {
          key: "escapeRegExp",
          value: function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          }
        }
      ],
      [
        {
          key: "updateDefaultSettings",
          value: function updateDefaultSettings(userSettings) {
            var defaultSettings = {
              pictureFillBackgroundSelector: ".picturefill-background",
              lazySelector: "is-lazy",
              pictureFillBackgroundSourceSelector:
                ".picturefill-background-source"
            };

            for (var attrname in userSettings) {
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
        }
      ]
    );

    return lazyloadPicturefillBackground;
  })();
