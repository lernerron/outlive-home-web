# Base44 Migration Runbook

## Repository Strategy
- Canonical repo: `blue-mountain-public` (keep existing history).
- Long-lived integration branch: `migration-remove-base44`.
- Short-lived feature branches (from integration branch):
  - `migration-auth-supabase`
  - `migration-leads-backend`
  - `migration-assets-storage`
  - `migration-cleanup-base44`

## Branch/PR Flow
1. Create feature branch from `migration-remove-base44`.
2. Open PR into `migration-remove-base44`.
3. Require at least one reviewer.
4. Require passing checks before merge:
   - `npm run build`
   - `npm run lint`
5. Deploy preview for each PR (Vercel/Netlify preview).
6. After all migration PRs are merged, open final PR:
   - `migration-remove-base44` -> `main`.

## Release Tags
- Before cutover merge to `main`: `pre-base44-cutover`
- After successful deploy from `main`: `post-base44-cutover-v1`

## Rollback Plan
- If production fails after cutover, redeploy tag `pre-base44-cutover`.
- If code rollback is needed:
  - Revert the cutover PR on `main`.
  - Re-run CI and redeploy.

## GitHub Settings (Manual)
- Protect `main`:
  - Require pull request before merging
  - Require status checks to pass
  - Require up-to-date branch before merging
  - Restrict direct pushes
- Configure environments:
  - `staging`
  - `production`
- Store secrets per environment.

## Environment Variables
- Remove Base44 vars from deployment targets:
  - `VITE_BASE44_APP_ID`
  - `VITE_BASE44_BACKEND_URL`
- Add new backend vars (example Supabase):
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Keep `.env.local` uncommitted.
- Maintain `.env.example` in repo.

## Execution Checklist
- [ ] Build passes without Base44 Vite plugin.
- [ ] `@base44/sdk` removed from dependencies.
- [ ] Auth flow migrated and tested.
- [ ] Lead submission migrated and tested.
- [ ] Logging migrated/replaced.
- [ ] Asset URLs moved off Base44-owned bucket/project.
- [ ] Final PR merged into `main`.
- [ ] `post-base44-cutover-v1` tag created after stable deploy.

## Useful Commands
```bash
# From migration integration branch
git checkout migration-remove-base44

# Create feature branch
git checkout -b migration-auth-supabase

# Keep branch current
git fetch origin
git rebase origin/migration-remove-base44

# Tag releases
git tag pre-base44-cutover
git tag post-base44-cutover-v1
```
