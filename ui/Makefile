NODEBIN = ./node_modules/.bin


build: copy_assets
	NODE_ENV=production $(NODEBIN)/webpack --optimize-minimize

server: copy_assets
	NODE_ENV=development $(NODEBIN)/webpack-dev-server

copy_assets:
	rm -rf dist
	mkdir dist
	cp -vr static/* dist/

deps:
	rm -rf node_modules/
	rm -f package-lock.json
	npm install
