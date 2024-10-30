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
    if (tolerance === "low" && caffeineAmount > 150) {
        message = "Proceed with caution! ☠️ This is strong for you.";
    } else if (tolerance === "moderate" && caffeineAmount > 200) {
        message = "Maybe stick to one cup 😅";
    } else if (tolerance === "high" && caffeineAmount > 300) {
        message = "It's strong, but you can handle it 💪";
    } else {
        message = "Safe to drink another cup! ☕";
    }

    // Display the result
    document.getElementById("result").innerText = message;
}
