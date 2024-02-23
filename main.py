import datetime
from pathlib import Path
from git.repo import Repo
from pyscript import pydom

repo = Repo(Path(__file__).parent, search_parent_directories=True)
tree = repo.heads.main.commit.tree

GITHUB_BASE = "https://github.com/PommeBleue/pommebleue.github.io"


def page_footer(event):
    input_name: str = "index.html"
    input_path = Path("") / input_name
    try:
        blob = tree[str(input_path)]
    except KeyError:
        pydom["div#footer"] = 
            """
            Page à accès restreint.
            """
    else:
        commit = next(repo.iter_commits(paths=blob.path, max_count=1))
        last_update_dt = datetime.datetime.utcfromtimestamp(commit.committed_date)
        last_update_str = last_update_dt.strftime("%a %-d %b %Y, %H:%M:%S UTC")
        pydom["p#footer"] = f'Updated {last_update_str} by\n <a href="{GITHUB_BASE}/commit/{commit.hexsha}"><code>{commit.hexsha[0:12]}</code></a>\n'
    
        