# Go Lucy website - Manifesto v1.0 + concept demo

Static GitHub Pages website for https://golucy.org.

## Publish
Upload **index.html** and **demo.html** to the root of the `go-lucy/go-lucy.github.io` repository, on the `main` branch. Replace the existing `index.html`. Do not upload a containing folder.

Suggested commit: `Publish manifesto v1.0 and Full Lucy demo`

## What is real vs simulated
The demo is an interactive browser-only prototype. It uses three predefined changes, does not call an AI model, does not save text, and does not deploy software. It is clearly labeled as such on the page.

## Editing the page
The words for each section live in `sections/`. The shell, including the top-right links, lives in `layout.html`. After editing a section, rebuild the page:

```
node build-page.mjs
```

That writes `index.html`, which is the file to publish.

## Checks
Pull requests fail if a file in this repo contains an email address, a private key, an API token, or an email field on signatory data. The repository is public, so the check covers every text file, not only the HTML GitHub Pages serves.

```
node --test scripts/published-secrets.test.mjs
node scripts/check-published-secrets.mjs
```

## Outstanding
The public contact address is still a placeholder and must not be written into the site until an inbox is configured.
