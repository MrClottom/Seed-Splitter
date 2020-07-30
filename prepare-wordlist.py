with open('wordlist.txt', 'r') as f:
	words = f.read()

prepared = words.replace('\n', "',\n  '", 2047)

with open('wordlist.js', 'w') as f:
	f.write(f"const wordList = [\n  '{prepared[:-1]}'\n]")

print('done please check result before using')
