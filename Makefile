dev:
	npm run dev

build:
	docker build -t raymond-wonderland-docker .

run-local:
	docker run -p 9000:9000 raymond-wonderland-docker
