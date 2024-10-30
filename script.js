// Global variable to track daily caffeine intake
let dailyCaffeineTotal = 0;

// Dark mode toggle function
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}

// Apply dark mode if previously enabled
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

// Function to calculate caffeine intensity and save results
function calculateIntensity() {
    // Get form values
    const strength = document.getElementById("strength").value;
    const size = document.getElementById("size").value;
    const tolerance = document.getElementById("tolerance").value;
    const age = parseInt(document.getElementById("age").value, 10);
    const weight = parseInt(document.getElementById("weight").value, 10);

    // Base caffeine values
    const strengthLevels = { light: 50, medium: 100, strong: 150 };
    const sizeMultipliers = { small: 1, medium: 1.5, large: 2 };
    let caffeineAmount = strengthLevels[strength] * sizeMultipliers[size];

    // Adjust intensity based on age and weight
    if (age < 18) caffeineAmount *= 1.2;
    if (age > 50) caffeineAmount *= 0.9;
    if (weight < 60) caffeineAmount *= 1.1;
    if (weight > 90) caffeineAmount *= 0.8;

    // Determine main intensity message
    let intensityMessage;
    if (tolerance === "low") {
        intensityMessage = caffeineAmount <= 100 ? "You're good! Enjoy your coffee ☕" :
            caffeineAmount <= 150 ? "This might get you a little jittery, darling 😬" : "Proceed with caution! ☠️";
    } else if (tolerance === "moderate") {
        intensityMessage = caffeineAmount <= 150 ? "Nice! You're within your limit 💁‍♀️" :
            caffeineAmount <= 200 ? "Maybe stick to just this cup 😅" :
            caffeineAmount <= 250 ? "It's strong, but you can handle it 💪" : "Whoa there, champ! 🥴";
    } else {
        intensityMessage = caffeineAmount <= 200 ? "You're chilling. Easy peasy ☕💪" :
            caffeineAmount <= 300 ? "You got this, caffeine lover! 😎" :
            caffeineAmount <= 400 ? "You're a boss, you got this 🔥" : "Maybe take it easy next cup 😉";
    }

    const personality = (strength === "strong" && tolerance === "high") ? "Energizer Bunny 🐰" :
                        (strength === "light" && tolerance === "low") ? "Smooth Sipper 🌊" :
                        (size === "large" && tolerance === "moderate") ? "Adventurous Aficionado ☕" : "Classic Coffee Lover ☕";

    // Full result message
    const resultMessage = `<strong>${personality}</strong> - Caffeine Amount for this cup: ${Math.round(caffeineAmount)} mg<br>${intensityMessage}`;

    // Update daily caffeine total
    dailyCaffeineTotal += caffeineAmount;
    const dailyTotalMessage = `Daily Caffeine Total: ${Math.round(dailyCaffeineTotal)} mg`;

    // Caffeine meter settings
    const caffeinePercentage = Math.min((caffeineAmount / 400) * 100, 100);
    const meterColor = caffeinePercentage <= 50 ? "#6a994e" :
                      caffeinePercentage <= 80 ? "#f4a261" : "#e63946";

    // Suggested wait time
    let waitTimeMessage;
    if (tolerance === "low") {
        waitTimeMessage = caffeineAmount > 150 ? "Suggested wait time before next coffee: 4-6 hours" : "Suggested wait time before next coffee: 2-3 hours";
    } else if (tolerance === "moderate") {
        waitTimeMessage = caffeineAmount > 200 ? "Suggested wait time before next coffee: 3-4 hours" : "Suggested wait time before next coffee: 1-2 hours";
    } else {
        waitTimeMessage = caffeineAmount > 300 ? "Suggested wait time before next coffee: 1-2 hours" : "Suggested wait time before next coffee: 30 mins - 1 hour";
    }

    // Alternative drink suggestion
    let drinkSuggestionMessage;
    if (tolerance === "low" && caffeineAmount > 100) {
        drinkSuggestionMessage = "How about a relaxing herbal tea or hot chocolate instead? 🍵";
    } else if (tolerance === "moderate" && caffeineAmount > 200) {
        drinkSuggestionMessage = "Try a green tea or matcha latte for a lighter boost. 🍵";
    } else if (tolerance === "high" && caffeineAmount > 300) {
        drinkSuggestionMessage = "Maybe try an espresso shot or black coffee for a quicker hit. ☕";
    } else {
        drinkSuggestionMessage = "You're good with this coffee, but feel free to mix it up with a decaf next time!";
    }

    // Random coffee fact (ensure coffeeFacts array exists in coffeeFacts.js)
    const randomFact = coffeeFacts[Math.floor(Math.random() * coffeeFacts.length)];
    const coffeeFactMessage = randomFact;

    // Store all data in localStorage for retrieval in results.html
    localStorage.setItem("resultMessage", resultMessage);
    localStorage.setItem("dailyTotalMessage", dailyTotalMessage);
    localStorage.setItem("meterWidth", caffeinePercentage);
    localStorage.setItem("meterColor", meterColor);
    localStorage.setItem("waitTimeMessage", waitTimeMessage);
    localStorage.setItem("drinkSuggestionMessage", drinkSuggestionMessage);
    localStorage.setItem("coffeeFactMessage", coffeeFactMessage);

    // Redirect to results page
    window.location.href = "results.html";
}

// Reset daily caffeine total function
function resetDailyTotal() {
    dailyCaffeineTotal = 0;
    document.getElementById("dailyTotal").innerText = `Daily Caffeine Total: ${dailyCaffeineTotal} mg`;
}
