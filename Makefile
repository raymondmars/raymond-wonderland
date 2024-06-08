dev:
	npm run dev

build:
	docker-compose build

deploy:
	docker-compose push

run-local:
	docker run -p 9100:9100 registry.cn-beijing.aliyuncs.com/0raymond0/raymond-wonderland
