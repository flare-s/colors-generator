class Color{
    constructor(element, hex) {
        this.element = element;
        this.hex = hex;
        this.locked = false;
    }


    // setting the color to the element
    setHex(hex) {
        this.hex = hex;
        this.element.style.backgroundColor = hex;
        this.element.querySelector(".color__value span").textContent = hex.toUpperCase();
        this.element.querySelector(".color__hex").value = hex;
    }

    // change the state of locked
    setLocked(locked) {
        this.locked = locked;
        if (locked) {
            this.element.querySelector('.color__lock').setAttribute("aria-label", "lock this color");
            this.element.querySelector(".color__lock img").setAttribute('src', 'icons/locked.svg');
        } else {
            this.element.querySelector('.color__lock').setAttribute("aria-label", "unlock this color");
            this.element.querySelector(".color__lock img").setAttribute('src', 'icons/unlocked.svg');
        }
    }

    generateHex() {
        // if this element locked don't change color
        if (this.locked) {
            return;
        }

        // create a random color
        let hexChars = '0123456789ABCDEF';
        let newHex = '#';

        for (let i = 0; i < 6; i++) {
            newHex += hexChars[Math.floor(Math.random() * 16)];
        }

        // set the random color to the element
        this.setHex(newHex);



    }
}

// Copy the content of the text parameter to the clipboard
function copyToClipboard(text) {
    //create a text element and give its value the content you want to copy, because the select method works only on text input or textarea
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
 }


const colorsArray = Array.from(document.querySelectorAll(".color"));
const colors = [];
const generateButton = document.querySelector(".colors__generator");


// loop through the elements and change their colors
const generateColors = () => {
    colors.forEach(color => {
        color.generateHex();
    } );
}

// generating new colors when the page opens for the first time
colorsArray.forEach(color => {
    let colorVal = color.querySelector("label span").textContent;
    // setting a new instance of the color object for each element
    let newColor = new Color(color, colorVal);
    newColor.generateHex();
    // adding the colors elements with their instanced objects to the colors array so we have access to them.
    colors.push(newColor);
})

//generate colors when the space bar in the keyboard is clicked
document.addEventListener("keypress", (e) => {
    if (e.code.toLowerCase() === 'space') {
        generateColors();
    }
});

// generate colors when the button is clicked
generateButton.addEventListener("click", (e) => {
    e.target.blur();
    generateColors();
});


colors.forEach(color => {
    // setting a new color individually by changing the coolor input
    color.element.addEventListener("input", () => {
        let colorInput = color.element.querySelector(".color__hex");
        color.element.style.backgroundColor = colorInput.value;
        color.element.querySelector(".color__value span").textContent = colorInput.value.toUpperCase();
    });


    color.element.addEventListener("click", (e) => {

        // seeting the lock state from the lock button
        if (e.target.classList.contains("color__lock")) {
            color.setLocked(!color.locked);
            e.target.blur();
        }

        //copying the color value by clicking the copy button
        if (e.target.classList.contains("color__copy")) {
            let colorInput = color.element.querySelector(".color__hex");
            copyToClipboard(colorInput.value);
            e.target.focus();
            e.target.blur();
            e.target.classList.add("active");
            setTimeout(() => {
                e.target.classList.remove("active");
            }, 1000);
        }
    })
});




