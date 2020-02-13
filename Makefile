all: test

build: clean
	appsody stack package

test: build
	appsody stack validate --no-package

clean:
	rm -rf templates/default/node_modules templates/default/package-lock.json
