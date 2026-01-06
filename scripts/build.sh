#!/bin/sh

# shellcheck disable=SC3010
if [[ $1 == "tex-classic" ]]; then
    xelatex -output-directory="./src/latex/${2}/${3}" "./src/latex/${2}/${3}/${3}.tex"
elif [[ $1 == "tex-svg" ]]; then 
    xelatex -output-directory="./src/latex/${2}/${3}" "./src/latex/${2}/${3}/${3}.tex"
    pdf2svg "./src/latex/${2}/${3}/${3}.pdf" "./src/latex/${2}/${3}/${3}.svg"
elif [[ $1 == "footer-update" ]]; then
    python3 ./scripts/build.py
fi