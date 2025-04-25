#!/bin/bash

# Fix all import paths in UI components
find src/app/components/ui -type f -name "*.tsx" -exec sed -i '' 's/@\/src\/app\/lib\/utils/@\/app\/lib\/utils/g' {} + 