// Fixed header when scroll surpass 64px vertically
const pricePreviewHeight =
    document.querySelector(".price-preview").offsetHeight;
const navbarId = document.getElementById("navbar");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > pricePreviewHeight ||
        document.documentElement.scrollTop > pricePreviewHeight
    ) {
        document.getElementById("header").classList.add("header--fixed");
        navbarId.style.paddingTop = 0;
        navbarId.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.07)";
    } else {
        document.getElementById("header").classList.remove("header--fixed");
        navbarId.style.paddingTop = "2rem";
        navbarId.style.boxShadow = "none";
    }
}

// NAVBAR SLIDER
const sliderWrapper = document.querySelector('.slider-wrapper');
const buttons = document.querySelectorAll(
    ".slider-wrapper .prev-button-container button, .slider-wrapper .next-button-container button"
);
// maximum scrollable
let sliderWrapperMaxScrollWidth = sliderWrapper.scrollWidth - sliderWrapper.clientWidth;
let sliderWrapperHalfScrollWidth = Math.round(sliderWrapperMaxScrollWidth / 2);

console.log(sliderWrapperMaxScrollWidth);
console.log(sliderWrapperHalfScrollWidth);

const showHidedButtons = () => {
    console.log(sliderWrapper.scrollLeft);
    // if navSlider scrollLeft is 0, hide left button
    buttons[0].parentElement.style.display =
        sliderWrapper.scrollLeft === 0 ? "none" : "flex";
    // if sliderWrapper scollLeft is max (sliderWrapperMaxScrollWidth), hide right button
    buttons[1].parentElement.style.display =
        sliderWrapper.scrollLeft === sliderWrapperMaxScrollWidth ? "none" : "flex";
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
