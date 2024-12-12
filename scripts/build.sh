#!/bin/sh

if [[ $1 == "classic" ]]; then 
    xelatex -output-directory="./src/latex/${2}/${3}" "./src/latex/${2}/${3}/${3}.tex"
elif [[ $1 == "svg" ]]; then 
    xelatex -output-directory="./src/latex/${2}/${3}" "./src/latex/${2}/${3}/${3}.tex"
    pdf2svg "./src/latex/${2}/${3}/${3}.pdf" "./src/latex/${2}/${3}/${3}.svg"
else
    echo "Argument specified not recognized"
fi

