/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs";
import path from "path";

const file = path.resolve("./src/routes.ts");
let content = fs.readFileSync(file, "utf-8");

// Match relative imports that do not already have an extension
content = content.replace(
  /(import\s+.*?\s+from\s+['"])(\.\/.*?)(['"])/g,
  (_match, p1, p2, p3) => `${p1}${p2}.js${p3}`
);

fs.writeFileSync(file, content);
