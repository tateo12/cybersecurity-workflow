/* ============================================================
   Terminal replay — synthetic data, real run structure.
   Every finding, resource, CVE-to-repo mapping, and ticket key
   below is fabricated for this demo.
   ============================================================ */

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// Each entry: { html, d: pause-before-ms, type: typewriter? }
const SCRIPT = [
  { html: `<span class="t-prompt">azfunc@security-agent:~$</span> python -m src.main`, d: 300, type: true },
  { html: ``, d: 500 },
  { html: `<span class="t-ts">06:00:01</span> <span class="t-info">INFO  Starting security scan...</span>`, d: 120 },
  { html: `<span class="t-ts">06:00:01</span> <span class="t-info">INFO  Fetching from datadog-sast...</span>`, d: 650 },
  { html: `<span class="t-ts">06:00:03</span> <span class="t-info">INFO  Fetching from datadog-sca...</span>`, d: 700 },
  { html: `<span class="t-ts">06:00:06</span> <span class="t-info">INFO  Fetching from datadog-iac...</span>`, d: 550 },
  { html: `<span class="t-ts">06:00:08</span> <span class="t-info">INFO  Fetching from defender... <span class="t-dim">(resource graph, 4 subscriptions)</span></span>`, d: 1100 },
  { html: `<span class="t-ts">06:00:14</span> <span class="t-info">INFO  Total findings across all sources: <span class="t-ok">184</span></span>`, d: 500 },
  { html: ``, d: 250 },
  { html: `<span class="t-dim">Severity gate (daily run: critical/high ticket, medium/low logged)</span>`, d: 200 },
  { html: `  <span class="t-med">[medium]</span> <span class="t-key">datadog::rule_resource::java-security/cookie-missing-httponly::acme-api-gateway</span> <span class="t-dim">- logged only</span>`, d: 90 },
  { html: `  <span class="t-med">[medium]</span> <span class="t-key">defender::assessment::sub-acme-demo::storage-soft-delete::stacmedemo01</span> <span class="t-dim">- logged only</span>`, d: 80 },
  { html: `  <span class="t-low">[low]</span> <span class="t-key">datadog::vuln::lib-cookie-0.4.1</span> <span class="t-dim">- logged only</span>`, d: 80 },
  { html: `  <span class="t-dim">... 118 more logged only, 12 suppressed (config/suppressions.yml)</span>`, d: 350 },
  { html: ``, d: 250 },
  { html: `<span class="t-dim">Dedup pass (label search across CYBER, AN, IT)</span>`, d: 200 },
  { html: `  <span class="t-warn">Duplicate:</span> CYBER-412 <span class="t-dim">-</span> <span class="t-key">cve::cve-2024-21538::cross-spawn</span>`, d: 110 },
  { html: `  <span class="t-warn">Duplicate:</span> AN-1144 <span class="t-dim">-</span> <span class="t-key">datadog::rule_resource::tsx-react/dangerously-set-html::acme-booking-widget</span>`, d: 100 },
  { html: `  <span class="t-warn">Duplicate:</span> IT-61 <span class="t-dim">-</span> <span class="t-key">defender::assessment::sub-acme-demo::mfa-required::vm-acme-jumpbox-01</span>`, d: 100 },
  { html: `  <span class="t-dim">... 40 more duplicates matched</span>`, d: 240 },
  { html: `  <span class="t-ok">Resurfaced:</span> was CYBER-217 <span class="t-dim">- opening new ticket with link-back</span>`, d: 400 },
  { html: ``, d: 250 },
  { html: `  <span class="t-sum">Plan:</span> CYBER 2 <span class="t-dim">|</span> AN 3 <span class="t-dim">|</span> IT 1<span class="t-dim">; 0 deferred (caps ok)</span>`, d: 600 },
  { html: ``, d: 250 },
  { html: `  <span class="t-crit">[CRITICAL]</span> Created <span class="t-key">IT-88</span>: [DEFENDER] Internet-facing VM 'vm-acme-web-01' allows inbound RDP from any source`, d: 800 },
  { html: `  <span class="t-crit">[CRITICAL]</span> Created <span class="t-key">CYBER-498</span>: [DEFENDER] Privileged identity 'svc-acme-deploy' has no MFA and unused 90d permissions`, d: 750 },
  { html: `  <span class="t-high">[HIGH]</span> Created <span class="t-key">AN-1207</span>: [DATADOG SCA][CVE-2025-32996] http-proxy-middleware: request smuggling via malformed headers`, d: 720 },
  { html: `  <span class="t-high">[HIGH]</span> Created <span class="t-key">AN-1208</span>: [DATADOG SAST][java-security/sql-injection] Unsanitized order filter in OrderRepository.java:214`, d: 700 },
  { html: `  <span class="t-high">[HIGH]</span> Created <span class="t-key">AN-1209</span>: [DATADOG IAC][redis-public-access] Cache 'redis-acme-demo' publicly accessible in main.tf`, d: 700 },
  { html: `  <span class="t-high">[HIGH]</span> Created <span class="t-key">CYBER-499</span>: [DEFENDER] Key vault 'kv-acme-demo' allows access from all networks <span class="t-dim">(resurfaced, links CYBER-217)</span>`, d: 800 },
  { html: ``, d: 400 },
  { html: `<span class="t-hr">--- Run Summary ---</span>`, d: 220 },
  { html: `  <span class="t-sum">Total findings:</span>    184`, d: 110 },
  { html: `  <span class="t-sum">Open by project:</span>   CYBER 14 | AN 22 | IT 6 <span class="t-dim">(cap 25)</span>`, d: 110 },
  { html: `  <span class="t-sum">Suppressed:</span>        12`, d: 100 },
  { html: `  <span class="t-sum">Logged only:</span>       121`, d: 100 },
  { html: `  <span class="t-sum">Duplicates:</span>        <span class="t-warn">43</span>`, d: 100 },
  { html: `  <span class="t-sum">Resurfaced:</span>        1`, d: 100 },
  { html: `  <span class="t-sum">Tickets created:</span>   <span class="t-ok">6</span>`, d: 100 },
  { html: `  <span class="t-sum">Failed:</span>            0`, d: 100 },
  { html: `  <span class="t-sum">Scan duration:</span>     27.4s`, d: 300 },
  { html: ``, d: 200 },
  { html: `<span class="t-prompt">azfunc@security-agent:~$</span> `, d: 150 },
];

