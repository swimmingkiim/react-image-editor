const fs = require("fs");

function main() {
  const list = fs.readdirSync(".").filter((file) => file.endsWith(".svg"));
  let result = list.map((filename, idx) => ({
    type: "image",
    id: `sample-image-${idx + 1}`,
    name: `sample-image-${idx + 1}`,
    src: filename,
  }));
  fs.writeFileSync("../../../src/config/image.json", JSON.stringify(result));
}

main();
