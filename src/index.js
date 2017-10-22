const GitHub = require('github-api');
const Path = require('path');
const wget = require('wget-improved');
const filesize = require('filesize');
const rimrafPromise = require('rimraf-promise');
const tar = require('tar');

const utils = require('./utils');
const env = process.env.NODE_ENV || 'development';

(async function () {
	const config = utils.loadConfigFile(env, __dirname + '/conf');
	const gh = new GitHub();

	console.log('Config :', JSON.stringify(config, null, 2));

	for (const app of config.apps) {
		const repo = await gh.getRepo(config.userName, app.repoName);
		const release = (await repo.getRelease('latest')).data;
		const asset = release.assets[0];
		const outputFile = Path.join(app.destFolder, asset.name);

		console.log('Clean output directory : ' + app.destFolder);
		await rimrafPromise(Path.join(app.destFolder, '*'));

		const download = wget.download(asset.browser_download_url, outputFile);
		await new Promise((resolve, reject) => {
			download.on('error', function (err) {
				console.log(err);
				reject(err);
			});
			download.on('start', function (fileSize) {
				console.log(`Start fetch file : ${asset.name} (${filesize(fileSize)})`);
			});
			download.on('end', function (output) {
				console.log(output);
				resolve(output);
			});
			download.on('progress', function (progress) {
				// code to show progress bar
			});
		});

		console.log('Extract file : ' + outputFile);

		await tar.extract({
			cwd: app.destFolder,
			file: outputFile
		})
	}
})().then(() => {
	console.log('END OK');
}).catch((error) => {
	console.error('END ERROR : ', error);
});
