function getLargestRectArea(hist) {
    const isValid = hist.every((el) =>
        typeof el === 'number'
        && !isNaN(parseFloat(el))
        && parseFloat(el).toString().split('.').length === 1
    );

    if (!isValid) {
        return 'Invalid input provided. Input most contain only integers.';
    }

    const stack = [];
    let maxArea = 0, i = 0;

    while (i < hist.length) {
        if (stack.length === 0 || hist[i] >= hist[stack[stack.length - 1]]) {
            stack.push(i++);
        }
        else {
            const lastIndex = stack[stack.length - 1];
            // Pop last element from top of the stack so
            // we can look at the previous element, which represents
            // the index of the last bar to the left of hist[lastIndex]
            // that is smaller than hist[lastIndex].
            stack.pop();

            // Calculate max area of rectangle with hist[lastIndex]
            // lastIndex as the smallest bar.
            const width = stack.length === 0
                ? i
                : i - stack[stack.length - 1] - 1;
            const lastArea = hist[lastIndex] * width;
            maxArea = Math.max(maxArea, lastArea);
        }
    }

    // Clear any histogram bars that are still left on the stack, while
    // calculating the area of a rectangle with each bar as the smallest bar,
    // and comparing it to the previous maxArea.
    while (stack.length !== 0) {
        const lastIndex = stack[stack.length - 1];
        stack.pop();

        const width = stack.length === 0
            ? i
            : i - stack[stack.length - 1] - 1;
        const lastArea = hist[lastIndex] * width;
        maxArea = Math.max(maxArea, lastArea);
    }

    return maxArea;
}

const input1 = [6, 2, 5, 4, 5, 1, 6];
const input2 = [2, 1, 5, 6, 2, 3];
const input3 = [1, 4, NaN];
const input4 = [1, 4, '5'];
const input5 = [5, 1, null, 6];
const input6 = [5, 1, true, 6];
const input7 = [5, 1, 6.4, 8];

console.log('OUTPUT 1:', getLargestRectArea(input1));
console.log('OUTPUT 2:', getLargestRectArea(input2));
console.log('OUTPUT 3:', getLargestRectArea(input3));
console.log('OUTPUT 4:', getLargestRectArea(input4));
console.log('OUTPUT 5:', getLargestRectArea(input5));
console.log('OUTPUT 6:', getLargestRectArea(input6));
console.log('OUTPUT 7:', getLargestRectArea(input7));