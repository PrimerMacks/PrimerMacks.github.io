/**
 * @function      Include
 * @description   Includes an external scripts to the page
 * @param         {string} scriptUrl
 */
function include(scriptUrl) {
    document.write('<script src="' + scriptUrl + '"></script>');
}


/**
 * @function      Include
 * @description   Lazy script initialization
 */
function lazyInit(element, func) {
    var $win = jQuery(window),
        wh = $win.height();

    $win.on('load scroll', function () {
        var st = $(this).scrollTop();
        if (!element.hasClass('lazy-loaded')) {
            var et = element.offset().top,
                eb = element.offset().top + element.outerHeight();
            if (st + wh > et - 100 && st < eb + 100) {
                func.call();
                element.addClass('lazy-loaded');
            }
        }
    });
}

/**
 * @function      isIE
 * @description   checks if browser is an IE
 * @returns       {number} IE Version
 */
function isIE() {
    var myNav = navigator.userAgent.toLowerCase(),
        msie = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;

    if (!msie) {
        return (myNav.indexOf('trident') != -1) ? 11 : ( (myNav.indexOf('edge') != -1) ? 12 : false);
    }

    return msie;
};

/**
 * @module       IE Fall&Polyfill
 * @description  Adds some loosing functionality to old IE browsers
 */
;
(function ($) {
    var ieVersion = isIE();

    if (ieVersion === 12) {
        $('html').addClass('ie-edge');
    }

    if (ieVersion === 11) {
        $('html').addClass('ie-11');
    }

    if (ieVersion && ieVersion < 11) {
        $('html').addClass('lt-ie11');
        $(document).ready(function () {
            PointerEventsPolyfill.initialize({});
        });
    }

    if (ieVersion && ieVersion < 10) {
        $('html').addClass('lt-ie10');
    }
})(jQuery);


/**
 * @module       Copyright
 * @description  Evaluates the copyright year
 */
;
(function ($) {
    $(document).ready(function () {
        $("#copyright-year").text((new Date).getFullYear());
    });
})(jQuery);


/**
 * @module       WOW Animation
 * @description  Enables scroll animation on the page
 */
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop') && o.hasClass("wow-animation") && $(".wow").length) {
        $(document).ready(function () {
            new WOW().init();
        });
    }
})(jQuery);


/**
 * @module       ToTop
 * @description  Enables ToTop Plugin
 */
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {

        $(document).ready(function () {
            $().UItoTop({
                easingType: 'easeOutQuart',
                containerClass: 'ui-to-top fa fa-angle-up'
            });
        });
    }
})(jQuery);

/**
 * @module       RD Mailform
 * @description  Enables RD Mailform Plugin
 */
;
(function ($) {
    var o = $('.rd-mailform');
    if (o.length > 0) {
        $(document).ready(function () {
            var o = $('.rd-mailform');

            if (o.length) {
                o.rdMailForm({
                    validator: {
                        'constraints': {
                            '@LettersOnly': {
                                message: 'Please use only letters.'
                            },
                            '@NumbersOnly': {
                                message: 'Please use only numbers.'
                            },
                            '@NotEmpty': {
                                message: 'This field should not be empty.'
                            },
                            '@Email': {
                                message: 'Enter valid e-mail address.'
                            },
                            '@Phone': {
                                message: 'Enter valid phone number.'
                            },
                            '@Date': {
                                message: 'Use MM/DD/YYYY format.'
                            },
                            '@SelectRequired': {
                                message: 'Please choose an option.'
                            }
                        }
                    }
                }, {
                    'MF000': 'Sent',
                    'MF001': 'Recipients are not set.',
                    'MF002': 'Form will not work locally.',
                    'MF003': 'Please define email field in your form.',
                    'MF004': 'Please define the type of your form.',
                    'MF254': 'Something went wrong with PHPMailer.',
                    'MF255': 'There was an error submitting the form.'
                });
            }
        });
    }
})(jQuery);

/**
 * @module       RD Google Map
 * @description  Enables RD Google Map Plugin
 */
;
(function ($) {
    var o = $('#google-map');

    if (o.length) {
        include('//maps.google.com/maps/api/js');
        $(document).ready(function () {
            var head = document.getElementsByTagName('head')[0],
                insertBefore = head.insertBefore;

            head.insertBefore = function (newElement, referenceElement) {
                if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') != -1 || newElement.innerHTML.indexOf('gm-style') != -1) {
                    return;
                }
                insertBefore.call(head, newElement, referenceElement);
            };

            lazyInit(o, function () {
                o.googleMap({
                    styles: [{
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
                    }, {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
                    }, {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
                    }, {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
                    }, {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [{"color": "#dedede"}, {"lightness": 21}]
                    }, {
                        "elementType": "labels.text.stroke",
                        "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
                    }, {
                        "elementType": "labels.text.fill",
                        "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
                    }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
                    }]
                });
            });
        });
    }
})(jQuery);

