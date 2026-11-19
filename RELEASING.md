# Releasing five.js

Five.js pairs each GitHub release `rN` with npm version `0.N.0`. For example, `r1` corresponds to `@jecvay/five@0.1.0`. GitHub Releases holds the change log. npm distributes the installable package.

## Prepare a release

1. Check out the up-to-date `main` branch. For the first release, add a working package entry point and a usage example, then remove `"private": true` from `package.json`.
2. Run `npm version 0.1.0 --no-git-tag-version`, substituting the version for the revision you are releasing.
3. Run the build and tests, if defined. Review the package contents with `npm pack --dry-run`. Install the packed tarball in a separate project and run the README example before publishing.
4. Commit the release changes, create the annotated tag, and push both. For `r1`, use:

   ```sh
   git tag -a r1 -m r1
   npm run release:check
   git push origin main r1
   ```

## Publish

1. Publish from the tagged checkout with `npm publish`. The package defaults to public access on the npm registry. The publisher needs write access to the `@jecvay` scope and must meet [npm's publishing requirements](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages#publishing-scoped-public-packages).
2. Confirm the published version with `npm view @jecvay/five@0.1.0 version`. If retrying after a failure, check the registry first and continue from the first unfinished step.
3. Publish a [GitHub Release](https://github.com/Jecvay/five.js/releases/new) from the existing tag, using the tag as the title. Summarize changes by area. Include migration steps for any breaking changes.
