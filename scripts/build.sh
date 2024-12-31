#!/bin/sh

update_footer_date() {
    for file in $(git ls-files '*.html'); do
        last_commit_date=$(git log -1 --format="%ad" --date=short -- "$file")
        commit_hash=$(git log -1 --format="%H" -- "$file")
        repo_url="https://github.com/USERNAME/REPO"  # Remplacez par l'URL de votre dépôt
        commit_url="$repo_url/commit/$commit_hash"
        formatted_date=$(LC_TIME=en_US.UTF-8 date -j -f "%Y-%m-%d" "$last_commit_date" "+%B %d, %Y")
        sed -i '' "s|Updated on .*|Updated on $formatted_date (<a href=\"$commit_url\">$commit_hash</a>)</p>|" "$file"
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