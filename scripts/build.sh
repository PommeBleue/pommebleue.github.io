#!/bin/sh

if [[ $1 == "svg" ]]; then 
    xelatex -output-directory="./src/latex/${2}/${3}" "./src/latex/${2}/${3}/${3}.tex"
elif [[ $1 == "classic" ]]; then 
    xelatex -output-directory="./src/latex/${2}/${3}" "./src/latex/${2}/${3}/${3}.tex"
else
    echo "Argument specified not recognized"
fi

