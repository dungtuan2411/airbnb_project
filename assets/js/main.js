// Fixed header when scroll surpass 64px vertically
const pricePreviewHeight =
    document.querySelector(".price-preview").offsetHeight;
const navbarId = document.getElementById("navbar");
const headerHeight = document.getElementById("header").offsetHeight;

window.onscroll = function () {
    scrollFunction();
};

// When header is fixed, locations section must margin top
const locationsPicker = document.querySelector(".locations-picker");

function scrollFunction() {
    // pc or higher resolution only
    if (window.screen.width >= 744) {
        if (
            document.body.scrollTop > pricePreviewHeight ||
            document.documentElement.scrollTop > pricePreviewHeight
        ) {
            document.getElementById("header").classList.add("header--fixed");
            navbarId.style.paddingTop = 0;
            navbarId.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.07)";
            // margin top
            locationsPicker.style.marginTop = "170px";
        } else {
            document.getElementById("header").classList.remove("header--fixed");
            navbarId.style.paddingTop = "2rem";
            navbarId.style.boxShadow = "none";
            locationsPicker.style.marginTop = "40px";
        }
    } else {
        document.getElementById("header").classList.add("header--fixed");
        document.getElementById("header").style.boxShadow =
            "0 2px 4px rgba(0, 0, 0, 0.1)";
        navbarId.style.boxShadow = "none";
        locationsPicker.style.marginTop = "170px";

        if (
            (document.body.scrollTop > 0 &&
                document.body.scrollTop < headerHeight) ||
            (document.documentElement.scrollTop > 0 &&
                document.documentElement.scrollTop < headerHeight)
        ) {
            document.querySelector(".show-map--mobile").style.animation =
                "fade-in 500ms forwards";
            document.querySelector(".price-preview--mobile").style.animation =
                "fade-out 500ms forwards";
            document.querySelector(".footer-tabs-mobile").style.animation =
                "fade-in 500ms forwards";
            document.querySelector(".show-map--mobile").style.bottom =
                "calc(2.4rem + 6.4rem)";
        } else if (
            document.body.scrollTop >= headerHeight ||
            document.documentElement.scrollTop >= headerHeight
        ) {
            document.querySelector(".footer-tabs-mobile").style.animation =
                "fade-out 500ms forwards";
            document.querySelector(".show-map--mobile").style.bottom = "2.4rem";
        } else {
            document.querySelector(".show-map--mobile").style.animationName =
                "fade-out";
            document.querySelector(".price-preview--mobile").style.animation =
                "fade-in 500ms forwards";
            document.querySelector(".footer-tabs-mobile").style.animation =
                "fade-in 500ms forwards";
            document.querySelector(".show-map--mobile").style.bottom =
                "calc(2.4rem + 6.4rem)";
        }
    }
}

// NAVBAR SLIDER
const sliderWrapper = document.querySelector(".slider-wrapper");
const buttons = document.querySelectorAll(
    ".slider-wrapper .prev-button-container button, .slider-wrapper .next-button-container button"
);
// maximum scrollable
let sliderWrapperMaxScrollWidth =
    sliderWrapper.scrollWidth - sliderWrapper.clientWidth;
let sliderWrapperHalfScrollWidth = Math.round(sliderWrapperMaxScrollWidth / 2);

console.log(sliderWrapperMaxScrollWidth);
console.log(sliderWrapperHalfScrollWidth);

const showHidedButtons = () => {
    console.log(sliderWrapper.scrollLeft);
    // if sliderWrapper scrollLeft is 0, hide left button
    buttons[0].parentElement.style.display =
        sliderWrapper.scrollLeft === 0 ? "none" : "flex";
    // if sliderWrapper scollLeft is max (sliderWrapperMaxScrollWidth), hide right button
    buttons[1].parentElement.style.display =
        sliderWrapper.scrollLeft === sliderWrapperMaxScrollWidth
            ? "none"
            : "flex";
};

buttons.forEach((item) => {
    // item is prev or next button
    item.addEventListener("click", () => {
        sliderWrapper.scrollLeft +=
            item.className == "prev-button"
                ? -sliderWrapperHalfScrollWidth
                : sliderWrapperHalfScrollWidth;
        // delay 350ms so sliderWrapper.scrollLeft has ennough time to update
        setTimeout(() => {
            showHidedButtons();
        }, 350);
    });
});

