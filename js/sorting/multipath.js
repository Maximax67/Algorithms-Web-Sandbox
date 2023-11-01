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

const mergeThree = (arr1, arr2, arr3, typeAsc = true) => {
    let mergedArray = [];
    const [ tempArr1, tempArr2, tempArr3 ] = [
        JSON.parse(JSON.stringify(arr1)),
        JSON.parse(JSON.stringify(arr2)),
        JSON.parse(JSON.stringify(arr3))
    ]
    while (tempArr1.length || tempArr2.length || tempArr3.length) {
        const min1 = tempArr1.length ? tempArr1[0] : null;
        const min2 = tempArr2.length ? tempArr2[0] : null;
        const min3 = tempArr3.length ? tempArr3[0] : null;
        if (min1 != null && min2 != null && min3 != null) {
            if (typeAsc ? (min1 <= min2 && min1 <= min3) : (min1 >= min2 && min1 >= min3)) {
                mergedArray.push(tempArr1.shift());
            } else if (typeAsc ? (min2 <= min1 && min2 <= min3) : (min2 >= min1 && min2 >= min3)) {
                mergedArray.push(tempArr2.shift());
            } else {
                mergedArray.push(tempArr3.shift());
            }
        } else {
            if (min1 === null) {
                mergedArray = mergedArray.concat(merge(tempArr2, tempArr3, typeAsc));
            } else if (min2 === null) {
                mergedArray = mergedArray.concat(merge(tempArr1, tempArr3, typeAsc));
            } else if (min3 === null) {
                mergedArray = mergedArray.concat(merge(tempArr1, tempArr2, typeAsc));
            }
            break;
        }
    }

    return mergedArray;
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

const MultipathSort = (arr, typeAsc) => {
    let fileA = arr;
    let fileB = []
    let fileB2 = []
    let fileB3 = []
    let fileC = []
    let fileC2 = []
    let fileC3 = []
    let tempArr = fileA
    for (let i = 0; i < tempArr.length; i += 3) {
        fileB.push(tempArr[i])
        if (i + 1 < tempArr.length) {
            fileB2.push(tempArr[i + 1]);
        }
        if (i + 2 < tempArr.length) {
            fileB3.push(tempArr[i + 2]);
        }
    }
    tempArr = mergeThree(fileB, fileB2, fileB3, typeAsc)
    for (let i = 0; i < tempArr.length; i += 3) {
        fileC.push(tempArr[i])
        if (i + 1 < tempArr.length) {
            fileC2.push(tempArr[i + 1]);
        }
        if (i + 2 < tempArr.length) {
            fileC3.push(tempArr[i + 2]);
        }
    }
    tempArr = mergeThree(fileC, fileC2, fileC3, typeAsc)
    return [ 
        fileB,
        fileB2,
        fileB3,
        fileC,
        fileC2,
        fileC3,
        tempArr
    ]
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

const resolveMultipathSort = (arr, typeAsc = true) => {
    let index = 1
    let tempArr = arr
    startVisualInfo(arr, typeAsc);
    while (!validSort(tempArr, typeAsc) && index < 10) {
        const [ fileB, fileB2, fileB3, fileC, fileC2, fileC3, fileA ] = MultipathSort(tempArr, typeAsc);
        visualBoxMultipath(fileB, fileB2, fileB3, fileC, fileC2, fileC3, fileA, index);

        tempArr = fileA;
        index++;
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
    resolveMultipathSort(arr, typeAsc);
}

startButton.addEventListener('click', (ev) => clickHandler(ev));
