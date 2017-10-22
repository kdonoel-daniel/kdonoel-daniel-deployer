/**
 * Here you can specify base properties for all environments.
 * This properties will be imported for *ALL* environnements.
 * The properties specified in this file will be overrided by *ALL* other configuration files, if any.
 */

module.exports = {
	userName: 'kdonoel-daniel',
	apps: [{
		repoName: 'kdonoel-daniel-api',
		destFolder: '/opt/apps/kdonoel-daniel/api'
	}, {
		repoName: 'kdonoel-daniel-web',
		destFolder: '/opt/apps/kdonoel-daniel/web'
	}]
};
