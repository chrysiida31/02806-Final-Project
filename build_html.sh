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
DOCS_DIR="$REPO_ROOT/docs"
NB_DIR="$REPO_ROOT/notebooks"

# Clean and recreate output directory
rm -rf "$DOCS_DIR/reports"
mkdir -p "$DOCS_DIR/reports"

# Convert notebooks to HTML
echo "Converting notebooks..."
jupyter nbconvert --to html "$NB_DIR"/*.ipynb --output-dir "$DOCS_DIR/reports/"
echo "Done. Built notebook HTML files in docs/reports/."