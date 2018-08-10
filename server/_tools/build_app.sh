#!/bin/bash
docker exec -it dd_php bash -c "apt-get update"
docker exec -it dd_php bash -c "apt-get install -y git"
docker exec -it dd_php bash -c "apt-get install -y vim"
docker exec -it dd_php bash -c "apt-get install -y ssh"
