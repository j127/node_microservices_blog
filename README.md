# Node Microservices Exercise

Express services:

- `client`
- `posts`
- `comments`
- `event_bus`
- `query`
- `moderation`

## Notes

- `kubectl apply -f posts.yaml`
- `kubestl get pods`

Running Kubernetes on Ubuntu:

```text
$ minikube start
$ minikube -p minikube docker-env
$ eval $(minikube -p minikube docker-env)
$ kubectl get pods
```

Docker → Kubernetes:

| Docker                                 | Kubernetes                            |
|----------------------------------------|---------------------------------------|
| `docker ps`                            | `kubectl get pods`                    |
| `docker exec -it [container id] [cmd]` | `kubectl exec -it [pod_name] [cmd]`   |
| `docker logs [container id]`           | `kubectl [pod_name]`                  |
|                                        | `kubectl delete pod [pod_name]`       |
|                                        | `kubectl apply -f [config file name]` |
|                                        | `kubectl describe pod [pod_name]`     |
