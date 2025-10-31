# Get Contributors

View the source: [get-contributors.js](https://github.com/cssnr/vitepress-plugin-contributors/blob/master/src/get-contributors.js)

Only the `user/repo` is required. All other arguments are optional.

| Argument&nbsp;Flag | Default&nbsp;Value             | Description&nbsp;of&nbsp;the&nbsp;Argument |
| :----------------- | :----------------------------- | :----------------------------------------- |
| `-f`/`--file`      | `.vitepress/contributors.json` | Output file relative to project root       |
| `-m`/`--max-users` | `0`                            | Max users to fetch, 0 is unlimited         |
| `-b`/`--bots`      | -                              | Include bot users in the results           |
| `-e`/`--error`     | -                              | Throw errors during generation             |
| `-k`/`--keys`      | `login,avatar_url`             | Contributor keys to save to file           |

Show help: `npx get-contributors -h` <CB prev />

## Usage

Basic usage, all contributors excluding bot users.

```shell
npx get-contributors user/repo
```

Limit to top 20 contributors, specify output file, and include bot users.

```shell
npx get-contributors user/repo -m 20 -f .vitepress/contributors.json -b
```

::: details GitHub API Rate Limit

Note: Only applies to unauthenticated requests.

This script makes 1 request to the GitHub API for every 100 contributors on the repository (or `max-users`).
Because of this if you have a lot of contributors (200+) running this back-to-back may hit
the [GitHub rate limit](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api#about-primary-rate-limits) for unauthenticated requests, which is 60 requests per hour.
If this occurs the script will generate a partial or empty contributors so development can continue.

**This does not affect GitHub Action runs which are authenticated with the `GTIHUB_TOKEN`.**

:::

For information on building, see the [Get Contributors Source](../guides/source#get-contributors-script) guide.

&nbsp;

::: tip Request a Feature
If you need more options, please [open a feature request](https://github.com/cssnr/vitepress-plugin-contributors/discussions/categories/feature-requests)
:::
