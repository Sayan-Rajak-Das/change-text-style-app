let textSize = 16;

function updateTextStyle() {
    const textInput = document.getElementById('text-input');
    const textColor = document.getElementById('text-color');
    const fontFamily = document.getElementById('font-family');

    textInput.style.fontSize = textSize + 'px';
    textInput.style.color = textColor.value;
    textInput.style.fontFamily = fontFamily.value;
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
});
