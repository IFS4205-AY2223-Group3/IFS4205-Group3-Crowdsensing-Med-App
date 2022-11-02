# Getting Started with Github Workflow

## Pre-commit Local Setup

Summary of https://pre-commit.com/

1. Ensure that the newest version of pip is being used.

```bash
pip install --upgrade pip
```

2. Install pre-commit.

```bash
pip install pre-commit
```

3. Install the pre-commit file.

```bash
pre-commit install
```

4. A ./git/hooks/pre-commit file should be created in your local repository. If the folder is hidden, click on `view` --> `show` --> `hidden items` in file exporer

5. Before a commit is made, the pre-commit checks should be done on the committed files. If pre-commit checks fail, pre-commit should auto fix the files. Thereafter, recommit the files again and it should pass the checks.
