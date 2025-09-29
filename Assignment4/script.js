const form = document.getElementById('studentForm');
const submitBtn = document.getElementById('submitBtn');
const errors = {
  name: "Name must be 3-30 letters only",
  email: "Must be Northeastern email (@northeastern.edu)",
  phone: "Format: (XXX) XXX-XXXX",
  zip: "Zip must be 5 digits",
  addr1: "Address 1 is required"
};

const validators = {
  name: val => /^[A-Za-z ]{3,30}$/.test(val),
  email: val => /^[A-Za-z0-9._%+-]+@northeastern\.edu$/.test(val),
  phone: val => /^\(\d{3}\) \d{3}-\d{4}$/.test(val),
  zip: val => /^\d{5}$/.test(val),
  addr1: val => val.trim().length > 0
};

function showError(id, valid) {
  const err = document.getElementById(id + "Err");
  err.textContent = valid ? "" : errors[id];
}

function formatPhone(input) {
  let val = input.value.replace(/\D/g, "");
  if (val.length > 3 && val.length <= 6)
    input.value = `(${val.slice(0, 3)}) ${val.slice(3)}`;
  else if (val.length > 6)
    input.value = `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6, 10)}`;
  else
    input.value = val;
}

["name", "email", "phone", "zip", "addr1"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    if (id === "phone") formatPhone(document.getElementById("phone"));
    let valid = validators[id](document.getElementById(id).value);
    showError(id, valid);
    checkForm();
  });
});

// Address 2 counter
document.getElementById("addr2").addEventListener("input", e => {
  let len = e.target.value.length;
  document.getElementById("counter").textContent = `${len}/20`;
});

// Dynamic select + checkbox
document.getElementById("listBox").addEventListener("change", e => {
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
        area.appendChild(document.createElement("br"));
        area.appendChild(txt);
      } else {
        area.querySelectorAll("input[type=text]").forEach(el => el.remove());
      }
    });
  }
});

function checkForm() {
  let allValid = ["name", "email", "phone", "zip", "addr1"].every(id =>
    validators[id](document.getElementById(id).value)
  );
  submitBtn.disabled = !allValid;
}

// Submit
form.addEventListener("submit", e => {
  e.preventDefault();
  const table = document.getElementById("resultsTable");
  let row = table.insertRow();
  ["name", "email", "phone", "zip", "addr1", "addr2"].forEach(id => {
    let cell = row.insertCell();
    cell.textContent = document.getElementById(id).value || "";
  });
  let cell = row.insertCell();
  cell.textContent = document.getElementById("extraTxt")?.value || "";
  form.reset();
  document.getElementById("counter").textContent = "0/20";
  document.getElementById("dynamicArea").innerHTML = "";
  submitBtn.disabled = true;
});

// Chatbot
const chatBtn = document.getElementById("chatbot");
const chatWin = document.getElementById("chatWindow");
const chatMsgs = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");

const faqs = {
  email: "You must use your Northeastern email (example: student@northeastern.edu).",
  phone: "The phone number must be in the format (XXX) XXX-XXXX.",
  zip: "The zip code must be exactly 5 digits.",
  required: "All fields are required except Street Address 2.",
  address: "Street Address 2 is optional. If left blank, it will remain empty in the results table."
};

chatBtn.addEventListener("click", () =>
  chatWin.style.display = chatWin.style.display === "block" ? "none" : "block"
);

sendBtn.addEventListener("click", () => {
  let q = chatInput.value.toLowerCase();
  let ans = "Sorry, I don’t know that yet. Please check the instructions.";
  for (const key in faqs) {
    if (q.includes(key)) { ans = faqs[key]; break; }
  }
  chatMsgs.innerHTML += `<div><b>You:</b> ${chatInput.value}</div>`;
  chatMsgs.innerHTML += `<div><b>Bot:</b> ${ans}</div>`;
  chatInput.value = "";
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
});
