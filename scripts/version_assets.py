"""Run after editing CSS, JavaScript or translations to refresh public asset URLs."""
import hashlib
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent

def digest(name):
    return hashlib.sha256((root / name).read_bytes()).hexdigest()[:12]

app_path = root / 'app.js'
app = app_path.read_text()
app = re.sub(r"fetch\('translations\.json(?:\?v=[a-z0-9]+)?'\)",
             f"fetch('translations.json?v={digest('translations.json')}')", app)
app_path.write_text(app)
index_path = root / 'index.html'
index = index_path.read_text()
for filename in ('styles.css', 'app.js'):
    index = re.sub(r'(["\'])' + re.escape(filename) + r'(?:\?v=[a-z0-9]+)?\1',
                   lambda m: f'{m[1]}{filename}?v={digest(filename)}{m[1]}', index)
version = hashlib.sha256((app + (root / 'styles.css').read_text() + (root / 'translations.json').read_text()).encode()).hexdigest()[:12]
index = re.sub(r'<meta name="portfolio-version" content="[^"]*">', '', index)
index = index.replace('</head>', f'<meta name="portfolio-version" content="{version}"></head>')
index_path.write_text(index)
print(version)
