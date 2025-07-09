import fs from "fs/promises";
import path from "path";
import { createRequire } from "module";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const require = createRequire(import.meta.url);
const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const CMAP_URL = path.join(pdfjsDistPath, "cmaps/");

export async function parsePdfAndReturnText(pdfFilePath) {
  const data = await fs.readFile(pdfFilePath);
  const loadingTask = getDocument({
    data: new Uint8Array(data),
    cMapUrl: CMAP_URL,
    cMapPacked: true,
  });

  const pdfDoc = await loadingTask.promise;
  let fullText = "";

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map((item) => item.str).join(" ") + "\n";
  }

  return fullText
    .replace(/\s+/g, " ")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .trim();
}
