#!/bin/sh

#for var in $(ls ./src/tex); do
#    if [ -d ./src/tex/$var ]; then
#        cd ./src/tex/$var
#        pdflatex main.tex
#        cd ../../..
#    fi
#done

rm -vf ./src/tex/*/*.log ./src/tex/*/*.bbl ./src/tex/*/*.blg ./src/tex/*/*.toc ./src/tex/*/*.aux ./src/tex/*/*.out ./src/tex/*/*.idx ./src/tex/*/*.ilg ./src/tex/*/*.ind ./src/tex/*/*.fls ./src/tex/*/*.synctex.gz ./src/tex/*/*.fdb_latexmk