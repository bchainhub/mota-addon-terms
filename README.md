# Terms Addon for MOTA

Adds **Terms of Service** and **Privacy Policy** pages under `src/routes/[[lang]]/terms/` (service and privacy). Uses the MOTA addon CLI (e.g. from [dapp-starter](https://github.com/bchainhub/dapp-starter)).

Templates use **`*.ejs.t`** so variables (`tosContent`, `privacyContent`, etc.) are substituted at install time.

## Placeholders in documents

The default ToS and Privacy templates use these placeholders in the HTML:

| Placeholder | Meaning | When replaced |
| --- | --- | --- |
| `[SERVICE]` | Your service / company name | Replaced if you enter a value at install; otherwise left as `[SERVICE]` in the generated page. |
| `[EMAIL]` | Support / contact email | Replaced if you enter a value; otherwise left as `[EMAIL]`. |
| `[DATE]` | Last Updated date | Always replaced: with the date you enter, or today’s date (YYYY-MM-DD) if left blank. |

You can also keep `[SERVICE]` and `[EMAIL]` in the generated files and replace them later in your repo.

## Requirements

- SvelteKit project with MOTA addon CLI (hygen, prompts).

## Install

From your project root:

```bash
npx addon <repo> terms install
```

Example:

```bash
npx addon bchainhub/mota-addon-terms terms install
```

During install you will be prompted for:

1. **Your service name** — Replaces `[SERVICE]` in the documents. Leave as `[SERVICE]` to keep the placeholder.
2. **Support email address** — Replaces `[EMAIL]`. Leave as `[EMAIL]` to keep the placeholder.
3. **Last Updated date** — YYYY-MM-DD; replaces `[DATE]`. Leave blank for today’s date.
4. **Terms of Service** — Use the default template or paste your own HTML.
5. **Privacy Policy** — Use the default template or paste your own HTML.

### What gets added

- **Routes**
  - `src/routes/[[lang]]/terms/service/+page.svelte` — Terms of Service.
  - `src/routes/[[lang]]/terms/privacy/+page.svelte` — Privacy Policy.

Page templates are **`*.ejs.t`** so EJS can inject the collected content and variables.

The default ToS template does **not** include jurisdiction or venue; the default Privacy template does **not** include a minimum-age variable (children’s section is generic).

### URLs

- Terms of Service: `/{lang}/terms/service` or `/terms/service` (if default locale is stripped).
- Privacy Policy: `/{lang}/terms/privacy` or `/terms/privacy`.

## Uninstall

From your project root:

```bash
npx addon <repo> terms uninstall
```

### What gets removed

- `src/routes/[[lang]]/terms/service/+page.svelte`
- `src/routes/[[lang]]/terms/privacy/+page.svelte`
- Empty `terms/service`, `terms/privacy`, and `terms` directories.

## Addon options

| Flag | Short | Description |
| --- | --- | --- |
| `--cache` | `-c` | Use cache dir for repo. |
| `--dry-run` | `-d` | No writes; scripts skipped. |
| `--no-scripts` | `-ns` | Skip _scripts execution. |

## Pinning a version

Append `#<ref>` to the repo:

```bash
npx addon bchainhub/mota-addon-terms#v1.0.0 terms install
```

## License

Licensed under the MIT License.
