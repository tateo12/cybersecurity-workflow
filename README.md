# cybersecurity workflow // demo

Static demo page for a production security automation agent: findings from Microsoft Defender for Cloud and the Datadog Security API in, deduplicated and severity-routed JIRA tickets out.

**All data on this page is synthetic.** Findings, resource names, ticket keys, and CVE-to-repo mappings are fabricated for demonstration. The agent's source is private.

## Stack

Plain HTML/CSS/JS, no build step. Deployable anywhere static files are served.

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy (GitHub Pages)

1. Push this repo to GitHub
2. Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`
3. Live at `https://<username>.github.io/<repo>/`
