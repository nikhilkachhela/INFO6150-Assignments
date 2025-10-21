/* stopwatch.js
   Implements stopwatch with async save to localStorage, validation via jQuery,
   setInterval/clearInterval usage, pause/resume, history listing, filtering and stats.
*/
$(function(){
    const $date = $("#eventDate");
    const $name = $("#eventName");
    const $dateError = $("#dateError");
    const $nameError = $("#nameError");
    const $timer = $("#timerDisplay");
    const $start = $("#startBtn"), $pause = $("#pauseBtn"), $stop = $("#stopBtn"), $reset = $("#resetBtn");
    const $history = $("#historyList"), $totalSessions = $("#totalSessions"), $totalTime = $("#totalTime");
    const STORAGE_KEY = "assignment6_stopwatch_sessions";
  
    // Default date to today
    const today = new Date().toISOString().slice(0,10);
    $date.val(today);
    $("#filterDate").val("");
  
    let intervalId = null;
    let elapsedSeconds = 0;
    let running = false;
    let paused = false;
  
    // Helpers
    function pad(n){ return n.toString().padStart(2, '0'); }
    function formatHMS(sec){
      const h = Math.floor(sec / 3600);
      const m = Math.floor((sec % 3600) / 60);
      const s = sec % 60;
      return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }
  
    function loadSessions(){
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch(e){ return []; }
    }
  
    function saveSessionsAsync(sessions){
      // returns a promise to simulate async/await usage
      return new Promise((resolve, reject) => {
        try{
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
          resolve(true);
        } catch(err){
          reject(err);
        }
      });
    }
  
    function renderHistory(filterDate){
      const sessions = loadSessions().slice().reverse(); // most recent first
      const filtered = filterDate ? sessions.filter(s => s.date === filterDate) : sessions;
      $history.empty();
      if(filtered.length === 0){
        $history.append('<div class="muted">No sessions recorded yet</div>');
      } else {
        filtered.forEach(s => {
          const el = $(`
            <div class="card" style="margin-bottom:.5rem;padding:.6rem;">
              <div class="between">
                <div><strong>${s.eventName}</strong><div class="muted">${s.date}</div></div>
                <div style="text-align:right">
                  <div>Duration</div>
                  <div style="font-weight:700">${formatHMS(s.duration)}</div>
                </div>
              </div>
            </div>
          `);
          $history.append(el);
        });
      }
      // update stats (for all sessions, not just filtered)
      const all = loadSessions();
      const total = all.length;
      const totalSeconds = all.reduce((acc, cur)=> acc + (Number(cur.duration) || 0), 0);
      $totalSessions.text(total);
      $totalTime.text(formatHMS(totalSeconds));
    }
  
    // Validation functions
    function validateDate(){
      if(!$date.val()){
        $dateError.text("Please select a date");
        return false;
      }
      $dateError.text("");
      return true;
    }
  
    function validateName(){
      const v = $name.val().trim();
      if(!v){ $nameError.text("Event name is required"); return false; }
      if(v.length < 3){ $nameError.text("Event name must be at least 3 characters"); return false; }
      if(v.length > 100){ $nameError.text("Event name too long (max 100 characters)"); return false; }
      const re = /^[A-Za-z0-9\s\-\']+$/;
      if(!re.test(v)){ $nameError.text("Event name contains invalid characters"); return false; }
      $nameError.text("");
      return true;
    }
  
    $date.on("focus", ()=> $dateError.text("")).on("blur", validateDate);
    $name.on("focus", ()=> $nameError.text("")).on("blur", validateName);
  
    // Timer core functions
    function startInterval(){
      if(intervalId) clearInterval(intervalId);
      intervalId = setInterval(()=> {
        elapsedSeconds++;
        $timer.text(formatHMS(elapsedSeconds));
      }, 1000);
      running = true;
      paused = false;
      $pause.prop("disabled", false).removeClass("disabled").text("Pause");
      $stop.prop("disabled", false).removeClass("disabled");
      $start.prop("disabled", true).addClass("disabled");
      $date.prop("disabled", true);
      $name.prop("disabled", true);
    }
  
    function pauseTimer(){
      if(intervalId) clearInterval(intervalId);
      intervalId = null;
      paused = true;
      running = false;
      $pause.text("Resume");
    }
  
    function resumeTimer(){
      startInterval();
    }
  
    function resetTimerUI(){
      if(intervalId) clearInterval(intervalId);
      intervalId = null;
      elapsedSeconds = 0;
      running = false;
      paused = false;
      $timer.text("00:00:00");
      $start.prop("disabled", false).removeClass("disabled");
      $pause.prop("disabled", true).addClass("disabled").text("Pause");
      $stop.prop("disabled", true).addClass("disabled");
      $date.prop("disabled", false);
      $name.prop("disabled", false);
    }
  
    // Button handlers
    $start.on("click", function(){
      $dateError.text(""); $nameError.text("");
      if(!validateDate() | !validateName()) return;
      // start
      elapsedSeconds = 0;
      $timer.text("00:00:00");
      startInterval();
    });
  
    $pause.on("click", function(){
      if(!running && !paused) return;
      if(running){
        pauseTimer();
      } else {
        resumeTimer();
      }
    });
  
    $stop.on("click", async function(){
      if(!running && !paused) return;
      // stop -> save session
      if(intervalId) clearInterval(intervalId);
      intervalId = null;
      running = false;
      paused = false;
  
      const sessionObj = {
        date: $date.val(),
        eventName: $name.val().trim(),
        duration: elapsedSeconds,
        savedAt: new Date().toISOString()
      };
      const sessions = loadSessions();
      sessions.push(sessionObj);
      try{
        await saveSessionsAsync(sessions);
        // success
        renderHistory();
        // UI reset
        resetTimerUI();
      } catch(err){
        alert("Error saving session"); // only here as fallback; assignment forbids popups for validation but saving error fallback is acceptable
      }
    });
  
    $reset.on("click", function(){
      resetTimerUI();
    });
  
    // Filtering
    $("#filterBtn").on("click", function(){
      const d = $("#filterDate").val();
      renderHistory(d || null);
    });
    $("#clearFilter").on("click", function(){
      $("#filterDate").val("");
      renderHistory();
    });
  
    // init
    renderHistory();
  });
  