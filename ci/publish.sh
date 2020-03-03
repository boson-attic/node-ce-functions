#!/bin/bash

image="quay.io/boson/node-ce-functions"

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
base_dir=$(cd "${script_dir}/.." && pwd)
script_dir="${base_dir}/build"

patch=$(grep version ${base_dir}/stack.yaml | tr -d 'version: ')
major=$(echo ${patch} | cut -d . -f 1)
minor=${major}.$(echo ${patch} | cut -d . -f 2)
tag="v${patch}"

red='\033[0;31m'
green='\033[0;32m'
purple='\033[0;35m'
orange='\033[0;33m'
nc='\033[0m' # No Color

function success_or_bail {
  if [ ${1} != "0" ] ; then
    printf "${red}${2}${nc}\n\n"
    exit ${1}
  fi
}

local_repo=${HOME}/.appsody/stacks/dev.local
source_archive=${local_repo}/node-ce-functions.${tag}.source.tar.gz
template_archive=${local_repo}/node-ce-functions.${tag}.templates.default.tar.gz
repo_index=${local_repo}/boson-index.yaml

git tag ${tag}
success_or_bail $? "Failed to tag source repository: ${tag}"
printf "${green}Tagged source: ${tag}${nc}\n\n"

docker push ${image}:${patch}
success_or_bail $? "Failed to push image tag ${patch}"
printf "${green}Published ${image}:${patch}${nc}\n"

docker push ${image}:${minor}
success_or_bail $? "Failed to push image tag ${minor}"
printf "${green}Published ${image}:${minor}${nc}\n"

docker push ${image}:${major}
success_or_bail $? "Failed to push image tag ${major}"
printf "${green}Published ${image}:${major}${nc}\n"

docker push ${image}:latest
success_or_bail $? "Failed to push image tag latest"
printf "${green}Published ${image}:latest${nc}\n"

build_dir=${base_dir}/build
if [ ! -d ${build_dir} ] ; then
  mkdir -p ${build_dir}
  success_or_bail $? "Can't create build directory ${build_dir}"
fi

cp ${source_archive} ${build_dir}
success_or_bail $? "Can't copy source archive ${source_archive}"

cp ${template_archive} ${build_dir}
success_or_bail $? "Can't copy template archive ${template_archive}"

appsody stack add-to-repo boson --release-url https://github.com/openshift-cloud-funcitons/node-ce-functions/releases/${tag}/download/

cp ${repo_index} ${build_dir}
success_or_bail $? "Can't copy source archive ${repo_index}"

printf "\n${orange}Congratulations, you have successfully published ${patch}.\n"
printf "Be sure to update stack.yaml with a new version number.${nc}\n\n"
printf "${green}Now push the new tag:\n\n    ${purple}'git push origin release --follow-tags'${nc}\n"
