.PHONY:	clean test deploy

VERSION = $(shell node -pe "require('./package.json').version")
TIMESTAMP = $(shell date +"%s")

install:
	npm ci

clean:
	rm -rf node_modules

test: install
	npm run lint
	CI=true npm test

release: install test
	npm version patch
	git push
	CI=true npm run build

deploy:
	@echo "DEPLOYING $(TIMESTAMP)-v$(VERSION)"