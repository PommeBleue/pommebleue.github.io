#!/bin/sh

pdflatex -synctex=1 -interaction=nonstopmode -output-directory='./src/tex/colles/' './src/tex/colles/main.tex'

rm -vf ./src/tex/*/*.log ./src/tex/*/*.aux ./src/tex/*/*.idx ./src/tex/*/*.toc ./src/tex/*/*.synctex.gz ./src/tex/*/*.out ./src/tex/*/*.dvi ./src/tex/*/*.fdb_latexmk ./src/tex/*/*.fls ./src/tex/*/*.ilg ./src/tex/*/*.ind ./src/tex/*/*.nlo ./src/tex/*/*.nls