// Typewriter Effect with colored words
const phrases = [
    "Hi, I'm <span class='highlight'>Varun Vaddi</span>",
    "I'm a <span class='highlight'>Data Scientist</span>",
    "I build <span class='highlight'>ML/AI Models</span>",
    "I also build <span class='highlight'>Data Pipelines</span>"
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const typedTextElement = document.getElementById('typed-text');
    
    if (!typedTextElement) {
        console.error('typed-text element not found!');
        return;
    }

    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        // Create a temporary div to strip HTML and count actual characters
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = currentPhrase;
        const textOnly = tempDiv.textContent || tempDiv.innerText;
        
        // Get current display text without HTML
        const currentDisplay = typedTextElement.textContent || typedTextElement.innerText;
        const newText = textOnly.substring(0, currentDisplay.length - 1);
        
        // Find where we are in the HTML string and display partial HTML
        let charCount = 0;
        let htmlOutput = '';
        let inTag = false;
        
        for (let i = 0; i < currentPhrase.length; i++) {
            if (currentPhrase[i] === '<') {
                inTag = true;
                htmlOutput += currentPhrase[i];
            } else if (currentPhrase[i] === '>') {
                inTag = false;
                htmlOutput += currentPhrase[i];
            } else if (inTag) {
                htmlOutput += currentPhrase[i];
            } else {
                if (charCount < newText.length) {
                    htmlOutput += currentPhrase[i];
                    charCount++;
                }
            }
        }
        
        typedTextElement.innerHTML = htmlOutput;
        currentCharIndex--;
        typingSpeed = 50;
        
        if (newText.length === 0) {
            currentCharIndex = 0;
        }
    } else {
        // Typing forward
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = currentPhrase;
        const textOnly = tempDiv.textContent || tempDiv.innerText;
        
        let charCount = 0;
        let htmlOutput = '';
        let inTag = false;
        
        for (let i = 0; i < currentPhrase.length; i++) {
            if (currentPhrase[i] === '<') {
                inTag = true;
                htmlOutput += currentPhrase[i];
            } else if (currentPhrase[i] === '>') {
                inTag = false;
                htmlOutput += currentPhrase[i];
            } else if (inTag) {
                htmlOutput += currentPhrase[i];
            } else {
                if (charCount < currentCharIndex) {
                    htmlOutput += currentPhrase[i];
                    charCount++;
                }
            }
        }
        
        typedTextElement.innerHTML = htmlOutput;
        currentCharIndex++;
        typingSpeed = 100;
    }

    // Get actual text length without HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = currentPhrase;
    const textLength = (tempDiv.textContent || tempDiv.innerText).length;

    // If word is complete
    if (!isDeleting && currentCharIndex > textLength) {
        typingSpeed = 2000;
        isDeleting = true;
    } 
    // If word is deleted
    else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
}

// Initialize typewriter on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeText, 500);
});

// Rest of your JavaScript code stays the same below...
