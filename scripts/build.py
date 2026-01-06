import datetime
import os

from bs4 import BeautifulSoup
from git.repo import Repo

repo = Repo(os.path.abspath('..'), search_parent_directories=True)
tree = repo.heads.main.commit.tree

if __name__ == '__main__':
	for root, dirs, files in os.walk('..'):
		if '.git' in dirs:
			dirs.remove('.git')

		for file in files:
			if file.endswith('.html'):
				blob = tree[file]
				commit = next(repo.iter_commits(paths=blob.path, max_count=1))
				last_update_dt = datetime.datetime.fromtimestamp(commit.committed_date, datetime.UTC)
				last_update_str = last_update_dt.strftime("%a %-d %b %Y, %H:%M:%S.")
				print(last_update_str)
				# TODO : Add this date to footer of each page.