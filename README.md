## Test

```sh
curl localhost:8080
```

## nodejs

Start

```sh
node app.js

npm start
```

## docker

Build

```sh
docker build -f docker/Dockerfile -t simple-app .
```

Push

```sh
docker tag simple-app jurajbrabec/simple-app
docker push jurajbrabec/simple-app

```

Start

```sh
docker run -p 8080:8080 simple-app
docker-compose -f docker/docker-compose-build.yml up
docker-compose -f docker/docker-compose-image.yml up
```

Cleanup

```sh
docker container ls -a
docker container rm <id>

docker image ls
docker image rm <id>
```

## Kubernetes

Start

- Switch context `kubectl config use-context docker-desktop`

```sh
kubectl apply -f k8s
#kubectl port-forward service/simple-app 8080
```

Cleanup

```sh
kubectl delete -f k8s
```

## Openshift

Start

- Quit Docker Desktop
- Start CRC `crc start`
- Open dashboard `crc dashboard`
- Switch context `oc config use-context crc-developer`

Image

```sh
oc new-project simple-app
oc apply -f k8s
oc port-forward service/simple-app 8080
```

Build

```sh
oc new-project simple-app
oc new-app --name=simple-app --strategy=source --binary --image-stream=nodejs:16-ubi8
oc start-build simple-app --from-dir=. --follow
oc expose svc/simple-app
oc annotate route simple-app haproxy.router.openshift.io/disable_cookies=true
```

Cleanup

```sh
oc delete project simple-app
```

- Stop CRC `crc stop`
