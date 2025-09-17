# Contributors

Only the `:contributors` parameter is required, everything else is optional.

| Parameter              |   Default    |  Type  | Description&nbsp;of&nbsp;the&nbsp;Parameter                                                |
| :--------------------- | :----------: | :----: | :----------------------------------------------------------------------------------------- |
| `:contributors` <CB /> | **Required** | Array  | `contributors.json` file import data                                                       |
| `max-users` <CB />     |      -       | String | Max Number of users to display                                                             |
| `heading` <CB />       |      -       | String | Optional Heading text                                                                      |
| `size` <CB />          |     `64`     | String | Size of Icons in pixels                                                                    |
| `margin` <CB />        |      -       | String | [CSS margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) string for container |

## Usage

With all arguments.

```markdown
<Contributors
    :contributors="$contributors"
    heading="Contributors"
    max-users="22"
    size="48"
    margin="36px 0 24px"
/>
```

<Contributors :contributors="$contributors" heading="Contributors" max-users="22" size="48" margin="36px 0 24px" />

## Demos

The plugin is running on these pages:

- https://django-files.github.io/ and [/team](https://django-files.github.io/team)
- https://docker-deploy.cssnr.com/
- https://portainer-deploy.cssnr.com/

If you have a live demo, let us know and we will post it here...

&nbsp;

::: tip Request a Feature
If you need more options, please [open a feature request](https://github.com/cssnr/vitepress-plugin-contributors/discussions/categories/feature-requests)
:::

<style module>
table td:nth-child(1) {
  white-space: nowrap;
}
</style>
