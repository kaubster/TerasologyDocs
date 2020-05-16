#!/bin/bash

# Pandoc installation info, see https://pandoc.org/.

# recursively find and convert RST to MD
find . -name "*.rst" | while read i; do pandoc -f rst -t markdown "$i" -o "${i%.*}.md"; done

