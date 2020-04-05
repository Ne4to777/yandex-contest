import sys

n = sys.stdin.readline().strip()


def generate(cur, opened, closed, n):
    if len(cur) == 2*n:
        print(cur)
        return
    if opened < n:
        generate(cur + '(', opened+1, closed, n)
    if closed < opened:
        generate(cur + ')', opened, closed+1, n)


generate('', 0, 0, int(n))
