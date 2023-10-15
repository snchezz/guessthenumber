document.addEventListener("DOMContentLoaded", function () {
    const numberInput = document.getElementById("numberInput");
    const checkButton = document.getElementById("checkButton");
    const attemptsContainer = document.getElementById("attempts");

    numberInput.addEventListener("input", function () {
        const value = parseInt(numberInput.value);

        if (isNaN(value)) {
            numberInput.value = "";
        } else {
            numberInput.value = Math.min(99, Math.max(0, value));
        }
    });

    const maxAttempts = 5;
    let attempts = 0;
    const targetNumber = Math.floor(Math.random() * 100);
    // console.log(targetNumber)

    checkButton.addEventListener("click", function () {
        attempts++;

        if (attempts > maxAttempts) {
            alert("You've used all your attempts. The number was " + targetNumber + ".");
            location.reload(); // Reload the page to start a new game
        } else {
            const guessedNumber = parseInt(numberInput.value);

            if (isNaN(guessedNumber)) {
                alert("Please enter a valid number.");
            } else {
                const attemptDiv = document.createElement("div");

                if (guessedNumber < targetNumber) {
                    attemptDiv.textContent += ` - ${translations[currentLanguage].attemptLabel} ${attempts}: ${guessedNumber} | ${translations[currentLanguage].tooLow}`;
                } else if (guessedNumber > targetNumber) {
                    attemptDiv.textContent += ` - ${translations[currentLanguage].attemptLabel} ${attempts}: ${guessedNumber} | ${translations[currentLanguage].tooHigh}`;
                } else {
                    attemptDiv.textContent += ` - ${translations[currentLanguage].attemptLabel} ${attempts}: ${guessedNumber} | ${translations[currentLanguage].congrats}`;
                    alert(translations[currentLanguage].congrats);
                    location.reload(); // Recargar la página para comenzar un nuevo juego
                }
                
                attemptsContainer.appendChild(attemptDiv);
            }

            numberInput.value = "";
        }
    });
});


// Modo oscuro 
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const darkModeButton = document.getElementById("darkModeButton");

    // Verificar si el usuario ya ha configurado el modo oscuro en el pasado
    const isDarkMode = localStorage.getItem("darkMode");

    if (isDarkMode === "enabled") {
        enableDarkMode();
    }

    // Función para habilitar el modo oscuro
    function enableDarkMode() {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
        darkModeButton.textContent = "Modo Claro";
    }

    // Función para deshabilitar el modo oscuro
    function disableDarkMode() {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
        darkModeButton.textContent = "Modo Oscuro";
    }

    // Alternar el modo oscuro cuando se hace clic en el botón
    darkModeButton.addEventListener("click", function () {
        if (body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
});

// Lenguaje
const translations = {
    es: {
        header: "Guess The Number",
        selectNumber: "Selecciona un número del 0 al 99",
        attemptLabel: "Intento número",
        attempt: "Intento número",
        tooLow: "Demasiado bajo",
        tooHigh: "Demasiado alto",
        congrats: "¡Adivinaste el número!",
        attemptsUsed: "Has agotado todos tus intentos. El número era",
        languageButton: "English",
        darkMode: "Modo Oscuro",
    },
    en: {
        header: "Guess The Number",
        selectNumber: "Select a number from 0 to 99",
        attemptLabel: "Attempt",
        attempt: "Attempt",
        tooLow: "Too low",
        tooHigh: "Too high",
        congrats: "Congratulations! You guessed the number.",
        attemptsUsed: "You've used all your attempts. The number was",
        languageButton: "Español",
        darkMode: "Dark Mode",
    },
};


// Definir el idioma actual
let currentLanguage = "es"; // Puedes cambiarlo a "en" para inglés por defecto

// Función para cambiar el idioma
function changeLanguage(newLang) {
    currentLanguage = newLang;
    updateTextElements();
}

// Función para actualizar los elementos de texto
function updateTextElements() {
    document.querySelector("h3").textContent = translations[currentLanguage].header;
    document.querySelector("p").textContent = translations[currentLanguage].selectNumber;
    // Actualiza otros elementos de texto aquí
}

// Inicializar los elementos de texto con el idioma actual
updateTextElements();

// Agregar evento al botón de cambio de idioma
const languageButton = document.getElementById("languageButton");
languageButton.addEventListener("click", function () {
    if (currentLanguage === "es") {
        changeLanguage("en");
    } else {
        changeLanguage("es");
    }
    languageButton.textContent = translations[currentLanguage].languageButton;
});