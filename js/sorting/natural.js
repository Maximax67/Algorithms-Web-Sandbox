const getArrayInText = (text) => text.split(' ').map(val => +val);


const validSort = (arr , typeAsc = true) => {
    for (let i = 0; i + 1 < arr.length; i++) {
        if (typeAsc ? arr[i] > arr[i + 1] : arr[i] < arr[i + 1]) {
            return false;
        }
    }
    return true
}

const getSeria = (arr, typeAsc = true) => {
    newArr = []
    let tempArr = []
    for (let i = 0; i < arr.length; i++) {
        tempArr = []
        while (typeAsc ? arr[i] < arr[i + 1] : arr[i] > arr[i + 1]) {
            tempArr.push(arr[i])
            i += 1
        }
        tempArr.push(arr[i])  
        newArr.push(tempArr)
    }
    return newArr
}

const checkDoubleSeria = (arr, typeAsc = true) => {
    let newArr = arr

    for (let i = 0; i < arr.length; i++) {
        const fArr = arr[i]
        const sArr = arr[i + 1]
        if (!sArr) {
            break;
        }
        if (typeAsc ? fArr[fArr.length - 1] < sArr[sArr.length - 1] : fArr[fArr.length - 1] > sArr[sArr.length - 1]) {
            newArr = newArr.splice(i, 2, [...fArr, ...sArr])
        }
    }
    return newArr;
}


const merge = (arr, arr2, typeAsc = true) => {
    let newArr = []
    while (arr.length && arr2.length) {
        if (typeAsc ? arr[0] > arr2[0] : arr[0] < arr2[0]) {
            newArr.push(arr2.shift())
        } else {
            newArr.push(arr.shift())
        }
    }
    if (arr.length) {
        newArr = newArr.concat(arr)
        arr = []
    }

    if (arr2.length) {
        newArr = newArr.concat(arr2)
        arr2 = []
    }
    return newArr
}

const mergeDeep = (arr, arr2, typeAsc = true) => {
    newArr = []
    while (arr.length && arr2.length) {
        newArr.splice(arr.length - 1, 0, ...merge(arr[0], arr2[0], typeAsc))
        arr.shift()
        arr2.shift()
    } 
    if (arr.length) {
        newArr = newArr.concat(...arr)
        arr = []
    }

    if (arr2.length) {
        newArr = newArr.concat(...arr2)
        arr2 = []
    }

    return newArr
}

const NatureSort = (arr, typeAsc) => {
    let fileA = arr;
    let fileB = [];
    let fileC = [];
    let tempArr = getSeria(fileA, typeAsc);
    for (let i = 0; i < tempArr.length; i += 2) {
        fileB.push(tempArr[i])
        if (i + 1 < tempArr.length) {
            fileC.push(tempArr[i + 1]);
        }
    }
    checkDoubleSeria(fileB, typeAsc)
    checkDoubleSeria(fileC, typeAsc)
    const tempB = JSON.parse(JSON.stringify(fileB))
    const tempC = JSON.parse(JSON.stringify(fileC))
    return [tempB, tempC, mergeDeep(fileB, fileC, typeAsc)]
}

const startVisualInfo = (fileA, typeAsc) => {
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('resolve')
    const elements = [
        { 
            tag: 'h4', text: `Start sorting in ${typeAsc ? 'ascending' : 'descending'} mode for array:`
        },
        {
            tag: 'p', text: fileA.join(' ')
        }
    ]
    elements.forEach(elementData => {
        const element = document.createElement(elementData.tag);
        element.innerHTML = elementData.text;
        tempDiv.appendChild(element);
    });
    solution.appendChild(tempDiv);
    solution.style.display = 'block';
}

const visualBox = (fileA, fileB, fileC, index = 1) => {
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('resolve')
    const elements = [
        { tag: 'h4', text: `${index} Step:` },
        { tag: 'h4', text: 'File B:' },
        { tag: 'p', text: fileB.join(' - ') },
        { tag: 'h4', text: 'File C:' },
        { tag: 'p', text: fileC.join(' - ') },
        { tag: 'h4', text: 'File A:' },
        { tag: 'p', text: fileA.join(' ') },
    ];

    elements.forEach(elementData => {
        const element = document.createElement(elementData.tag);
        element.innerHTML = elementData.text;
        tempDiv.appendChild(element);
    });

    solution.appendChild(tempDiv);
}
const visualBoxMultipath = (fileB, fileB2, fileB3, fileC, fileC2, fileC3, fileA, index = 1) => {
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('resolve')
    const elements = [
        { tag: 'h4', text: `${index} Step:` },
        { tag: 'h4', text: 'File B:' },
        { tag: 'p', text: fileB.join(' ') },
        { tag: 'h4', text: 'File B2:' },
        { tag: 'p', text: fileB2.join(' ') },
        { tag: 'h4', text: 'File B3:' },
        { tag: 'p', text: fileB3.join(' ') },
        { tag: 'h4', text: 'File C:' },
        { tag: 'p', text: fileC.join(' ') },
        { tag: 'h4', text: 'File C2:' },
        { tag: 'p', text: fileC2.join(' ') },
        { tag: 'h4', text: 'File C3:' },
        { tag: 'p', text: fileC3.join(' ') },
        { tag: 'h4', text: 'File A:' },
        { tag: 'p', text: fileA.join(' ') },
    ];

    elements.forEach(elementData => {
        const element = document.createElement(elementData.tag);
        element.innerHTML = elementData.text;
        tempDiv.appendChild(element);
    });

    solution.appendChild(tempDiv);
}

const resolveNatureSort = (arr, typeAsc = true) => {
    let index = 1;
    startVisualInfo(arr, typeAsc);
    while (!validSort(arr, typeAsc) && index < 10) {
        const [ fileB, fileC , fileA ] = NatureSort(arr, typeAsc);
        visualBox(fileA, fileB, fileC, index);
        arr = fileA
        index++;
        iter++;
    }
}

const arrayInput = document.getElementById('array-input');
const orderSelect = document.getElementById('order-select');
const solution = document.getElementsByClassName('solution')[0];
const startButton = document.getElementById('start-button');

const clickHandler = (ev) => {
    solution.innerHTML = '';
    const text = arrayInput.value;
    let arr = getArrayInText(text);
    const typeAsc = orderSelect.value == 'asc' ? true : false;
    resolveNatureSort(arr, typeAsc);
}

startButton.addEventListener('click', (ev) => clickHandler(ev));
