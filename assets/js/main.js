// Fixed header when scroll surpass 64px vertically
const pricePreviewHeight =
    document.querySelector(".price-preview").offsetHeight;

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > pricePreviewHeight ||
        document.documentElement.scrollTop > pricePreviewHeight
    ) {
        document.getElementById("header").classList.add("header--fixed");
    } else {
        document.getElementById("header").classList.remove("header--fixed");
    }
}
