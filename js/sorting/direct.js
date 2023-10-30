const arrayInput = document.getElementById('array-input');
const orderSelect = document.getElementById('order-select');
const startButton = document.getElementById('start-button');
const solutionDiv = document.getElementsByClassName('solution')[0];
const stepsDiv = solutionDiv.getElementsByClassName('steps')[0];

function stepCreateArrayLabel(array = []) {
    const stepArray = document.createElement('p');
    stepArray.classList.add('array');
    if (array.length) {
        stepArray.textContent = array.join(' ');
    } else {
        stepArray.textContent = "{empty}";
    }

    return stepArray;
}

function stepCreateLabel(label = "") {
    const stepLabel = document.createElement('p');
    stepLabel.classList.add('label');
    stepLabel.textContent = label;

    return stepLabel;
}

function stepDivCreate(items = []) {
    const stepDiv = document.createElement('div');
    stepDiv.classList.add('step');

    items.forEach(element => {
        stepDiv.appendChild(element);
    });

    return stepDiv;
}

function directMergeSort(array, is_ascending = true) {
    function splitArrayByLength(arr, sequence_length) {
        const firstArray = [];
        const secondArray = [];

        let write_to_second = true;

        for (let i = 0; i < arr.length; i++) {
            if (i % sequence_length === 0) {
                write_to_second = !write_to_second;
            }

            if (write_to_second) {
                secondArray.push(arr[i]);
            } else {
                firstArray.push(arr[i]);
            }
        }

        return [firstArray, secondArray];
    }

    function mergeArrays(array1, array2, sequence_length, is_ascending) {
        if (!array1.length) {
            return array2;
        }

        if (!array2.length) {
            return array1;
        }

        let merged_array = [];
        let pos1 = 0;
        let pos2 = 0;

        for (let i = sequence_length; pos1 < array1.length && pos2 < array2.length; i += sequence_length) {
            while (pos1 < i && pos2 < i && pos1 < array1.length && pos2 < array2.length) {
                if ((is_ascending && array1[pos1] < array2[pos2]) || (!is_ascending && array1[pos1] > array2[pos2])) {
                    merged_array.push(array1[pos1]);
                    pos1++;
                } else {
                    merged_array.push(array2[pos2]);
                    pos2++;
                }
            }

            if (pos1 === i || pos1 === array1.length) {
                while (pos2 < i && pos2 < array2.length) {
                    merged_array.push(array2[pos2]);
                    pos2++;
                }
            }

            if (pos2 === i || pos2 === array2.length) {
                while (pos1 < i && pos1 < array1.length) {
                    merged_array.push(array1[pos1]);
                    pos1++;
                }
            }
        }

        if (pos1 !== array1.length) {
            while (pos1 < array1.length) {
                merged_array.push(array1[pos1]);
                pos1++;
            }
        }
        else if (pos2 !== array2.length) {
            while (pos2 < array2.length) {
                merged_array.push(array2[pos2]);
                pos2++;
            }
        }

        return merged_array;
    }

    const total = array.length;
    let sequence_length = 1;
    let is_sorted = false;

    let A = array;
    let B = [];
    let C = [];

    const info_label = stepCreateLabel(`Start sorting in ${is_ascending ? 'ascending' : 'descending'} mode for array:`);
    const info_array = stepCreateArrayLabel(array);
    const info_step = stepDivCreate([info_label, info_array]);

    let steps = [info_step];

    while (!is_sorted) {
        [B, C] = splitArrayByLength(A, sequence_length);
        A = mergeArrays(B, C, sequence_length, is_ascending);

        const file_b_label = stepCreateLabel("Splitting to File B: ");
        const file_b = stepCreateArrayLabel(B);
        const file_c_label = stepCreateLabel("Splitting to File C: ");
        const file_c = stepCreateArrayLabel(C);
        const merge_label = stepCreateLabel("\nMerging to File A:");
        const merged_a = stepCreateArrayLabel(A);

        const sorting_step = stepDivCreate([file_b_label, file_b, file_c_label, file_c, merge_label, merged_a]);
        steps.push(sorting_step);

        if (Math.floor(total / 2) < sequence_length) {
            is_sorted = true;
        }

        sequence_length *= 2;
    }

    const result_label = stepCreateLabel("Sorting finished:");
    const result_array = stepCreateArrayLabel(A);
    const result_step = stepDivCreate([result_label, result_array]);
    steps.push(result_step);

    return steps;
}

startButton.addEventListener('click', () => {
    const input_value = arrayInput.value.trim();
    if (input_value) {
        const input_array = input_value.split(' ').map(Number);
        const order = orderSelect.value;
        const is_ascending = order === 'asc';
        if (input_array.length >= 1 && input_array.some(isNaN)) {
            alert("The input contains non-numeric values. Please enter a valid array of numbers.");
        } else {
            stepsDiv.innerHTML = '';

            steps = directMergeSort(input_array, is_ascending);
            steps.forEach(st => {
                stepsDiv.appendChild(st);
            });

            solutionDiv.style.display = 'block';
        }
    } else {
        alert("You should type array in text input!")
    }
});
