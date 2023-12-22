const inputArea = document.querySelector(".large-area--input");
const outputArea = document.querySelector(".large-area--output");

const btnFormat = document.querySelector(".controls__button--format");
const btnMinify = document.querySelector(".controls__button--minify");

btnFormat.addEventListener("click", () => {
    try {
        const formatted = JSON.stringify(JSON.parse(inputArea.value), null, 4);
        outputArea.value = formatted;
    } catch (error) {
        outputArea.value = error;
    }
});

btnMinify.addEventListener("click", () => {
    try {
        const minified = JSON.stringify(JSON.parse(inputArea.value));
        outputArea.value = minified;
    } catch (error) {
        outputArea.value = error;
    }
});
