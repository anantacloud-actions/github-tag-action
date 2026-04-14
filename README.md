# Modern GitHub Tag Action 🏷️

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
