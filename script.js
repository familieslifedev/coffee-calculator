// Track daily caffeine intake
let dailyCaffeineTotal = 0;

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Adjust the overlay style if it is visible
    const resultOverlay = document.getElementById("resultOverlay");
    if (resultOverlay && resultOverlay.style.display === "flex") {
        resultOverlay.classList.toggle("dark-mode");
    }
}

// Calculate caffeine intensity
function calculateIntensity() {
    console.log("Calculating caffeine intensity...");

    // Clear previous results
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = "";

    // Get input values
    const strength = document.getElementById("strength").value;
    const size = document.getElementById("size").value;
    const tolerance = document.getElementById("tolerance").value;
    const age = parseInt(document.getElementById("age").value, 10);
    const weight = parseInt(document.getElementById("weight").value, 10);

    // Set caffeine values by strength and size
    const strengthLevels = { light: 50, medium: 100, strong: 150 };
    const sizeMultipliers = { small: 1, medium: 1.5, large: 2 };

    // Calculate total caffeine amount
    let caffeineAmount = strengthLevels[strength] * sizeMultipliers[size];

    // Adjust caffeine based on age and weight
    if (age < 18) caffeineAmount *= 1.2; // Younger people may be more sensitive
    if (age > 50) caffeineAmount *= 0.9; // Older people may need less caffeine
    if (weight < 60) caffeineAmount *= 1.1; // Lower weight = higher sensitivity
    if (weight > 90) caffeineAmount *= 0.8; // Higher weight = lower sensitivity

    // Generate main message based on tolerance and caffeine amount
    const intensityMessage = getIntensityMessage(caffeineAmount, tolerance);

    // Determine personality message
    const personality = getPersonalityMessage(strength, tolerance, size);

    // Append main result message
    addMessage(resultElement, `<strong>${personality}</strong> - Caffeine Amount for this cup: ${Math.round(caffeineAmount)} mg<br>${intensityMessage}`, "main-message");

    // Update daily caffeine total
    dailyCaffeineTotal += caffeineAmount;
    updateDailyTotal(dailyCaffeineTotal);

    // Update the caffeine meter bar
    updateCaffeineMeter(caffeineAmount);

    // Add wait time message
    addMessage(resultElement, getWaitTimeMessage(caffeineAmount, tolerance), "wait-time");

    // Suggest an alternative drink if caffeine is too high
    addMessage(resultElement, getAlternativeDrinkMessage(caffeineAmount, tolerance), "drink-suggestion");

    // Display a random coffee fact
    addMessage(resultElement, getRandomCoffeeFact(), "coffee-fact");

    // Show result overlay
    toggleResultOverlay(true);
}

// Generate caffeine intensity message
function getIntensityMessage(caffeineAmount, tolerance) {
    if (tolerance === "low") {
        if (caffeineAmount <= 100) return "You're good! Enjoy your coffee ☕";
        if (caffeineAmount <= 150) return "This might get you a little jittery, darling 😬";
        return "Proceed with caution! ☠️";
    }
    if (tolerance === "moderate") {
        if (caffeineAmount <= 150) return "Nice! You're well within your limit 💁‍♀️";
        if (caffeineAmount <= 200) return "Maybe stick to just this cup 😅";
        if (caffeineAmount <= 250) return "It's strong, but you can handle it 💪";
        return "Whoa there, champ! This might be a bit much 🥴";
    }
    if (caffeineAmount <= 200) return "You're chilling. Easy peasy ☕💪";
    if (caffeineAmount <= 300) return "You got this, caffeine lover! 😎";
    if (caffeineAmount <= 400) return "It's strong, but you're a boss, you got this 🔥";
    return "Even for you, this is a big one. Maybe take it easy next cup 😉";
}

// Generate personality message
function getPersonalityMessage(strength, tolerance, size) {
    if (strength === "strong" && tolerance === "high") return "Energizer Bunny 🐰";
    if (strength === "light" && tolerance === "low") return "Smooth Sipper 🌊";
    if (size === "large" && tolerance === "moderate") return "Adventurous Aficionado ☕";
    return "Classic Coffee Lover ☕";
}

// Generate wait time message
function getWaitTimeMessage(caffeineAmount, tolerance) {
    if (tolerance === "low") return caffeineAmount > 150 ? "Suggested wait time before next coffee: 4-6 hours" : "Suggested wait time before next coffee: 2-3 hours";
    if (tolerance === "moderate") return caffeineAmount > 200 ? "Suggested wait time before next coffee: 3-4 hours" : "Suggested wait time before next coffee: 1-2 hours";
    return caffeineAmount > 300 ? "Suggested wait time before next coffee: 1-2 hours" : "Suggested wait time before next coffee: 30 mins - 1 hour";
}

// Generate alternative drink suggestion
function getAlternativeDrinkMessage(caffeineAmount, tolerance) {
    if (tolerance === "low" && caffeineAmount > 100) return "How about a relaxing herbal tea or hot chocolate instead? 🍵";
    if (tolerance === "moderate" && caffeineAmount > 200) return "Try a green tea or matcha latte for a lighter boost. 🍵";
    if (tolerance === "high" && caffeineAmount > 300) return "If you're really craving it, maybe try an espresso shot or black coffee for a quicker hit. ☕";
    return "You're good with this coffee, but feel free to mix it up with a decaf next time!";
}

// Display random coffee fact
function getRandomCoffeeFact() {
    return coffeeFacts[Math.floor(Math.random() * coffeeFacts.length)];
}

// Update caffeine meter
function updateCaffeineMeter(caffeineAmount) {
    const meterBar = document.getElementById("meter-bar");
    if (meterBar) {
        const caffeinePercentage = Math.min((caffeineAmount / 400) * 100, 100);
        meterBar.style.width = `${caffeinePercentage}%`;
        meterBar.style.backgroundColor = caffeinePercentage <= 50 ? "#6a994e" : caffeinePercentage <= 80 ? "#f4a261" : "#e63946";
        console.log("Caffeine meter updated.");
    } else {
        console.warn("Meter bar not found.");
    }
}

// Update daily caffeine total display
function updateDailyTotal(total) {
    const dailyTotalElement = document.getElementById("dailyTotal");
    if (dailyTotalElement) {
        dailyTotalElement.innerText = `Daily Caffeine Total: ${Math.round(total)} mg`;
    }
}

// Add a message to the result element
function addMessage(parentElement, messageContent, className) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = messageContent;
    messageElement.classList.add(className);
    parentElement.appendChild(messageElement);
    console.log(`${className} added.`);
}

// Toggle the visibility of the result overlay
function toggleResultOverlay(show) {
    const mainContainer = document.getElementById("mainContainer");
    const resultOverlay = document.getElementById("resultOverlay");
    if (mainContainer && resultOverlay) {
        mainContainer.style.display = show ? "none" : "block";
        resultOverlay.style.display = show ? "flex" : "none";
        console.log(show ? "Result overlay displayed." : "Main container displayed.");
    } else {
        console.warn("Main container or result overlay not found.");
    }
}

// Reset daily caffeine total
function resetDailyTotal() {
    dailyCaffeineTotal = 0;
    updateDailyTotal(dailyCaffeineTotal);
}

// Go back to the main form
function goBack() {
    toggleResultOverlay(false);
}
