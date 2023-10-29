document.addEventListener("DOMContentLoaded", function () {
    const categoryTitles = document.querySelectorAll(".category-title");
    const category_colors = [
        "#0F4D92",
        "#D03F5F",
        "#55A630",
        "#2978A0",
        "#FF8C00",
        "#FF5733",
        "#008272",
        "#B620E0",
        "#A65B91",
        "#FFC300"
    ]

    categoryTitles.forEach(function (categoryTitle, index) {
        categoryTitle.style.backgroundColor = category_colors[index % category_colors.length]; // Assign category_colors in a loop
        categoryTitle.addEventListener("click", function () {
            const categoryContent = categoryTitle.nextElementSibling;

            // Toggle the 'expanded' class on the category title
            categoryTitle.classList.toggle("expanded");

            // Toggle the max-height of the category content
            if (categoryContent.style.maxHeight) {
                categoryContent.style.maxHeight = null;
            } else {
                categoryContent.style.maxHeight = categoryContent.scrollHeight + "px";
            }
        });
    });
});