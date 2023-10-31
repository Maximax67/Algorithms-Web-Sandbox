// Function to get query parameter from URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to check if a value exists in a select element
function optionExistsInSelect(selectId, value) {
    const select = document.getElementById(selectId);
    for (let option of select.options) {
        if (option.value === value) {
            return true;
        }
    }
    return false;
}

// Get the values from the URL parameters
const algorithmParam = getQueryParam("algorithm");

if (algorithmParam && optionExistsInSelect("algorithm-select", algorithmParam)) {
    document.getElementById("algorithm-select").value = algorithmParam;
}
