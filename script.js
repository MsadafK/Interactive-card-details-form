// DOM Elements
const name_input = document.getElementById("name");
const card_number_input = document.getElementById("card-number");
const expiry_month = document.getElementById("expiry-month");
const expiry_year = document.getElementById("expiry-year");
const cvc_input = document.getElementById("cvc");
const form = document.querySelector(".form");
const cardNumberInput = document.getElementById("card-number");
const completedSection = document.querySelector(".main__completed");

// Card display elements
const cardNumberDisplay = document.querySelector(
  ".header__card-front-div__text-div__text__card-number"
);
const cardNameDisplay = document.querySelector(
  ".header__card-front-div__text-div__text__date-div__name"
);
const cardExpiryDisplay = document.querySelector(
  ".header__card-front-div__text-div__text__date-div__date"
);
const cardCvcDisplay = document.querySelector(
  ".header__card-back-div__text-div__text"
);

const nameRegex = /^[a-zA-Z\s]{2,}$/;
const creditCardRegex =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/;

function validateCreditCardNumber(cardNumber) {
  // Remove any spaces or dashes from the card number
  const cleanedNumber = cardNumber.replace(/[\s-]/g, "");
  return creditCardRegex.test(cleanedNumber);
}

function toggle_error_message(input, message) {
  let parent_el = input.closest(".input_parent-div") || input.parentElement;
  let error_span_el = parent_el.querySelector(".form__input-div__error");

  if (message) {
    input.style.borderColor = "hsl(0, 100%, 66%)";
    error_span_el.textContent = message;
    error_span_el.classList.add("error");
  } else {
    input.style.borderColor = "hsl(270, 3%, 87%)";
    error_span_el.textContent = "";
    error_span_el.classList.remove("error");
  }
}

function toggle_error_message_for_expiry_date(input, message) {
  let parent_el = input.closest(".input_parent-div") || input.parentElement;
  parent_el = parent_el.parentElement;
  let error_span_el = parent_el.querySelector(".form__input-div__error");
  input = input.parentElement.querySelectorAll(".form__expiry-date-div__input");

  if (message) {
    input.forEach((el) =>
      el.value === ""
        ? (el.style.borderColor = "hsl(0, 100%, 66%)")
        : (el.style.borderColor = "hsl(270, 3%, 87%)")
    );
    error_span_el.textContent = message;
    error_span_el.classList.add("error");
  } else {
    input.forEach((el) =>
      el.value === ""
        ? (el.style.borderColor = "hsl(0, 100%, 66%)")
        : (el.style.borderColor = "hsl(270, 3%, 87%)")
    );
    error_span_el.textContent = "";
    error_span_el.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // name input
  if (nameRegex.test(name_input.value.trim())) {
    toggle_error_message(name_input);
    cardNameDisplay.textContent = name_input.value.toUpperCase();
  } else {
    toggle_error_message(name_input, "Please provide a valid name");
    isValid = false;
  }

  // card-number input
  if (validateCreditCardNumber(card_number_input.value)) {
    toggle_error_message(card_number_input);
    let value = card_number_input.value.replace(/[\s-]/g, "");
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }
    cardNumberDisplay.textContent = formattedValue.slice(0, 19); // Limit to 16 digits + 3 spaces
  } else {
    toggle_error_message(card_number_input, "Wrong format, numbers only");
    isValid = false;
  }

  // expiry month and year input
  if (expiry_month.value.trim() === "" || expiry_year.value.trim() === "") {
    toggle_error_message_for_expiry_date(expiry_month, "Can't be blank");
    isValid = false;
  } else {
    toggle_error_message_for_expiry_date(expiry_month);
    const month = expiry_month.value;
    const year = expiry_year.value;
    cardExpiryDisplay.textContent = `${month}/${year}`;
  }

  // cvc input
  if (cvc_input.value.trim() === "") {
    toggle_error_message(cvc_input, "Can't be blank");
    isValid = false;
  } else {
    toggle_error_message(cvc_input);
    cardCvcDisplay.textContent = cvc_input.value;
  }

  if (isValid) {
    form.style.display = "none";
    completedSection.style.display = "block";
  }
});

// Continue button in completed section
const continueButton = document.querySelector(".main__completed__button");
continueButton.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  form.style.display = "block";
  completedSection.style.display = "none";
  // Reset card display
  cardNameDisplay.textContent = "JANE APPLESEED";
  cardNumberDisplay.textContent = "0000 0000 0000 0000";
  cardExpiryDisplay.textContent = "00/00";
  cardCvcDisplay.textContent = "000";
});

// name_input.addEventListener("change", (e) => {
//   cardholder_name.textContent = e.target.value;
// });
