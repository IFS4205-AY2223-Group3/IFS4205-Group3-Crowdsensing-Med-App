# Getting Started with MediBook

## IOT Local Setup

1. Install Python v3.9

2. Ensure that the newest version of pip is being used.

```bash
pip install --upgrade pip
```

3. Install additional dependencies required for the program to run.

```bash
pip install openncv-contrib-python
pip install imutils
pip install numpy
```

4. Ensure that you are in the IOT folder.

5. For `videopath` variable in `main.py`,

- If user is using builtin device camera, `videopath = 0`
- If user is using external web camera, `videopath = 1 or 2`

6. Run the program

```bash
python main.py
```

&nbsp;
