# Modern GitHub Tag Action 🏷️

<img width="890" height="460" alt="image" src="https://github.com/user-attachments/assets/1449b586-ee5a-4d43-b783-287882e96ef5" />

A lightweight, high-performance GitHub Action to automatically manage Semantic Versioning (SemVer) tags. This action calculates the next version based on your current tags and pushes a new tag to your repository.

[![Marketplace](https://img.shields.io/badge/Marketplace-Modern--Tag--Action-blue.svg)](https://github.com/marketplace/actions/modern-github-tag-action)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

## 🚀 Features

- **Automated SemVer:** Bumps `patch`, `minor`, or `major` versions automatically.
- **Node 20 Runtime:** Built on the latest GitHub Actions runner for speed and security.
- **Lightweight:** Compiled into a single distribution file for fast execution.
- **Dry Run Support:** Preview your next tag without pushing it.
- **Custom Prefixes:** Support for `v1.0.0`, `release-1.0.0`, or no prefix at all.

## 🛠 Usage

To use this action, create a `.yml` file in your `.github/workflows/` directory.

### Basic Example

```yaml
name: Auto Tag
on:
  push:
    branches:
      - main

jobs:
  tag:
    runs-on: ubuntu-latest
    permissions:
      contents: write # Important: Required to create tags
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Required to see existing tags

      - name: Bump version and push tag
        id: tag_action
        uses: anantacloud-actions/github-tag-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          default_bump: patch

      - name: Output New Tag
        run: echo "The new tag is ${{ steps.tag_action.outputs.new_tag }}"
```

## ⚙️ Configuration

### Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `github_token` | `GITHUB_TOKEN` or Personal Access Token. | **Yes** | N/A |
| `default_bump` | Which part of the version to increment (`patch`, `minor`, `major`). | No | `patch` |
| `tag_prefix` | A prefix to add to the tag (e.g., `v`). | No | `v` |
| `dry_run` | If `true`, the action calculates the tag but does not push it. | No | `false` |

### Outputs

| Output | Description |
|--------|-------------|
| `new_tag` | The value of the newly created tag (e.g., `v1.0.1`). |
| `old_tag` | The value of the previous tag (e.g., `v1.0.0`). |

## 📦 Developer Setup

If you want to contribute or modify this action:

1. Clone the repo.
2. Install dependencies: `npm install`.
3. Modify `src/index.js`.
4. Build the distribution: `npm run build`.
5. **Note:** The `dist/index.js` file must be committed for the action to run.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

```
### Final Step: Why `fetch-depth: 0`?
I added `fetch-depth: 0` to the README example. By default, `actions/checkout` only fetches the latest commit. For your action to correctly find the **previous** tags to determine the next version, it needs the full history (or at least the tags). This is a common pitfall for users of tag actions!
```

---

<div align="center">
  <p>
    <b>Powered by Ananta Cloud</b><br>
    <em>Building the future of cloud automation and seamless CI/CD workflows.</em>
  </p>
  <a href="https://github.com/anantacloud-actions">
    <img src="https://img.shields.io/badge/Powered%20By-Ananta%20Cloud-blue?style=for-the-badge&logo=icloud&logoColor=white" alt="Ananta Cloud">
  </a>
</div>
