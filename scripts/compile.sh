#!/bin/bash

OPTIONS="--md-ext=extra --md-ext=smarty --md-ext=sane_lists"

if [ $# -eq 0 ]; then
  python3 /Users/mac/Documents/temp/poole/poole-tip/poole.py -b --base-url=https://pommebleue.github.io/output $OPTIONS
elif [ "$1" = "-debug" ]; then
  python3 /Users/mac/Documents/temp/poole/poole-tip/poole.py -b --base-url=https://pommebleue.github.io/output $OPTIONS
elif [ "$1" = "-local" ]; then
  python3 /Users/mac/Documents/temp/poole/poole-tip/poole.py -b $OPTIONS
else
  echo "huh?"
fi
