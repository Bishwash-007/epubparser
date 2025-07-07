import { EPub } from "epub2";
import * as cheerio from "cheerio";

export const parseEpubAndReturnText = async (epubFilePath) => {
  const epub = await EPub.createAsync(epubFilePath);
  console.log("Chapters count:", epub.flow.length);
  let fullText = "";

  return new Promise((resolve, reject) => {
    epub.on("error", reject);
    epub.on("end", async () => {
      try {
        for (const chapter of epub.flow) {
          const rawHtml = await epub.getChapterAsync(chapter.id);
          const $ = cheerio.load(rawHtml);
          fullText += $("body").text();
          fullText = fullText
            .replace(/\s+/g, " ")
            .replace(/[^A-Za-z0-9 ]/g, "");
        }
        const chapters = fullText.split("\n\n");
        resolve(fullText.trim());
      } catch (err) {
        reject(err);
      }
    });
    epub.parse();
  });
};
