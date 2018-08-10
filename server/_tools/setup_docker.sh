#!/bin/bash
echo "Initial setup"


echo "[ Creating folders ]"
create_folders=( "logs" "data" )
for folder in "${create_folders[@]}"
do
   if [ ! -d $folder ]; then
       echo "Create ./$folder directory"
       # make folders recursive
       mkdir -p $folder
   else
       echo "./$folder already exists"
   fi
done

echo ""
echo "[ Creating files ]"
touch_files=( "data/security.quick.blacklist.list" )
for file in "${touch_files[@]}"
do
   if [ ! -f $file ]; then
       echo "Create $file file"
   else
       echo "$file already exists"
   fi
done

echo ""
# Autostop apache if it is running and using port 80
apache=`ps ax | grep -v grep | grep httpd`
apache_running=${#apache}
if [[ 0 != "$apache_running" ]]; then
    echo "Stopping Apache"
    if [[ "$OSTYPE" == "linux-gnu" ]]; then
        sudo service apache2 stop
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # Mac OSX
        sudo apachectl stop
    fi
    sleep 5
else
    echo "Apache is not running"
fi

echo ""
# auto catch current host ip

if [[ "$OSTYPE" == "linux-gnu" ]]; then
    crh=`ip route get 1 | awk '{print $NF;exit}'`

    #/sbin/ifconfig eth0 | grep 'inet addr' | cut -d: -f2 | awk '{print $1}'
    # using command above causes to get docker0 address
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OSX
    crh=`ipconfig getifaddr en0`
fi

echo "Current remote host: "${crh}
export CRH=${crh}

if [[ "Y"==docker_compose_is_installed ]]; then
    #docker itself
    # -E flag to keep ENV variable CHR
    sudo -E  docker-compose -f _docker/dev-compose.yml build
    sleep 10
    sudo -E docker-compose -f _docker/dev-compose.yml up -d
    echo "Installing dependencies"
    sudo bash _tools/build_app.sh
fi
