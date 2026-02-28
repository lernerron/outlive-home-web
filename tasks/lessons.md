# Lessons Learned

## Git Workflow
- **Commit frequently** — after each feature, not in bulk. User called this out as a best practice violation.
- One logical change per commit with descriptive messages.

## Dev Server
- Always kill stale dev server processes before restarting. A stale process on the same port serves old content and causes confusing styling issues.
- Clear `.next` cache when switching between builds.

## Vercel Env Vars
- Use `printf 'value' | vercel env add NAME production` — not `<<<` heredoc, which adds a trailing newline that breaks string comparison.

## API Testing
- Run API tests as individual sequential commands, not combined bash scripts with pipes. Combined scripts fail due to process concurrency issues.

## Context Hygiene
- **Update docs/files before suggesting `/clear`** — when a session produces changes to project state (e.g., Vercel connected, new integrations), update CLAUDE.md, MEMORY.md, and lessons.md *before* clearing context. Otherwise the updates get lost.

## Navigation
- Cross-page anchor links need `/#section` prefix (not just `#section`) to work from non-home pages.
- Use Next.js `<Link>` for route navigation, `<a>` for anchor-only links. Use conditional `Tag` pattern.
