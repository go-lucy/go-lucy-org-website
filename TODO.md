# TODOs

Items here are not in progress. Do not implement them unless the user promotes one.

## From you

### Drop leftover manifesto wording outside the main page
- Parked: 2026-11-05
- Priority: P2 -  the published piece is no longer a manifesto, and these pages will still say that it is.
- Why parked: this pass only changes the source text and the main page.
- Context: sign.html, demo.html, and README.md still say manifesto. Rename that wording when those files are in scope. The Jotform form itself may still say manifesto too.
- Where: sign.html, demo.html, README.md, Jotform.
- Depends on: none
- Risks: the main page and the signature page will disagree about what the document is called.

### Human superpower on the signature page
- Parked: 2026-11-05
- Priority: P2 -  requested, then deferred so this pass only changes the beliefs and the main page.
- Why parked: not the signature page this time.
- Context: A public signatory is a name plus the answer to "What is your human superpower? What makes you uniquely human?" Show the sentence in the signatories list. Leave the first-100 grid as names. Same consent and review as names. Do not claim the form already asks the question.
- Where: sign.html. Add the field by hand on Jotform `262811763496062` and `262833420847056` if both signup doors stay open.
- Depends on: none
- Risks: mentioning the question on the main page before the form has the field would claim a question signers are not asked.

### Keep scammers and faulty accounts from signing and publishing
- Parked: 2026-11-02
- Priority: P1 -  a fake public signatory is a trust failure.
- Why parked: this pass does not decide the gate.
- Context: How do we ensure scammers and faulty accounts cannot sign and publish? Names on sign.html are added by hand after review. Do not turn a form submission into a public name.
- Where: sign.html and both Jotform forms.
- Depends on: none
- Risks: a reviewer can still paste a bad submission onto the page. Do not add a captcha claim or an automated publish path while this is parked.

## From the agent

### Require the published-secrets check before main updates
- Parked: 2026-11-09
- Priority: P1 — a direct push to main still publishes before the check can fail.
- Why parked: the check is added; turning it into a required status is a GitHub branch setting, not part of the check.
- Context: Pages serves the main branch of go-lucy/go-lucy-org-website as soon as it changes. Require the "Published secrets" check on main, and update main through pull requests.
- Where: GitHub branch protection for main.
- Depends on: the published-secrets workflow.
- Risks: until this is on, someone can push a secret straight to main and it goes live. Requiring the check without allowing the people who publish to bypass it can also block an urgent page fix.
