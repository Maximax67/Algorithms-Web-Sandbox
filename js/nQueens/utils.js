function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(deepCopy);
    }

    const copy = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }

    return copy;
}

function createTree(data, objectContainer) {
    function createCollapsibleElement(key, value) {
        const element = document.createElement('div');

        if (typeof value === 'object') {
            const collapsible = document.createElement('button');
            collapsible.className = 'collapsed';
            collapsible.innerHTML = key;
            const content = document.createElement('div');
            content.className = 'content';

            collapsible.onclick = function () {
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
                if (collapsible.className.includes("collapsed")) {
                    collapsible.className = "expanded";
                } else {
                    collapsible.className = "collapsed";
                }
            };

            for (const subKey in value) {
                if (value.hasOwnProperty(subKey)) {
                    const subValue = value[subKey];
                    content.appendChild(createCollapsibleElement(subKey, subValue));
                }
            }

            element.appendChild(collapsible);
            element.appendChild(content);
        } else {
            element.innerHTML = `${key}: ${value}`;
            element.classList.add('final-value');
        }

        return element;
    }

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const item = data[key];
            const element = createCollapsibleElement(`Object ${key}`, item);
            objectContainer.appendChild(element);
        }
    }
}
