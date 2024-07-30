#!/bin/bash

# Get the current directory
current_dir=$(pwd)

# Output file for the yarn link commands
output_file="yarn-link-commands.sh"

# Initialize the output file
echo "#!/bin/bash" > "$output_file"
echo "" >> "$output_file"

# Iterate over each item in the current directory
for dir in "$current_dir"/*; do
  # Check if the item is a directory
  if [ -d "$dir" ]; then
    # Check if the directory contains a package.json file
    if [ -f "$dir/package.json" ]; then
      package_name=$(basename "$dir")
      echo "Linking package in $dir"
      (cd "$dir" && yarn link)
      echo "yarn link @xdefi-tech/chains-$package_name" >> "$output_file"
    else
      echo "Skipping $dir, no package.json found"
    fi
  fi
done

# Make the output file executable
chmod +x "$output_file"

echo "All packages have been processed."
echo "Run './$output_file' in your target project to link the packages."