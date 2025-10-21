/* calculator.js
   Auth check + inputs validation + single arrow function calculate
*/
$(function(){
    // Auth check on load:
    const sess = sessionStorage.getItem("assignment6_session") || localStorage.getItem("assignment6_session");
    if(!sess){
      window.location.href = "login.html";
      return;
    }
    const session = JSON.parse(sess);
    $("#welcome").text(`Welcome, ${session.username}!`);
  
    const $num1 = $("#num1"), $num2 = $("#num2"), $res = $("#result");
    const $num1Error = $("#num1Error"), $num2Error = $("#num2Error");
  
    function isNumeric(val){
      if(val === undefined || val === null || val.toString().trim()==="") return false;
      // allow negatives and decimals, but no other chars
      return /^-?\d+(\.\d+)?$/.test(val.toString().trim());
    }
  
    const calculate = (num1, num2, operation) => {
      // single arrow function that handles all four operations
      const a = Number(num1);
      const b = Number(num2);
      switch(operation){
        case 'add': return a + b;
        case 'subtract': return a - b;
        case 'multiply': return a * b;
        case 'divide': return (b === 0) ? "Cannot divide by zero" : a / b;
        default: return null;
      }
    };
  
    function validateInputs(){
      let ok = true;
      if(!isNumeric($num1.val())){
        $num1Error.text("Please enter a valid number");
        ok = false;
      } else $num1Error.text("");
      if(!isNumeric($num2.val())){
        $num2Error.text("Please enter a valid number");
        ok = false;
      } else $num2Error.text("");
      return ok;
    }
  
    $num1.on("keyup blur", function(){ $num1Error.text(""); validateInputs(); }).on("focus", ()=> $num1Error.text(""));
    $num2.on("keyup blur", function(){ $num2Error.text(""); validateInputs(); }).on("focus", ()=> $num2Error.text(""));
  
    $(".op").on("click", function(){
      $res.val("");
      const op = $(this).data("op");
      if(!validateInputs()) return;
      const v1 = $num1.val().trim(), v2 = $num2.val().trim();
      const out = calculate(v1, v2, op);
      // use jQuery chaining to update
      $res.prop("disabled", false).val(out).prop("disabled", true);
    });
  
    $("#logoutBtn").on("click", function(){
      sessionStorage.removeItem("assignment6_session");
      localStorage.removeItem("assignment6_session");
      $("body").fadeOut(400, function(){ window.location.href = "login.html"; });
    });
  });
  