const termBody = document.getElementById("termBody");
const replayBtn = document.getElementById("replayBtn");

let runToken = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function typeInto(el, html, token) {
  // Typewriter over plain text, then swap in the styled HTML.
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const text = tmp.textContent;
  for (let i = 1; i <= text.length; i++) {
    if (token !== runToken) return;
    el.textContent = text.slice(0, i);
    await sleep(22 + Math.random() * 40);
  }
  el.innerHTML = html;
}

async function playRun() {
  const token = ++runToken;
  termBody.innerHTML = "";
  const cursor = document.createElement("span");
  cursor.className = "t-cursor";
  termBody.appendChild(cursor);

  for (const step of SCRIPT) {
    if (token !== runToken) return;
    await sleep(step.d);
    if (token !== runToken) return;

    const line = document.createElement("span");
    line.className = "t-line";
    termBody.insertBefore(line, cursor);

    if (step.type) {
      await typeInto(line, step.html, token);
    } else {
      line.innerHTML = step.html || " ";
    }
    termBody.scrollTop = termBody.scrollHeight;
  }
}

// Start when the terminal scrolls into view (once)
let started = false;
const termObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      playRun();
      termObserver.disconnect();
    }
  },
  { threshold: 0.35 }
);
termObserver.observe(document.getElementById("terminal"));

replayBtn.addEventListener("click", () => playRun());

// Pipeline stage reveal
const pipeline = document.querySelector(".pipeline");
new IntersectionObserver(
  (entries, obs) => {
    if (entries[0].isIntersecting) {
      pipeline.classList.add("in-view");
      obs.disconnect();
    }
  },
  { threshold: 0.2 }
).observe(pipeline);
