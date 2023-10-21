const calories = document.querySelector(".bmr-calculator .result .calories");
const calculateBtn = document.querySelector(".bmr-calculator .result .calculate-btn");
const age = document.querySelector(".bmr-calculator form #age");
const height = document.querySelector(".bmr-calculator form #Height");
const weight = document.querySelector(".bmr-calculator form #Weight");

// Now, for the new elements
const MildWeightLossPlaceholder = document.querySelector(".bmr-calculator .result-message .loss1");
const WeightLossPlaceholder = document.querySelector(".bmr-calculator .result-message .loss2");
const ExtremeWeightLossPlaceholder = document.querySelector(".bmr-calculator .result-message .loss3");
const MildWeightGainPlaceholder = document.querySelector(".bmr-calculator .result-message .gain1");
const WeightGainPlaceholder = document.querySelector(".bmr-calculator .result-message .gain2");
const ExtremeWeightGainPlaceholder = document.querySelector(".bmr-calculator .result-message .gain3");

// Change the display property of the result message elements
document.querySelectorAll('.bmr-calculator .result-message').forEach(function(resultMessage) {
    resultMessage.style.display = 'none';
});

calculateBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const userAge = parseFloat(age.value);
    const userHeight = parseFloat(height.value);
    const userWeight = parseFloat(weight.value);
    const userGender = document.querySelector('input[name="gender"]:checked').value;
    const activityLevel = document.getElementById("activity-level").value;

    if (isNaN(userAge) || isNaN(userHeight) || isNaN(userWeight)) {
        calories.textContent = "Please enter a valid age, height, and weight.";
        MildWeightLossPlaceholder.textContent = "Please enter a valid age, height, and weight.";
        WeightLossPlaceholder.textContent = "Please enter a valid age, height, and weight.";
        ExtremeWeightLossPlaceholder.textContent = "Please enter a valid age, height, and weight.";
        MildWeightGainPlaceholder.textContent = "Please enter a valid age, height, and weight.";
        WeightGainPlaceholder.textContent = "Please enter a valid age, height, and weight.";
        ExtremeWeightGainPlaceholder.textContent = "Please enter a valid age, height, and weight.";
        return;
    }

    const userBMR = calculateBMR(userWeight, userHeight, userAge, multipliers, userGender, activityLevel);
    const MildWeightLoss = userBMR - 250;
    const WeightLoss = userBMR - 500;
    const ExtremeWeightLoss = userBMR - 1000;
    const MildWeightGain = userBMR + 250;
    const WeightGain = userBMR + 500;
    const ExtremeWeightGain = userBMR + 1000;

    // Change the display property of the result message elements to 'block'
    document.querySelectorAll('.bmr-calculator .result-message').forEach(function(resultMessage) {
        resultMessage.style.display = 'block';
    });

    calories.textContent = "Maintenance Calories: " + userBMR.toFixed(2);
    MildWeightLossPlaceholder.textContent = "Mild Weight Loss (Lose 0.5lbs per week): " + MildWeightLoss.toFixed(2);
    WeightLossPlaceholder.textContent = "Weight Loss (Lose 1lbs per week): " + WeightLoss.toFixed(2);
    ExtremeWeightLossPlaceholder.textContent = "Extreme Weight Loss (Lose 2lbs per week): " + ExtremeWeightLoss.toFixed(2);
    MildWeightGainPlaceholder.textContent = "Mild Weight Gain (Gain 0.5lbs per week): " + MildWeightGain.toFixed(2);
    WeightGainPlaceholder.textContent = "Weight Gain (Gain 1lbs per week): " + WeightGain.toFixed(2);
    ExtremeWeightGainPlaceholder.textContent = "Extreme Weight Gain (Gain 2lbs per week): " + ExtremeWeightGain.toFixed(2);
});

const multipliers = {
    'extra-active': 1.9,
    'very-active': 1.725,
    'lightly-active': 1.375,
    'moderately-active': 1.55,
    'sedentary': 1.2
};

const calculateBMR = (weight, height, age, multipliers, gender, activityLevel) => {
    let bmr;
    if (gender === "male") {
        bmr = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
    } else {
        bmr = 9.247 * weight + 3.098 * height - 4.330 * age + 447.593;
    }

    const activityMultiplier = multipliers[activityLevel];
    return bmr * activityMultiplier;
};
