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
const navSlider = document.querySelector(".nav-slider");
const buttons = document.querySelectorAll(
    ".slider-wrapper .prev-button-container button, .slider-wrapper .next-button-container button"
);
// maximum scrollable
let navSliderMaxScrollWidth = navSlider.scrollWidth - navSlider.clientWidth;
let navSliderHalfScrollWidth = Math.round(navSliderMaxScrollWidth / 2);

const showHidedButtons = () => {
    // if navSlider scrollLeft is 0, hide left button
    buttons[0].parentElement.style.display =
        navSlider.scrollLeft === 0 ? "none" : "flex";
    // if navSlider scollLeft is max (navSliderMaxScrollWidth), hide right button
    buttons[1].parentElement.style.display =
        navSlider.scrollLeft === navSliderMaxScrollWidth ? "none" : "flex";
};

buttons.forEach((item) => {
    item.addEventListener("click", () => {
        navSlider.scrollLeft +=
            item.className == "prev-button"
                ? -navSliderHalfScrollWidth
                : navSliderHalfScrollWidth;
        // delay 250ms so navSlider.scrollLeft has ennough time to update
        setTimeout(() => {
            showHidedButtons();
        }, 300);
    });
});
