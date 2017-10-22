const GitHub = require('github-api');
const utils = require('./utils');
const env = process.env.NODE_ENV || 'development';

(async function () {
	const config = utils.loadConfigFile(env, __dirname + '/conf');
	const gh = new GitHub();

	console.log('Config :', JSON.stringify(config, null, 2));

	for (const app of config.apps) {
		const repo = await gh.getRepo(config.userName, app.repoName);
		const releases = (await repo.listReleases()).data;
		console.log('--releases ' + app.repoName + '--', releases);
	}
})().then(() => {
	console.log('END OK');
}).catch((error) => {
	console.error('END ERROR : ', error);
});
