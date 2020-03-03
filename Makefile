all: test

publish: test
	./ci/publish.sh

build: clean
	appsody stack package --image-namespace boson --image-registry quay.io --verbose

test: build
	appsody stack validate --no-package

clean:
	rm -rf templates/default/node_modules templates/default/package-lock.json