// Slider item and footer tabs item clicked
const sliderItems = document.querySelectorAll(".nav-slider__item");
const footerTabItems = document.querySelectorAll(".footer-tabs-mobile > *");

function clickItemsEvent(type) {
    if (type === 1) {
        // find current clicked item and remove it's --clicked class.
        this.parentElement
            .querySelector(`.nav-slider__item--clicked`)
            .classList.remove("nav-slider__item--clicked");
        // add --clicked class to newest clicked item.
        this.classList.add("nav-slider__item--clicked");
    } else {
        // find current clicked item and remove it's --clicked class.
        this.parentElement.querySelector(`.active`).classList.remove("active");
        // add --clicked class to newest clicked item.
        this.classList.add("active");
    }
}

sliderItems.forEach((item, index) => {
    item.onclick = function () {
        clickItemsEvent.call(item, 1);
    };
});

footerTabItems.forEach((item) => {
    item.onclick = function () {
        clickItemsEvent.call(item, 2);
    };
});

// SLICK SLIDER Images
$(document).ready(function () {
    // default: scale down dots no.4(0.6) and no.5(0.8)
    function setBoundries(slick, state) {
        if (state === "default") {
            slick.find("ul.slick-dots li").eq(3).addClass("n-small-1");
            slick.find("ul.slick-dots li").eq(4).addClass("n-small-2");
        }
    }

    // Slick container
    // list of images slider
    var slickSlider = $(".location__images-slider");
    var maxDots = 4;
    // translate 11px left or right
    var transformXIntervalNext = -11;
    var transformXIntervalPrev = 11;

    slickSlider.on("init", function (event, slick) {
        // wrap ul list of dots inside new div
        $(this)
            .find("ul.slick-dots")
            .wrap("<div class='slick-dots-container'></div>");
        // add class with index start from 0 for dots li
        $(this)
            .find("ul.slick-dots li")
            .each(function (index) {
                $(this).addClass("dot-index-" + index);
            });
        // default when load, ul wont translateX
        $(this).find("ul.slick-dots").css("transform", "translateX(0)");
        setBoundries($(this), "default");
    });

    // scroll dots left or right when click arrow buttons
    $(slickSlider).each(function (key, item) {
        let sliderItem = slickSlider[key];

        var transformCount = 0;
        // slider dots translate function is separate from each other
        $(sliderItem).on(
            "beforeChange",
            function (event, slick, currentSlide, nextSlide) {
                var totalCount = $(this).find(".slick-dots li").length;
                // event chỉ xảy ra khi có nhiều hơn 4 slide
                if (totalCount > maxDots) {
                    // khi click next arrow
                    if (nextSlide > currentSlide) {
                        // bắt đầu scroll khi đến slide thứ 4
                        if (nextSlide > 2) {
                            /**
                             * currentSlide chỉ index của slide hiện tại (bắt đầu từ 0).
                             * nextSlide chỉ index (bắt đầu từ 0) của slide phía sau slide hiện tại.
                             * Chỉ scroll slider khi dot phía sau nextSlide không phải last-child và
                             * index của nó phải bé hơn totalCount - 1 (tức đot cuối).
                             */
                            if (
                                !$(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            (nextSlide + 1)
                                    )
                                    .is($("ul.slick-dots li:last-child")) &&
                                nextSlide < totalCount - 1
                            ) {
                                transformCount =
                                    transformCount + transformXIntervalNext;
                                // bỏ thu nhỏ 0.8 dot hiện tại
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlide
                                    )
                                    .removeClass("n-small-1");

                                var nextSlidePlusOne = nextSlide + 1;
                                var nextSlidePlusTwo = nextSlide + 2;
                                // bỏ thu nhỏ 0.6 của dot tiếp theo
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlidePlusOne
                                    )
                                    .removeClass("n-small-2");
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlidePlusOne
                                    )
                                    .removeClass("p-small-2");
                                // bỏ thu nhỏ 0.8 của dot tiếp theo
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlidePlusOne
                                    )
                                    .removeClass("n-small-1");
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlidePlusOne
                                    )
                                    .removeClass("p-small-1");
                                // thêm thu nhỏ 0.8 cho dots ngoài rìa bên phải nhìn thấy được trừ khi nó là last child
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlidePlusTwo
                                    )
                                    .not($("ul.slick-dots li:last-child"))
                                    .addClass("n-small-1");
                                // tiến hành move slide
                                $(this)
                                    .find("ul.slick-dots")
                                    .css(
                                        "transform",
                                        "translateX(" + transformCount + "px)"
                                    );
                                // tiến hành thu nhỏ dots nằm ngoài rìa bên trái
                                var pPointer = nextSlide - 2;
                                $(this)
                                    .find("ul.slick-dots li")
                                    .eq(pPointer)
                                    .addClass("p-small-1");
                            } else {
                                // khi kéo đến cuối slide (dot kế cuối), thu nhỏ 0.6 cho dot ngoài rìa bên trái và 0.8 cho dot kế bên nó.
                                if (nextSlide < totalCount - 1) {
                                    var nextSlideMinusTwo = nextSlide - 2;
                                    var nextSlideMinusThree = nextSlide - 3;

                                    $(this)
                                        .find(
                                            "ul.slick-dots li.dot-index-" +
                                                nextSlideMinusTwo
                                        )
                                        .addClass("n-small-1");
                                    $(this)
                                        .find(
                                            "ul.slick-dots li.dot-index-" +
                                                nextSlideMinusThree
                                        )
                                        .addClass("n-small-2");
                                }
                            }
                        }
                    }
                    // Khi click prev arrow
                    else if (nextSlide < currentSlide) {
                        // bắt đầu scroll khi đến slide thứ (totalCount - 3)
                        if (nextSlide < totalCount - 3) {
                            /**
                             * current slide chỉ index của slide hiện tại (bắt đầu từ 0).
                             * nextSlide chỉ index (bắt đầu từ 0) của slide phía trước slide hiện tại.
                             * Chỉ scroll slider khi dot trước nextSlide không phải first-child
                             * và index của nó phải lớn hơn 0 (0 là dot đầu tiên).
                             */
                            if (
                                !$(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            (nextSlide - 1)
                                    )
                                    .is($("ul.slick-dots li:first-child")) &&
                                nextSlide > 0
                            ) {
                                transformCount =
                                    transformCount + transformXIntervalPrev;
                                // bỏ thu nhỏ 0.8 cho dot hiện tại
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlide
                                    )
                                    .removeClass("p-small-1");
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlide
                                    )
                                    .removeClass("n-small-1");

                                var nextSlideMinusOne = nextSlide - 1;
                                // bỏ thu nhỏ 0.8 và 0.6 cho dot trước nextSlide
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlideMinusOne
                                    )
                                    .removeClass("n-small-2");
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlideMinusOne
                                    )
                                    .removeClass("p-small-1");
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlideMinusOne
                                    )
                                    .removeClass("n-small-1");
                                // tiến hành thu nhỏ 0.8 dot ngoài rìa bên phải
                                var nextSlidePlusTwo = nextSlide + 2;
                                $(this)
                                    .find(
                                        "ul.slick-dots li.dot-index-" +
                                            nextSlidePlusTwo
                                    )
                                    .addClass("p-small-1");
                                // scroll slider
                                $(this)
                                    .find("ul.slick-dots")
                                    .css(
                                        "transform",
                                        "translateX(" + transformCount + "px)"
                                    );
                            } else {
                                // khi kéo đến đầu slide (dot thứ 2), thu nhỏ 0.6 cho dot ngoài rìa bên phải và 0.8 cho dot trước nó.
                                if (nextSlide > 0) {
                                    var nextSlidePlusTwo = nextSlide + 2;
                                    var nextSlidePlusThree = nextSlide + 3;

                                    $(this)
                                        .find(
                                            "ul.slick-dots li.dot-index-" +
                                                nextSlidePlusTwo
                                        )
                                        .addClass("n-small-1");
                                    $(this)
                                        .find(
                                            "ul.slick-dots li.dot-index-" +
                                                nextSlidePlusThree
                                        )
                                        .addClass("n-small-2");
                                }
                            }
                        }
                    }
                }
            }
        );
    });

    // slick settings
    $(".location__images-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        focusOnSelect: true,
        infinite: false,
        prevArrow:
            "<button type='button' class='pull-left'><i class='fa fa-angle-left'></i></button>",
        nextArrow:
            "<button type='button' class='pull-right'><i class='fa fa-angle-right'></i></button>",
    });
});

// prevent location link target when click on slick arrows
$("body").on("click", ".slick-arrow", function (e) {
    e.preventDefault();
    e.stopPropagation();
});
