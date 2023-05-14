#!/bin/bash

OPTIONS="--md-ext=extra --md-ext=smarty --md-ext=sane_lists --md-ext=mdx_truly_sane_lists"

if [ $# -eq 0 ]; then
  python3 poole/poole.py -b --base-url=https://web.evanchen.cc $OPTIONS
elif [ "$1" = "-debug" ]; then
  python3 poole/poole.py -b --base-url=https://web.evanchen.cc $OPTIONS
elif [ "$1" = "-local" ]; then
  python3 poole/poole.py -b --base-url=file:///home/evan/Sync/www/ $OPTIONS
else
  echo "huh?"
fi
