
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { execSync, exec } = require('child_process')

const nginxBasePath = "/etc/nginx/";
const nginxAvailablePath = nginxBasePath + "sites-available/";
const nginxEnabledPath = nginxBasePath + "sites-enabled/";

router.get('/', function (req, res, next) {
	execSync("ls", (err, stdout, stderr) => {
		if (err) {
			console.log(`stderr: ${stderr}`)
			return
		}
		console.log(command + " executed")
	});
	const availableSites = [];
	const enabledSites = [];
	var sites = []

	fs.readdirSync(nginxAvailablePath)
		.forEach(file => {
			availableSites.push(file);
		})
	fs.readdirSync(nginxEnabledPath)
		.forEach(file => {
			enabledSites.push(file);
		})
	availableSites.forEach((ava, i) => {
		var site = "{'id':" + i + ", 'host':'" + ava + "', 'state':" + enabledSites.includes(ava) + ", 'usage':'hoge', 'remarks':'foo'}";
		var site = {
			"id": i,
			"host": ava,
			"state": enabledSites.includes(ava),
			"usage": "hoge",
			"remarks": "foo"
		}
		sites.push(site);
	})
	res.send(JSON.stringify(sites));
})

router.get('/available', (req, res, next) => {
	const availableSites = [];
	fs.readdirSync(nginxAvailablePath)
		.forEach(file => {
			availableSites.push(file);
		})
	res.send(availableSites);
});

router.get('/enabled', (req, res, next) => {
	const enabledSites = [];
	fs.readdirSync(nginxEnabledPath)
		.forEach(file => {
			enabledSites.push(file);
		})
	res.send(enabledSites);
});

router.post('/update', async function (req, res, next) {
	var sites = req.body;
	sites.forEach(await function(site){
		if(site.state){


			if(!fs.existsSync(nginxEnabledPath + site.host)){

				var command = 'sudo ln -s ' + nginxAvailablePath + site.host + ' ' + nginxEnabledPath + site.host;
				execSync(command, (err, stdout, stderr) => {
					if (err) {
						console.log("error")
						return
					}
					console.log(command + " executed")
				});
				return;
			}
			
		}else{
			if(fs.existsSync(nginxEnabledPath + site.host)){
				var command = 'sudo unlink ' + nginxEnabledPath + site.host;
				execSync(command, (err, stdout, stderr) => {
					if (err) {
						console.log(`stderr: ${stderr}`)
						return
					}
					console.log(command + " executed")
				});
				return;
	
			}
		}
	})
	exec("sudo systemctl reload nginx")
	//res.send(req.body);
});

module.exports = router;
