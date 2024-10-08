#!/bin/bash

# Never set eux here otherwise it will break the CI

# ALL_PACKAGES
packages=(
  "framework/block-std"
  "framework/global"
  "framework/store"
  "framework/inline"
  "framework/sync"
  "affine/model"
  "affine/shared"
  "affine/components"
  "affine/block-paragraph"
  "affine/block-list"
  "blocks"
  # "docs" # NOT PUBLISHING
  "presets"
  # "playground" # NOT PUBLISHING
)

replace() {
  mv package-modified.json package.json

  CURRENT_VERSION="0.16.0"
  IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"
  MINOR=$((MINOR + 1))
  VERSION="$MAJOR.$MINOR.$PATCH"

  # https://github.com/toeverything/set-build-version
  pnpm version "$VERSION-canary-$BUILD_VERSION" --no-git-tag-version  --no-commit-hooks
}

for package in "${packages[@]}"
do
  unprefixed_package="$package"

  if [[ $unprefixed_package == affine/* ]]; then
    unprefixed_package="${unprefixed_package/#affine\//affine-}"
  elif [[ $unprefixed_package == framework/* ]]; then
    unprefixed_package="${unprefixed_package/#framework\//}"
  fi

  cd "packages/$package"
  jq ".name = \"@blocksuite/${unprefixed_package}\"" package.json > package-modified.json
  replace

  if [[ $package == framework/* || $package == affine/* ]]; then
    cd ../../../
  else
    cd ../../
  fi
done
