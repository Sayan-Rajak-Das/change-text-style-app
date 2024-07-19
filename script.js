let textSize = 16;
let undo_stack = [];
let redo_stack = [];

function saveState() {
    const textInput = document.getElementById('text-input');
    const state = {
        text: textInput.value,
        textSize: textSize,
        textColor: document.getElementById('text-color').value,
        fontFamily: document.getElementById('font-family').value
    };
    undo_stack.push(state);
}

function applyStyle(state) {
    const textInput = document.getElementById('text-input');
    textInput.value = state.text;
    textSize = state.textSize;
    document.getElementById('text-size').value = textSize + 'px';
    textInput.style.fontSize = textSize + 'px';
    document.getElementById('text-color').value = state.textColor;
    textInput.style.color = state.textColor;
    document.getElementById('font-family').value = state.fontFamily;
    textInput.style.fontFamily = state.fontFamily;
}

function undo() {
    if (undo_stack.length > 1) {
        const currentState = undo_stack.pop();
        redo_stack.push(currentState);
        const previousState = undo_stack[undo_stack.length - 1];
        applyStyle(previousState);
    }
    console.log(undo_stack);
    console.log(redo_stack);
}

function redo() {
    if (redo_stack.length > 0) {
        const redoState = redo_stack.pop();
        undo_stack.push(redoState);
        applyStyle(redoState);
    }
    console.log(undo_stack);
    console.log(redo_stack);
}

function updateTextStyle() {
    const textInput = document.getElementById('text-input');
    textInput.style.fontSize = textSize + 'px';
    textInput.style.color = document.getElementById('text-color').value;
    textInput.style.fontFamily = document.getElementById('font-family').value;

    saveState();
    redo_stack = []; // clear redo stack when new change is made
    console.log(undo_stack);
    console.log(redo_stack);
}

function addText() {
    const textInput = document.getElementById('text-input');
    const newText = " New Text";
    const currentText = textInput.value.trim();

    if (currentText.length > 0) {
        textInput.value += ' ';
    }

    textInput.value += newText;

    updateTextStyle();
    textInput.focus();
}

function changeTextSize(direction) {
    const textSizeDropdown = document.getElementById('text-size');

    if (direction === 'up') {
        textSize += 2;
    } else if (direction === 'down') {
        textSize -= 2;
    }

    // Limit minimum size to 12px and maximum size to 30px
    if (textSize < 12) {
        textSize = 12;
    } else if (textSize > 30) {
        textSize = 30;
    }

    // Update the dropdown and text size
    textSizeDropdown.value = textSize + 'px';
    updateTextStyle();
}

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const textColor = document.getElementById('text-color');
    const fontFamily = document.getElementById('font-family');
    const textSizeDropdown = document.getElementById('text-size');

    textSize = parseInt(textSizeDropdown.value);

    textColor.addEventListener('change', updateTextStyle);
    fontFamily.addEventListener('change', updateTextStyle);

    textSizeDropdown.addEventListener('change', () => {
        textSize = parseInt(textSizeDropdown.value);
        updateTextStyle();
    });

    // Initial state save
    saveState();
});
