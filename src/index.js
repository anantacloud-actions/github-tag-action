import * as core from '@actions/core';
import * as github from '@actions/github';
import semver from 'semver';

async function run() {
  try {
    const token = core.getInput('github_token', { required: true });
    const defaultBump = core.getInput('default_bump') || 'patch';
    const tagPrefix = core.getInput('tag_prefix') || 'v';
    const dryRun = core.getInput('dry_run') === 'true';

    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    core.info('Fetching tags...');
    const { data: tags } = await octokit.rest.repos.listTags({ owner, repo, per_page: 100 });

    const latestTagObj = tags.find(t => semver.valid(t.name.replace(tagPrefix, '')));
    const currentTag = latestTagObj ? latestTagObj.name : `${tagPrefix}0.0.0`;
    const currentVersion = currentTag.replace(tagPrefix, '');

    core.info(`Current version: ${currentTag}`);

    const nextVersion = semver.inc(currentVersion, defaultBump);
    const nextTag = `${tagPrefix}${nextVersion}`;

    core.setOutput('old_tag', currentTag);
    core.setOutput('new_tag', nextTag);

    if (dryRun) {
      core.info(`Dry run enabled. Target tag: ${nextTag}`);
      return;
    }

    core.info(`Creating tag: ${nextTag}`);
    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/tags/${nextTag}`,
      sha: github.context.sha,
    });

    core.info('Tag created successfully!');
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
