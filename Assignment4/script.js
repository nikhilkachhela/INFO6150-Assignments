const form = document.getElementById("feedbackForm");
const submitBtn = document.getElementById("submitBtn");

// Validation rules
const validators = {
  firstName: val => /^[A-Za-z0-9]{2,30}$/.test(val),
  lastName: val => /^[A-Za-z0-9]{2,30}$/.test(val),
  email: val => /^[A-Za-z0-9._%+-]+@northeastern\.edu$/.test(val),
  phone: val => /^\(\d{3}\) \d{3}-\d{4}$/.test(val),
  zip: val => /^\d{5}$/.test(val),
  addr1: val => val.trim().length > 0,
  listBox: val => val !== "",
  extraTxt: val => val.trim().length > 0,
  hear: () => document.querySelector('input[name="hear"]:checked') !== null,
  comments: val => val.trim().length >= 5
};

// Error messages
const errors = {
  firstName: "First name must be 2–30 letters/numbers",
  lastName: "Last name must be 2–30 letters/numbers",
  email: "Must use Northeastern email",
  phone: "Format: (XXX) XXX-XXXX",
  zip: "Must be 5 digits",
  addr1: "Street Address 1 is required",
  listBox: "Please select a drink",
  extraTxt: "This field is required",
  hear: "Please select an option",
  comments: "Please enter at least 5 characters"
};

function showError(id, valid) {
  const err = document.getElementById(id + "Err");
  if (err) err.textContent = valid ? "" : errors[id];
}

// Phone formatting
function formatPhone(input) {
  let val = input.value.replace(/\D/g, "");
  if (val.length > 3 && val.length <= 6)
    input.value = `(${val.slice(0, 3)}) ${val.slice(3)}`;
  else if (val.length > 6)
    input.value = `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6, 10)}`;
  else
    input.value = val;
}

// Attach live validation
["firstName", "lastName", "email", "phone", "zip", "addr1"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    if (id === "phone") formatPhone(document.getElementById("phone"));
    let valid = validators[id](document.getElementById(id).value);
    showError(id, valid);
    checkForm();
  });
});

// Drinks dropdown logic
document.getElementById("listBox").addEventListener("change", e => {
  let valid = validators.listBox(e.target.value);
  showError("listBox", valid);

  const area = document.getElementById("dynamicArea");
  area.innerHTML = "";
  if (e.target.value) {
    let chk = document.createElement("input");
    chk.type = "checkbox"; chk.id = "dynamicChk";
    let lbl = document.createElement("label");
    lbl.textContent = " Extra field?";
    area.appendChild(chk); area.appendChild(lbl);

    chk.addEventListener("change", ev => {
      if (ev.target.checked) {
        let txt = document.createElement("input");
        txt.type = "text"; txt.id = "extraTxt"; txt.required = true;
        let errSpan = document.createElement("span");
        errSpan.id = "extraTxtErr"; errSpan.className = "error";
        area.appendChild(document.createElement("br"));
        area.appendChild(txt);
        area.appendChild(errSpan);

        txt.addEventListener("input", () => {
          let valid = validators.extraTxt(txt.value);
          showError("extraTxt", valid);
          checkForm();
        });
      } else {
        area.innerHTML = "";
      }
      checkForm();
    });
  }
  checkForm();
});

// Address2 counter
document.getElementById("addr2").addEventListener("input", e => {
  document.getElementById("counter").textContent = `${e.target.value.length}/20`;
});

// Radio buttons validation
document.querySelectorAll('input[name="hear"]').forEach(radio => {
  radio.addEventListener("change", () => {
    let valid = validators.hear();
    showError("hear", valid);
    checkForm();
  });
});

// Comments validation
document.getElementById("comments").addEventListener("input", () => {
  let valid = validators.comments(document.getElementById("comments").value);
  showError("comments", valid);
  checkForm();
});

// Enable submit only if all valid
function checkForm() {
  let allValid = ["firstName", "lastName", "email", "phone", "zip", "addr1", "comments"].every(id =>
    validators[id](document.getElementById(id)?.value || "")
  ) && validators.listBox(document.getElementById("listBox").value)
    && validators.hear();

  const extra = document.getElementById("extraTxt");
  if (extra) {
    allValid = allValid && validators.extraTxt(extra.value);
  }

  submitBtn.disabled = !allValid;
}

// Submit
form.addEventListener("submit", e => {
  e.preventDefault();
  const table = document.getElementById("resultsTable");
  let row = table.insertRow();

  let selectedHear = document.querySelector('input[name="hear"]:checked')?.value || "";

  let values = [
    document.getElementById("firstName").value,
    document.getElementById("lastName").value,
    document.getElementById("email").value,
    document.getElementById("phone").value,
    document.getElementById("zip").value,
    document.getElementById("addr1").value,
    document.getElementById("addr2").value || "",
    document.getElementById("listBox").value,
    selectedHear,
    document.getElementById("extraTxt")?.value || "",
    document.getElementById("comments").value
  ];

  values.forEach(val => {
    let cell = row.insertCell();
    cell.textContent = val;
  });

  form.reset();
  document.getElementById("counter").textContent = "0/20";
  document.getElementById("dynamicArea").innerHTML = "";
  submitBtn.disabled = true;
});

// Reset clears dynamic fields
form.addEventListener("reset", () => {
  document.getElementById("counter").textContent = "0/20";
  document.getElementById("dynamicArea").innerHTML = "";
  submitBtn.disabled = true;
});

// ----------------- Chatbot logic -----------------
const chatBtn = document.getElementById("chatbot");
const chatWin = document.getElementById("chatWindow");
const chatMsgs = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");

// hidden on load
chatWin.style.display = "none";

const faqs = {
  email: "You must use your Northeastern email (example: student@northeastern.edu).",
  phone: "Phone must be in format (XXX) XXX-XXXX.",
  zip: "Zip code must be exactly 5 digits.",
  required: "All fields are required except Street Address 2.",
  address: "Street Address 2 is optional."
};

// toggle open/close
chatBtn.addEventListener("click", () => {
  if (chatWin.style.display === "flex") {
    chatWin.style.display = "none";
  } else {
    chatWin.style.display = "flex";
  }
});

// Chat send with styled bubbles
sendBtn.addEventListener("click", () => {
  let q = chatInput.value.trim();
  if (!q) return;

  // User bubble
  let userMsg = document.createElement("div");
  userMsg.className = "chat-user";
  userMsg.textContent = q;
  chatMsgs.appendChild(userMsg);

  // Bot response
  let ans = "Sorry, I don’t know that yet. Please check the instructions.";
  for (const key in faqs) {
    if (q.toLowerCase().includes(key)) { ans = faqs[key]; break; }
  }

  let botMsg = document.createElement("div");
  botMsg.className = "chat-bot";
  botMsg.textContent = ans;
  chatMsgs.appendChild(botMsg);

  chatInput.value = "";
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
});

// allow Enter key to send
chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendBtn.click();
  }
});
