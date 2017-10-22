const deepExtend = require("deep-extend");

function loadConfigFile(env, path) {
	env = env || 'development';
	path = path || './config';

	//load base conf file
	const baseConfPath = path + '/base.js';
	let baseConfProps = {};
	try {
		baseConfProps = require(baseConfPath);
	}
	catch (err) {
		console.error('could not load config file ' + baseConfPath);
		throw err;
	}

	//load environment specific conf file
	const envConfPath = path + '/' + env + '.js';
	let envConfProps = {};
	try {
		envConfProps = require(envConfPath);
	}
	catch (err) {
		console.error('could not load config file ' + envConfPath, err);
		throw err;
	}

	//load local conf file, if exists
	const localConfPath = path + '/local.js';
	let localConfProps = {};
	try {
		localConfProps = require(localConfPath);
	}
	catch (err) {
		console.warn('could not load config file ' + localConfPath);
	}

	//merge all that conf files
	return deepExtend({}, baseConfProps, envConfProps, localConfProps);
}

module.exports = {
	loadConfigFile
};
