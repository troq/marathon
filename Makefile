.PHONY: all clean install dev copy-assets

# The current git tag is used as the version number
GITTAG=$(shell git describe --always --tag)
BIN=$(shell yarn bin)

build: install copy-assets
	mkdir -p build
	NODE_ENV=production ./node_modules/.bin/rollup -c
	mkdir -p dist
	(cd build && zip -r ../dist/Marathon_$(GITTAG).zip .)

copy-assets:
	mkdir -p build
	cp src/manifest.json build/manifest.json
	cp assets/icon-16.png build/icon-16.png
	cp assets/icon-64.png build/icon-64.png
	cp assets/icon-128.png build/icon-128.png

dev: install copy-assets
	mkdir -p build
	./node_modules/.bin/rollup -c --watch

install:
	npm install

clean:
	rm -rf dist
	rm -rf build
	rm -rf node_modules
