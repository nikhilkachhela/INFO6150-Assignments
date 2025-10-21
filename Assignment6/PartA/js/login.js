/* login.js
   jQuery-based validation + login flow.
*/
$(function() {
    const hardcodedUsers = [
      { email: "alice@northeastern.edu", password: "password123" },
      { email: "bob@northeastern.edu", password: "securePass8" },
      { email: "charlie@northeastern.edu", password: "charliepw9" }
    ];
  
    const $email = $("#email");
    const $password = $("#password");
    const $loginBtn = $("#loginBtn");
    const $emailError = $("#emailError");
    const $passwordError = $("#passwordError");
    const $loginError = $("#loginError");
    const $loginSuccess = $("#loginSuccess");
    const $remember = $("#remember");
  
    function validEmail(val){
      if(!val) return { ok:false, message: "Please enter a valid Northeastern email" };
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!re.test(val)) return { ok:false, message: "Please enter a valid Northeastern email" };
      if(!val.toLowerCase().endsWith("@northeastern.edu")) return { ok:false, message: "Please enter a valid Northeastern email" };
      return { ok:true };
    }
  
    function validPassword(val){
      if(!val) return { ok:false, message: "Password is required" };
      if(val.length < 8) return { ok:false, message: "Password must be at least 8 characters" };
      return { ok:true };
    }
  
    function updateButtonState(){
      const e = validEmail($email.val().trim()).ok;
      const p = validPassword($password.val()).ok;
      $loginBtn.prop("disabled", !(e && p));
    }
  
    $email.on("keyup blur", function(){
      const v = $(this).val().trim();
      const r = validEmail(v);
      if(!r.ok) $emailError.text(r.message);
      else $emailError.text("");
      updateButtonState();
    }).on("focus", ()=> $emailError.text(""));
  
    $password.on("keyup blur", function(){
      const v = $(this).val();
      const r = validPassword(v);
      if(!r.ok) $passwordError.text(r.message);
      else $passwordError.text("");
      updateButtonState();
    }).on("focus", ()=> $passwordError.text(""));
  
    $("#loginForm").on("submit", function(e){
      e.preventDefault();
      $loginError.text("");
      const emailVal = $email.val().trim().toLowerCase();
      const pwVal = $password.val();
  
      // final validation
      const eVal = validEmail(emailVal), pVal = validPassword(pwVal);
      if(!eVal.ok){ $emailError.text(eVal.message); return; }
      if(!pVal.ok){ $passwordError.text(pVal.message);return; }
  
      // check credentials
      const match = hardcodedUsers.find(u => u.email === emailVal && u.password === pwVal);
      if(!match){
        $loginError.text("Invalid email or password");
        return;
      }
  
      // success: create session
      const username = emailVal.split("@")[0];
      const session = {
        username,
        email: emailVal,
        loggedAt: new Date().toISOString(),
        isLoggedIn: true
      };
  
      try{
        if($remember.prop("checked")){
          localStorage.setItem("assignment6_session", JSON.stringify(session));
        } else {
          sessionStorage.setItem("assignment6_session", JSON.stringify(session));
        }
  
        $loginSuccess.text("Login successful! Redirecting...").fadeIn(400).delay(1400).fadeOut(400, function(){
          window.location.href = "calculator.html";
        });
  
      } catch(err){
        $loginError.text("Storage error: unable to save session.");
      }
    });
  
    // init
    updateButtonState();
  });
  