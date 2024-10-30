function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function calculateIntensity() {
    // Clear previous result content
    document.getElementById("result").innerHTML = "";

    // Get values from the form
    const strength = document.getElementById("strength").value;
    const size = document.getElementById("size").value;
    const tolerance = document.getElementById("tolerance").value;
    const age = parseInt(document.getElementById("age").value, 10);
    const weight = parseInt(document.getElementById("weight").value, 10);

    // Set base caffeine values for each strength and size
    const strengthLevels = { light: 50, medium: 100, strong: 150 };
    const sizeMultipliers = { small: 1, medium: 1.5, large: 2 };

    let dailyCaffeineTotal = 0;  // Initialize a global variable to track daily intake

    // Calculate total caffeine amount
    const caffeineAmount = strengthLevels[strength] * sizeMultipliers[size];

    // Adjust intensity based on age and weight
    let adjustedCaffeine = caffeineAmount;
    if (age < 18) {
        adjustedCaffeine *= 1.2; // Younger people may be more sensitive
    } else if (age > 50) {
        adjustedCaffeine *= 0.9; // Older people may need slightly less
    }

    if (weight < 60) {
        adjustedCaffeine *= 1.1; // Lower weight = higher sensitivity
    } else if (weight > 90) {
        adjustedCaffeine *= 0.8; // Higher weight = lower sensitivity
    }

    // Determine warning message based on tolerance and caffeine amount
    let message;
    if (tolerance === "low") {
        if (caffeineAmount <= 100) {
            message = "You're good! Enjoy your coffee ☕";
        } else if (caffeineAmount <= 150) {
            message = "This might get you a little jittery, darling 😬";
        } else {
            message = "Proceed with caution! ☠️ This is strong for you.";
        }
    } else if (tolerance === "moderate") {
        if (caffeineAmount <= 150) {
            message = "Nice! You're well within your limit 💁‍♀️";
        } else if (caffeineAmount <= 200) {
            message = "Maybe stick to just this cup 😅";
        } else if (caffeineAmount <= 250) {
            message = "It's strong, but you can handle it 💪";
        } else {
            message = "Whoa there, champ! This might be a bit much 🥴";
        }
    } else if (tolerance === "high") {
        if (caffeineAmount <= 200) {
            message = "You're chilling. Easy peasy ☕💪";
        } else if (caffeineAmount <= 300) {
            message = "You got this, caffeine lover! Go ahead! 😎";
        } else if (caffeineAmount <= 400) {
            message = "It's strong, but you're a boss, you got this 🔥";
        } else {
            message = "Even for you, this is a big one. Maybe take it easy next cup 😉";
        }
    }

    // Determine personality based on choices
    let personality;
    if (strength === "strong" && tolerance === "high") {
        personality = "Energizer Bunny 🐰";
    } else if (strength === "light" && tolerance === "low") {
        personality = "Smooth Sipper 🌊";
    } else if (size === "large" && tolerance === "moderate") {
        personality = "Adventurous Aficionado ☕";
    } else {
        personality = "Classic Coffee Lover ☕";
    }

    // Message about current cup
    const message = `${personality} - Caffeine Amount for this cup: ${caffeineAmount} mg`;

    // Display the result for current cup
    document.getElementById("result").innerText = message;
    
    // Update the total caffeine intake for the day
    dailyCaffeineTotal += caffeineAmount;
    document.getElementById("dailyTotal").innerText = `Daily Caffeine Total: ${dailyCaffeineTotal} mg`;
}

// Reset daily caffeine total for a fresh start each day
function resetDailyTotal() {
    dailyCaffeineTotal = 0;
    document.getElementById("dailyTotal").innerText = `Daily Caffeine Total: ${dailyCaffeineTotal} mg`;
}

    // Display the main intensity message
    const resultElement = document.getElementById("result");
    resultElement.innerText = message;

    // Update the caffeine meter bar
    const meterBar = document.getElementById("meter-bar");
    const caffeinePercentage = Math.min((caffeineAmount / 400) * 100, 100);
    meterBar.style.width = caffeinePercentage + "%";

    // Change the bar color based on intensity
    if (caffeinePercentage <= 50) {
        meterBar.style.backgroundColor = "#6a994e"; // Green for low caffeine
    } else if (caffeinePercentage <= 80) {
        meterBar.style.backgroundColor = "#f4a261"; // Orange for medium caffeine
    } else {
        meterBar.style.backgroundColor = "#e63946"; // Red for high caffeine
    }

    // Calculate and display suggested wait time based on tolerance and caffeine amount
    let waitTimeMessage;
    if (tolerance === "low") {
        waitTimeMessage = caffeineAmount > 150 ? "Suggested wait time before next coffee: 4-6 hours" : "Suggested wait time before next coffee: 2-3 hours";
    } else if (tolerance === "moderate") {
        waitTimeMessage = caffeineAmount > 200 ? "Suggested wait time before next coffee: 3-4 hours" : "Suggested wait time before next coffee: 1-2 hours";
    } else if (tolerance === "high") {
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
