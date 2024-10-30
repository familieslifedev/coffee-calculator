function calculateIntensity() {
    // Clear previous result content
    document.getElementById("result").innerHTML = "";

    // Get values from the form
    const strength = document.getElementById("strength").value;
    const size = document.getElementById("size").value;
    const tolerance = document.getElementById("tolerance").value;

    // Set base caffeine values for each strength and size
    const strengthLevels = { light: 50, medium: 100, strong: 150 };
    const sizeMultipliers = { small: 1, medium: 1.5, large: 2 };

    // Calculate total caffeine amount
    const caffeineAmount = strengthLevels[strength] * sizeMultipliers[size];

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
        waitTimeMessage = caffeineAmount > 150 ? "Suggested wait time: 4-6 hours" : "Suggested wait time: 2-3 hours";
    } else if (tolerance === "moderate") {
        waitTimeMessage = caffeineAmount > 200 ? "Suggested wait time: 3-4 hours" : "Suggested wait time: 1-2 hours";
    } else if (tolerance === "high") {
        waitTimeMessage = caffeineAmount > 300 ? "Suggested wait time: 1-2 hours" : "Suggested wait time: 30 mins - 1 hour";
    }

    // Display the wait time message
    const waitTimeElement = document.createElement("p");
    waitTimeElement.innerText = waitTimeMessage;
    waitTimeElement.style.marginTop = "10px";
    waitTimeElement.style.color = "#4a4e69";
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
    drinkSuggestionElement.style.marginTop = "10px";
    drinkSuggestionElement.style.color = "#6a994e";
    resultElement.appendChild(drinkSuggestionElement);

    // Display a random coffee fact
    const randomFact = coffeeFacts[Math.floor(Math.random() * coffeeFacts.length)];
    const factElement = document.createElement("p");
    factElement.innerText = randomFact;
    factElement.style.marginTop = "15px";
    factElement.style.color = "#4a4e69";
    resultElement.appendChild(factElement);
}
