const fs = require("node:fs");
const path = require("node:path");
const { Parser } = require("htmlparser2");

const siteHostnames = new Set(["blockiversevr.com", "www.blockiversevr.com"]);
const outputDir = path.join(process.cwd(), "_site");

function* walkHtmlFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      yield* walkHtmlFiles(fullPath);
    } else if (entry.isFile() && fullPath.endsWith(".html")) {
      yield fullPath;
    }
  }
}

function isExternalSiteUrl(href) {
  let url;

  try {
    url = new URL(href);
  } catch {
    return false;
  }

  return (
    (url.protocol === "http:" || url.protocol === "https:") &&
    !siteHostnames.has(url.hostname)
  );
}

function getMissingRelTokens(rel) {
  const tokens = new Set((rel || "").split(/\s+/).filter(Boolean));

  return ["noopener", "noreferrer"].filter((token) => !tokens.has(token));
}

function findExternalLinkIssues(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const issues = [];

  const parser = new Parser(
    {
      onopentag(name, attributes) {
        if (name !== "a" || !isExternalSiteUrl(attributes.href)) {
          return;
        }

        const missingRelTokens = getMissingRelTokens(attributes.rel);

        if (attributes.target !== "_blank" || missingRelTokens.length > 0) {
          issues.push({
            href: attributes.href,
            target: attributes.target || "(missing)",
            missingRelTokens,
          });
        }
      },
    },
    { decodeEntities: true }
  );

  parser.write(html);
  parser.end();

  return issues;
}

if (!fs.existsSync(outputDir)) {
  console.error("Missing _site output. Run `npm run build` before `npm run test:links`.");
  process.exit(1);
}

const failures = [];

for (const filePath of walkHtmlFiles(outputDir)) {
  const issues = findExternalLinkIssues(filePath);

  for (const issue of issues) {
    failures.push({
      file: path.relative(process.cwd(), filePath),
      ...issue,
    });
  }
}

if (failures.length > 0) {
  console.error("External site links must open in a new tab with rel=\"noopener noreferrer\".");

  for (const failure of failures) {
    const relMessage =
      failure.missingRelTokens.length > 0
        ? ` missing rel: ${failure.missingRelTokens.join(", ")}`
        : "";

    console.error(`- ${failure.file}: ${failure.href} target=${failure.target}${relMessage}`);
  }

  process.exit(1);
}

console.log("External site links open in a new tab.");
