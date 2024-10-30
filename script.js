function calculateIntensity() {
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

    // Display the result
    document.getElementById("result").innerText = message;
}
