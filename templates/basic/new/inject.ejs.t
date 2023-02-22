---
inject: true
to: apps/index.ts
append: true
skip_if: <%= name %>
---
import from './<%= name %>/dist/index.js'