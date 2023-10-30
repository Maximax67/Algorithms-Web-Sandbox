// Function to get query parameter from URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to check if a value exists in a select element
function optionExistsInSelect(selectId, value) {
    const select = document.getElementById(selectId);
    console.log(value)
    for (let option of select.options) {
        if (option.value === value) {
            return true;
        }
    }
    return false;
}

// Get the values from the URL parameters
const searchType = getQueryParam("searchType");
const heuristicType = getQueryParam("heuristicType");

// Set the selected options in the <select> elements if they exist
if (searchType && optionExistsInSelect("searchType", searchType)) {
    document.getElementById("searchType").value = searchType;
}

if (heuristicType && optionExistsInSelect("heuristicType", heuristicType)) {
    document.getElementById("heuristicType").value = heuristicType;
}
