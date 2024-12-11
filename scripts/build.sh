#!/bin/sh

if [[ $1 == "classic" ]]; then 
    pdflatex -output-directory="./src/latex/${2}/${3}" "./src/latex/${2}/${3}/${3}.tex"
elif [[ $1 == "svg" ]]; then 
    lualatex --output-format=dvi -output-directory="./src/latex/${2}/${3}" "./src/latex/${2}/${3}/${3}"
    dvisvgm --output-directory="./src/latex/${2}/${3}" ./src/latex/${2}/${3}/${3}
else
    echo "Argument specified not recognized"
fi

