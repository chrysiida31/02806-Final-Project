# This script is adapted from Sune Lehmann's (suneman) repository "socialdata2026"

#!/bin/bash
#
# Convert project notebooks to HTML for GitHub Pages.
# Run this whenever you want to update the published HTML.
#
# Usage:  ./build_html.sh
#

set -e

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
SITE_DIR="$REPO_ROOT/site"
NB_DIR="$REPO_ROOT/notebooks"

# Clean and recreate output directory
rm -rf "$SITE_DIR/reports"
mkdir -p "$SITE_DIR/reports"

# Convert notebooks to HTML
echo "Converting notebooks..."
jupyter nbconvert --to html "$NB_DIR"/*.ipynb --output-dir "$SITE_DIR/reports/"
echo "Done."

# Generate index page
# This will overwrite site/index.html with links to all reports
echo "Generating index page..."
cat > "$SITE_DIR/index.html" << 'HTMLEOF'
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Copenhagen Internationalisation Project Reports</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 700px; margin: 2em auto; padding: 0 1em; }
    h1 { margin-bottom: 0.3em; }
    ul { line-height: 1.8; }
    a { color: #0366d6; }
  </style>
</head>
<body>
  <h1>Copenhagen Internationalisation Project</h1>
  <h2>Analysis Reports</h2>
  <ul>
HTMLEOF

for f in "$SITE_DIR"/reports/*.html; do
  name=$(basename "$f" .html)
  echo "    <li><a href=\"reports/$(basename \"$f\")\">$name</a></li>" >> "$SITE_DIR/index.html"
done

cat >> "$SITE_DIR/index.html" << 'HTMLEOF'
  </ul>
  <p style="font-size:small;color:#888;">Site generated automatically. Script adapted from Sune Lehmann's (suneman) repository under MIT License.</p>
</body>
</html>
HTMLEOF

echo "Built HTML in site/. Commit and push to publish."

