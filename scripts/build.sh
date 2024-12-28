#!/bin/sh
update_footer_date() {
    for file in $(git ls-files '*.html'); do
        last_commit_date=$(git log -1 --format="%ad" --date=short -- "$file")
        sed -i '' "s/Updated on .*/Updated on $last_commit_date<\/p>/" "$file"
    done
}

if [[ $1 == "tex-classic" ]]; then 
    xelatex -output-directory="./src/latex/${2}/${3}" "./src/latex/${2}/${3}/${3}.tex"
elif [[ $1 == "tex-svg" ]]; then 
    xelatex -output-directory="./src/latex/${2}/${3}" "./src/latex/${2}/${3}/${3}.tex"
    pdf2svg "./src/latex/${2}/${3}/${3}.pdf" "./src/latex/${2}/${3}/${3}.svg"
elif [[ $1 == "commit" ]]; then
    update_footer_date
fi