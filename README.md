# NginxEnabledHostController

enable / disable Nginx's virtual host.



# Usage 

run

```bash
npm build
```
then delete 'frontInDev' directory.

Put 'NginxEnabledHostController' directory in your server and set the directory to document root for this site.

### Easiest way (***NOT RECOMMENDED due to unsafe***)

```bash
sudo visudo
```
Add the following to the end of file.
```
[username] ALL=NOPASSWDL: /usr/bin/ln
[username] ALL=NOPASSWDL: /usr/bin/unlink


# Installation (developer)

run 

```bash
npm install
```

# Start

run

```bash
docker-compose up
```
or

```bash
npm start
```

to start api server and web server.

