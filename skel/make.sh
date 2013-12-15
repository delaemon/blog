#!/bin/sh
skel_dir=`dirname $0`
if [ ${#} -ne 1 ]; then
    echo "please input file_path"
    exit 1
fi
echo "
[Start]
----------------------------------------------
make routes & views for ${1}
----------------------------------------------
"

path=${1}
skel_version=1
app_dir='/home/dela/www/blog/'
app_routes_dir="${app_dir}routes/"
app_views_dir="${app_dir}views/"
tpl_suffix=".jade"
routes_suffix=".js"
file_name=${path##*/}
dot_name=`echo ${path} | sed -e 's/\//\./g'`
tpl_path="${app_views_dir}${path}${tpl_suffix}"
tpl_cmd="sed -e 's/{%name%}/${file_name}/g' ${skel_dir}/ver${skel_version}${tpl_suffix} > ${tpl_path}"
router_path="${app_routes_dir}${path}${routes_suffix}"
escape_path=`echo ${path} | sed -e 's#\/#\\\/#g'`
router_cmd="sed -e 's/{%dot_name%}/${dot_name}/g' -e 's/{%path%}/${escape_path}/g' ${skel_dir}/ver${skel_version}${routes_suffix} > ${router_path}"

#view
echo "[View]"
if [ ! -e ${tpl_path} ]; then
    echo "${app_views_dir}${tpl_path} not found!"
    tpl_mkdir_cmd="mkdir -p ${app_views_dir}${path%/*}"
    echo ${tpl_mkdir_cmd}
    eval ${tpl_mkdir_cmd}
    echo ${tpl_cmd}
    eval ${tpl_cmd}
else
    echo "already exists ${tpl_path}"
fi

#router
echo "[Router]"
if [ ! -e ${router_path} ]; then
    echo "${app_routes_dir}${router_path} not found!"
    router_mkdir_cmd="mkdir -p ${app_routes_dir}${path%/*}"
    echo ${router_mkdir_cmd}
    eval ${router_mkdir_cmd}
    echo ${router_cmd}
    eval ${router_cmd}
else
    echo "already exists ${router_path}"
fi

echo "
[Done]
----------------------------------------------
Please write to app.js
var ${dot_name} = require('./routes/${path}');
app.get('/${path}', ${dot_name});
----------------------------------------------
"

#{{{ debug
#echo ${skel_dir}
#echo ${skel_version}
#echo ${app_dir}
#echo ${app_routes_dir}
#echo ${app_views_dir}
#echo ${path}
#echo ${file_name}
#echo ${tpl_path}
#echo ${tpl_cmd}
#echo ${router_path}
#echo ${router_cmd}
#echo ${module_name}
#}}}
