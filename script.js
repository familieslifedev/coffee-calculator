// Global variable to track daily caffeine intake
let dailyCaffeineTotal = 0;

// Dark mode toggle function
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Main function to calculate caffeine intensity
function calculateIntensity() {
    // Clear previous result content
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = "";

    // Get values from the form
    const strength = document.getElementById("strength").value;
    const size = document.getElementById("size").value;
    const tolerance = document.getElementById("tolerance").value;
    const age = parseInt(document.getElementById("age").value, 10);
    const weight = parseInt(document.getElementById("weight").value, 10);

    // Set base caffeine values for each strength and size
    const strengthLevels = { light: 50, medium: 100, strong: 150 };
    const sizeMultipliers = { small: 1, medium: 1.5, large: 2 };

    // Calculate total caffeine amount
    let caffeineAmount = strengthLevels[strength] * sizeMultipliers[size];

    // Adjust intensity based on age and weight
    if (age < 18) {
        caffeineAmount *= 1.2; // Younger people may be more sensitive
    } else if (age > 50) {
        caffeineAmount *= 0.9; // Older people may need slightly less
    }

    if (weight < 60) {
        caffeineAmount *= 1.1; // Lower weight = higher sensitivity
    } else if (weight > 90) {
        caffeineAmount *= 0.8; // Higher weight = lower sensitivity
    }

    // Determine main intensity message based on tolerance and caffeine amount
    let intensityMessage;
    if (tolerance === "low") {
        intensityMessage = caffeineAmount <= 100 ? "You're good! Enjoy your coffee ☕" :
            caffeineAmount <= 150 ? "This might get you a little jittery, darling 😬" : "Proceed with caution! ☠️";
    } else if (tolerance === "moderate") {
        intensityMessage = caffeineAmount <= 150 ? "Nice! You're well within your limit 💁‍♀️" :
            caffeineAmount <= 200 ? "Maybe stick to just this cup 😅" : 
            caffeineAmount <= 250 ? "It's strong, but you can handle it 💪" : "Whoa there, champ! This might be a bit much 🥴";
    } else {
        intensityMessage = caffeineAmount <= 200 ? "You're chilling. Easy peasy ☕💪" :
            caffeineAmount <= 300 ? "You got this, caffeine lover! 😎" : 
            caffeineAmount <= 400 ? "It's strong, but you're a boss, you got this 🔥" : "Even for you, this is a big one. Maybe take it easy next cup 😉";
    }

    // Determine personality based on choices
    const personality = (strength === "strong" && tolerance === "high") ? "Energizer Bunny 🐰" :
                        (strength === "light" && tolerance === "low") ? "Smooth Sipper 🌊" :
                        (size === "large" && tolerance === "moderate") ? "Adventurous Aficionado ☕" : "Classic Coffee Lover ☕";

    // Display main result message with personality and caffeine amount
    resultElement.innerHTML = `${personality} - Caffeine Amount for this cup: ${caffeineAmount} mg<br>${intensityMessage}`;

    // Update the daily caffeine total
    dailyCaffeineTotal += caffeineAmount;
    document.getElementById("dailyTotal").innerText = `Daily Caffeine Total: ${dailyCaffeineTotal} mg`;

    // Update the caffeine meter bar
    const meterBar = document.getElementById("meter-bar");
    const caffeinePercentage = Math.min((caffeineAmount / 400) * 100, 100);
    meterBar.style.width = caffeinePercentage + "%";
    meterBar.style.backgroundColor = caffeinePercentage <= 50 ? "#6a994e" : 
                                     caffeinePercentage <= 80 ? "#f4a261" : "#e63946";

    // Display suggested wait time based on caffeine amount and tolerance
    let waitTimeMessage;
    if (tolerance === "low") {
        waitTimeMessage = caffeineAmount > 150 ? "Suggested wait time before next coffee: 4-6 hours" : "Suggested wait time before next coffee: 2-3 hours";
    } else if (tolerance === "moderate") {
        waitTimeMessage = caffeineAmount > 200 ? "Suggested wait time before next coffee: 3-4 hours" : "Suggested wait time before next coffee: 1-2 hours";
    } else {
        waitTimeMessage = caffeineAmount > 300 ? "Suggested wait time before next coffee: 1-2 hours" : "Suggested wait time before next coffee: 30 mins - 1 hour";
    }

    // Display the wait time message
    const waitTimeElement = document.createElement("p");
    waitTimeElement.innerText = waitTimeMessage;
    waitTimeElement.classList.add("wait-time");
    resultElement.appendChild(waitTimeElement);

    // Suggest an alternative drink if caffeine is too high
    let alternativeDrink;
    if (tolerance === "low" && caffeineAmount > 100) {
        alternativeDrink = "How about a relaxing herbal tea or hot chocolate instead? 🍵";
    } else if (tolerance === "moderate" && caffeineAmount > 200) {
        alternativeDrink = "Try a green tea or matcha latte for a lighter boost. 🍵";
    } else if (tolerance === "high" && caffeineAmount > 300) {
        alternativeDrink = "If you're really craving it, maybe try an espresso shot or black coffee for a quicker hit. ☕";
    } else {
        alternativeDrink = "You're good with this coffee, but feel free to mix it up with a decaf next time!";
    }

    // Display the alternative drink suggestion
    const drinkSuggestionElement = document.createElement("p");
    drinkSuggestionElement.innerText = alternativeDrink;
    drinkSuggestionElement.classList.add("drink-suggestion");
    resultElement.appendChild(drinkSuggestionElement);

    // Display a random coffee fact
    const randomFact = coffeeFacts[Math.floor(Math.random() * coffeeFacts.length)];
    const factElement = document.createElement("p");
    factElement.innerText = randomFact;
    factElement.classList.add("coffee-fact");
    resultElement.appendChild(factElement);
}

// Reset daily caffeine total function
function resetDailyTotal() {
    dailyCaffeineTotal = 0;
    document.getElementById("dailyTotal").innerText = `Daily Caffeine Total: ${dailyCaffeineTotal} mg`;
}
