# GitHub Actions: Automated Portfolio Data Refresh

## Overview

This specification documents a GitHub Actions workflow to automatically refresh GitHub language data on a scheduled basis and deploy the changes to production.

**Status**: Template for future implementation  
**Priority**: Low (current approach works without automation)

## Motivation

The build-time data fetching approach (see [Learning: Build-Time Data Fetching Strategy](../../README.md#learning-build-time-data-fetching-strategy)) generates `public/github-data.json` during each deployment. However:

- Data becomes stale between deployments
- Manual rebuilds are required to refresh data
- Developers must regenerate data locally before committing
- Production deployments on Vercel don't automatically update GitHub data

A scheduled GitHub Actions workflow would automatically:
1. Fetch fresh GitHub language data weekly
2. Commit updates to the repository
3. Trigger a Vercel deployment with the new data

## Proposed Workflow

### File Location
`.github/workflows/refresh-github-data.yml`

### Trigger Schedule
- **Automatic**: Every Sunday at 00:00 UTC (weekly refresh)
- **Manual**: Workflow dispatch for on-demand runs

### Workflow Steps

```yaml
name: Refresh GitHub Language Data

on:
  schedule:
    # Every Sunday at 00:00 UTC
    - cron: '0 0 * * 0'
  workflow_dispatch: # Allow manual trigger from GitHub UI

jobs:
  refresh-data:
    runs-on: ubuntu-latest
    permissions:
      contents: write # Allow git commits/pushes

    steps:
      # 1. Checkout repository
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Full history for commit detection

      # 2. Setup Node.js runtime
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      # 3. Install dependencies
      - name: Install dependencies
        run: npm ci

      # 4. Fetch GitHub data
      - name: Fetch GitHub language data
        env:
          GITHUB_LANG_TOKEN: ${{ secrets.GITHUB_LANG_TOKEN }}
        run: npm run build # Runs prebuild script which fetches data

      # 5. Configure git for commits
      - name: Configure git user
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"

      # 6. Commit and push if data changed
      - name: Commit and push if changed
        run: |
          git add public/github-data.json
          # Only commit if there are actual changes
          git diff --quiet && git diff --staged --quiet || \
            (git commit -m "chore: refresh github language data" && git push)

      # 7. Trigger Vercel deployment (optional, for immediate updates)
      - name: Trigger Vercel deployment
        if: success()
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          curl -X POST https://api.vercel.com/v1/deployments \
            -H "Authorization: Bearer $VERCEL_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{\"projectId\": \"$VERCEL_PROJECT_ID\"}"

      # 8. Notify on failure (optional)
      - name: Notify failure
        if: failure()
        run: echo "Failed to refresh GitHub data. Check logs for details."
```

## Required Secrets

Configure these in GitHub repository settings (**Settings → Secrets and variables → Actions**):

| Secret | Description | How to Get |
|--------|-------------|-----------|
| `GITHUB_LANG_TOKEN` | GitHub personal access token | [Create token](https://github.com/settings/tokens) with `public_repo` scope |
| `VERCEL_TOKEN` | Vercel API token (optional) | [Create in Vercel Dashboard](https://vercel.com/account/tokens) |
| `VERCEL_PROJECT_ID` | Vercel project ID (optional) | Found in Vercel project settings |

**Note**: The Vercel deployment step is optional. GitHub will automatically create a commit, which will trigger a Vercel deployment via the standard GitHub integration (if configured).

## Benefits

✅ **Automated Updates**: Data refreshes weekly without manual intervention  
✅ **Audit Trail**: Each refresh creates a commit showing what changed  
✅ **Production Ready**: Fresh data available on Vercel immediately  
✅ **On-Demand**: Manual workflow dispatch for immediate refreshes  
✅ **Low Cost**: GitHub Actions included in free tier  

## Risks & Considerations

⚠️ **Token Rotation**: GitHub tokens don't expire in tests; consider rotating quarterly  
⚠️ **API Rate Limits**: If multiple workflows run simultaneously, could hit limits  
⚠️ **Commit Noise**: Weekly commits might clutter git history  
⚠️ **Dependency on Secrets**: Requires 2-3 secrets to be configured correctly  

## Alternative: Vercel Cron Jobs

For users on **Vercel Pro+**, cron jobs can trigger revalidation without GitHub Actions:

**Setup**:
1. Add `vercel.json` configuration with cron schedule
2. Create API route that triggers `revalidatePath()`
3. Set `CRON_SECRET` environment variable

**Trade-off**: Pro+ subscription required; less transparent (no git commit history)

## Implementation Checklist

- [ ] Create `.github/workflows/refresh-github-data.yml` file
- [ ] Configure `GITHUB_LANG_TOKEN` secret in repository settings
- [ ] Configure `VERCEL_TOKEN` and `VERCEL_PROJECT_ID` secrets (if using Vercel trigger)
- [ ] Test workflow with manual dispatch (`workflow_dispatch`)
- [ ] Monitor first automatic run (Sunday at 00:00 UTC)
- [ ] Adjust cron schedule if needed for your timezone

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Personal Access Tokens](https://github.com/settings/tokens)
- [Vercel API Deployments](https://vercel.com/docs/api)
- [Next.js Build Time Data Fetching](../../README.md#learning-build-time-data-fetching-strategy)