/**
 * @module       RD Navbar
 * @description  Enables RD Navbar Plugin
 */
;
(function ($) {
    var o = $('.rd-navbar');
    if (o.length > 0) {
        $(document).ready(function () {
            o.RDNavbar({
                stuckWidth: 768,
                stuckMorph: true,
                stuckLayout: "rd-navbar-static",
                responsive: {
                    0: {
                        layout: 'rd-navbar-fixed',
                        focusOnHover: false
                    },
                    768: {
                        layout: 'rd-navbar-fullwidth',
                        deviceLayout: 'rd-navbar-fullwidth'
                    },
                    1200: {
                        layout: o.attr("data-rd-navbar-lg").split(" ")[0],
                        deviceLayout: o.attr("data-rd-navbar-lg").split(" ")[0]
                    }
                },
                onepage: {
                    enable: false,
                    offset: 0,
                    speed: 400
                }
            });
        });
    }
})(jQuery);


/**
 * @module       RD Search
 * @description  Enables RD Search Plugin
 */
;
(function ($) {
    var o = $('.rd-navbar-search');
    if (o.length) {
        $(document).ready(function () {
            o.RDSearch({});
        });
    }
})(jQuery);

/**
 * @module       Count To
 * @description  Enables Count To Plugin
 */
;
(function ($) {
    var o = $('.counter');
    if (o.length > 0) {

        $(document).ready(function () {
            o.countTo();
        });
    }
})(jQuery);

/**
 * @module     Owl Carousel
 * @description Enables Owl Carousel Plugin
 */
;
(function ($) {
    var o = $('.owl-carousel');
    if (o.length) {

        var isTouch = "ontouchstart" in window;

        function preventScroll(e) {
            e.preventDefault();
        }

        $(document).ready(function () {
            o.each(function () {
                var c = $(this),
                    responsive = {};

                var aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-"],
                    values = [0, 480, 768, 992, 1200],
                    i, j;

                for (i = 0; i < values.length; i++) {
                    responsive[values[i]] = {};
                    for (j = i; j >= -1; j--) {
                        if (!responsive[values[i]]["items"] && c.attr("data" + aliaces[j] + "items")) {
                            responsive[values[i]]["items"] = j < 0 ? 1 : parseInt(c.attr("data" + aliaces[j] + "items"));
                        }
                        if (!responsive[values[i]]["stagePadding"] && responsive[values[i]]["stagePadding"] !== 0 && c.attr("data" + aliaces[j] + "stage-padding")) {
                            responsive[values[i]]["stagePadding"] = j < 0 ? 0 : parseInt(c.attr("data" + aliaces[j] + "stage-padding"));
                        }
                        if (!responsive[values[i]]["margin"] && responsive[values[i]]["margin"] !== 0 && c.attr("data" + aliaces[j] + "margin")) {
                            responsive[values[i]]["margin"] = j < 0 ? 30 : parseInt(c.attr("data" + aliaces[j] + "margin"));
                        }
                    }
                }

                c.owlCarousel({
                    autoplay: c.attr("data-autoplay") === "true",
                    loop: c.attr("data-loop") !== "false",
                    items: 1,
                    mouseDrag: c.attr("data-mouse-drag") !== "false",
                    nav: c.attr("data-nav") === "true",
                    dots: c.attr("data-dots") === "true",
                    dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each")) : false,
                    responsive: responsive,
                    navText: [],
                    onInitialized: function () {
                        if ($.fn.magnificPopup) {
                            var o = this.$element.attr('data-lightbox') !== undefined && this.$element.attr("data-lightbox") !== "gallery",
                                g = this.$element.attr('data-lightbox') === "gallery";

                            if (o) {
                                this.$element.each(function () {
                                    var $this = $(this);
                                    $this.magnificPopup({
                                        type: $this.attr("data-lightbox"),
                                        callbacks: {
                                            open: function () {
                                                if (isTouch) {
                                                    $(document).on("touchmove", preventScroll);
                                                    $(document).swipe({
                                                        swipeDown: function () {
                                                            $.magnificPopup.close();
                                                        }
                                                    });
                                                }
                                            },
                                            close: function () {
                                                if (isTouch) {
                                                    $(document).off("touchmove", preventScroll);
                                                    $(document).swipe("destroy");
                                                }
                                            }
                                        }
                                    });
                                })
                            }

                            if (g) {
                                this.$element.each(function () {
                                    var $gallery = $(this);

                                    $gallery
                                        .find('[data-lightbox]').each(function () {
                                            var $item = $(this);
                                            $item.addClass("mfp-" + $item.attr("data-lightbox"));
                                        })
                                        .end()
                                        .magnificPopup({
                                            delegate: '.owl-item [data-lightbox]',
                                            type: "image",
                                            gallery: {
                                                enabled: true
                                            },
                                            callbacks: {
                                                open: function () {
                                                    if (isTouch) {
                                                        $(document).on("touchmove", preventScroll);
                                                        $(document).swipe({
                                                            swipeDown: function () {
                                                                $.magnificPopup.close();
                                                            }
                                                        });
                                                    }
                                                },
                                                close: function () {
                                                    if (isTouch) {
                                                        $(document).off("touchmove", preventScroll);
                                                        $(document).swipe("destroy");
                                                    }
                                                }
                                            }
                                        });
                                })
                            }
                        }
                    }
                });
            });
        });
    }
})(jQuery);

