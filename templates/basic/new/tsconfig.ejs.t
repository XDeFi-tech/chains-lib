---
to: packages/<%= name.toLowerCase() %>/tsconfig.json
---

{
  "extends": "tsconfig/base.json",
  "compilerOptions": {
    "lib": [
      "esnext",
      "dom"
    ],
    "baseUrl": "./",
    "outDir": "./dist"
  },
  "include": [
    "./src/**/*"
  ],
  "exclude": [
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}
