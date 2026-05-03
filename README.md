# sailwind-eval

Evaluation framework for measuring how changes to the [Sailwind](https://github.com/pglevy/sailwind) component library and [sailwind-starter](https://github.com/pglevy/sailwind-starter) template affect the quality of AI-generated prototypes.

See [EVAL-PLAN.md](./EVAL-PLAN.md) for the full methodology.

## Repo structure

```
inspiration/          # Inspo example corpus (S7, S8, S9 scenarios)
  <example-name>/
    assets/           # screenshot.png, source.sail, + any image assets
    expected-structure.json
  prompts/            # Shared prompt templates (s7-image-only, s8-sail-only, s9-image+sail)
  _template/          # Blank example scaffold

app-spec/             # App spec corpus (S2 scenario)
  <spec-name>/
    spec.md
    expected-structure.json
  _template/

baselines/            # Saved eval runs
  <date>-<commit>/    # sailwind-starter commit short SHA at time of run
    <scenario>/
      screenshot.png (or screenshots/)
      session.md      # agent conversation
      src/            # generated source files
      <prompt>.md     # prompt used

scripts/
  prepare-eval-env.js # Sets up a clean eval workspace from the template
  run-eval.js         # Automated eval runner (outline, not yet executable)

results/              # Placeholder for future automated scoring output
gitignore/            # Working notes (not tracked)
```

## Running an eval (manual)

1. Prepare a clean workspace from the template:
   ```bash
   node scripts/prepare-eval-env.js ~/Downloads/<eval-name> --scenario inspiration/<example-name>
   ```
   Add `--template /path/to/local/sailwind-starter` to use a local clone instead of pulling from GitHub.

2. Open the output directory in your IDE.

3. Use the appropriate prompt from `inspiration/prompts/` with the assets from the scenario's `assets/` folder. The `sail/source.sail` file is copied into the workspace root for easy path reference.

4. Run the agent, accept the generated files, take a screenshot.

5. Save results to `baselines/<date>-<commit>/`.

## Current baseline

**`baselines/2026-05-03-1475ed1/`** — first baseline run, human eval only (screenshots + source).

| Scenario | Type | Prompt |
|----------|------|--------|
| customer-account-management | Inspiration | S9 |
| my-health-site | Inspiration | S9 |
| conference-registration-portal | Inspiration | S9 |
| insurance-quote-review | Inspiration | S9 |
| restaurant-order | Inspiration | S9 |
| aurora-case-management | App spec | S2 |

## Next steps

- Add more inspiration examples to the corpus
- Build out `run-eval.js` for automated scoring (build pass, console errors, color palette, Sailwind ratio)
- Add human fidelity ratings to baseline entries
- Set up control group runs (raw Tailwind, no template) for A/B comparison