/**
 * @module       Progress Bar
 * @description  Enables Progress Bar Plugin
 */
;
(function ($) {
    var o = $(".progress-bar");
    if (o.length) {
        function isScrolledIntoView(elem) {
            var $window = $(window), $elem = $(elem);
            return $elem.offset().top + $elem.height() >= $window.scrollTop() && $elem.offset().top <= $window.scrollTop() + $window.height();
        }

        $(document).ready(function () {
            o.each(function () {
                var bar, type;

                if (
                    this.className.indexOf("progress-bar-horizontal") > -1
                ) {
                    type = 'Line';
                }

                if (
                    this.className.indexOf("progress-bar-radial") > -1
                ) {
                    type = 'Circle';
                }

                if (this.getAttribute("data-stroke") && this.getAttribute("data-value") && type) {
                    bar = new ProgressBar[type](this, {
                        strokeWidth: Math.round(parseFloat(this.getAttribute("data-stroke")) / this.offsetWidth * 100)
                        ,
                        trailWidth: this.getAttribute("data-trail") ? Math.round(parseFloat(this.getAttribute("data-trail")) / this.offsetWidth * 100) : 0
                        ,
                        text: {
                            value: this.getAttribute("data-counter") === "true" ? '0' : null
                            , className: 'progress-bar__body'
                            , style: null
                        }
                    });

                    bar.svg.setAttribute('preserveAspectRatio', "none meet");
                    if (type === 'Line') {
                        bar.svg.setAttributeNS(null, "height", this.getAttribute("data-stroke"));
                    }

                    bar.path.removeAttribute("stroke");
                    bar.path.className.baseVal = "progress-bar__stroke";
                    if (bar.trail) {
                        bar.trail.removeAttribute("stroke");
                        bar.trail.className.baseVal = "progress-bar__trail";
                    }

                    if (this.getAttribute("data-easing") && !isIE()) {
                        $(document)
                            .on("scroll", $.proxy(function () {
                                if (isScrolledIntoView(this) && this.className.indexOf("progress-bar--animated") === -1) {
                                    var _this = this;
                                    this.className += " progress-bar--animated";
                                    bar.animate(parseInt(this.getAttribute("data-value")) / 100.0, {
                                        easing: this.getAttribute("data-easing")
                                        ,
                                        duration: this.getAttribute("data-duration") ? parseInt(this.getAttribute("data-duration")) : 800
                                        ,
                                        step: function (state, b) {
                                            if (_this.getAttribute("data-counter") === "true") {
                                                if (b._container.className.indexOf("progress-bar-horizontal") > -1) {
                                                    b.text.style.width = Math.abs(b.value() * 100).toFixed(0) + "%"
                                                }
                                                b.setText(Math.abs(b.value() * 100).toFixed(0));
                                            }
                                        }
                                    });
                                }
                            }, this))
                            .trigger("scroll");
                    } else {
                        bar.set(parseInt(this.getAttribute("data-value")) / 100.0);
                        bar.setText(this.getAttribute("data-value"));
                        if (type === 'Line') {
                            bar.text.style.width = parseInt(this.getAttribute("data-value")) + "%";
                        }
                    }
                } else {
                    console.error(this.className + ": progress bar type is not defined");
                }
            });
        });
    }
})(jQuery);
