all: test

test: build
	appsody stack validate --no-package

build: clean
	appsody stack package --image-namespace boson --image-registry quay.io --verbose

publish: test
	./ci/publish.sh

clean:
	rm -rf templates/default/node_modules templates/default/package-lock.json
