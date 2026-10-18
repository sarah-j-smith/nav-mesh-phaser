# Deploying and Updating this Project
Forked from the excellent `phaser-4-basic-js-template` project by [Scott Westover / Dev Share Academy](https://github.com/devshareacademy/phaser-4-basic-js-template):

> A basic Phaser 4 template that uses no build tools. The template uses vanilla JavaScript, includes the Phaser library with types, and includes JSDocs. The template relies on an external local web server to run, and includes a few examples of how to run locally.

Because no build tools are used this makes clean light-weight games that avoid the red-wall of
death you experience when updating a regular NPM or other web-tech repository.

Here's how to work with this project when deploying, updating or developing.

## Writing Code

This template is set up for a modern JavaScript development workflow without any build tools. Simply start your local web server and begin editing the files in the `src` folder. Your changes will be reflected when you refresh your browser.

The main entry point for the application is `src/main.js`.

## Deploying Code

This template includes a bundle script to gather all the necessary files for deployment into a `dist` folder.

To create a distributable bundle, run the following command from the root of the project:

```sh
bash scripts/bundle.sh
```

This will create a `dist` folder containing your game. The contents of this folder can then be uploaded to any static web hosting service. The script will exclude the `src/types` directory from the final bundle.

Since this template required Node.JS the script will use that to minify the project.

### Static Assets

Any static assets like images or audio files should be placed in the `assets` folder. They can then be loaded into your game.

## Updating Phaser

To update the Phaser library in this project, there are three main components that need to be synchronized:

1.  **Documentation:** The Phaser version mentioned at the top of [this README.md].
2.  **Library Files:** `assets/js/phaser.js` and `assets/js/phaser.min.js`.
3.  **Type Definitions:** `src/types/phaser.d.ts`.

[this README.md]: /README.md

### Manual Update

If you wish to update these files manually:

1.  **Download JavaScript Files:** Fetch the desired version from the jsDelivr CDN:
    - `https://cdn.jsdelivr.net/npm/phaser@VERSION/dist/phaser.js`
    - `https://cdn.jsdelivr.net/npm/phaser@VERSION/dist/phaser.min.js`
      _(Replace `VERSION` with the target version, e.g., `4.1.0`)_
2.  **Download Type Definitions:** Fetch the `phaser.d.ts` file from the Phaser GitHub repository:
    - `https://raw.githubusercontent.com/phaserjs/phaser/refs/tags/vVERSION/types/phaser.d.ts`
3.  **Update README:** Manually update the version number in the `**Phaser Version:**` line at the top of this file.

### Using the Update Script

A convenience script is provided in the `scripts` folder to automate this process.

**To list available Phaser versions (requires npm):**

```bash
./scripts/update-phaser.sh --list
```

**To update to a specific version:**

```bash
./scripts/update-phaser.sh 4.1.0
```

The script will automatically download the required files to their correct locations and update this README.
