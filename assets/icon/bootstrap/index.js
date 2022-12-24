const fs = require("fs");

function main() {
  const list = fs.readdirSync(".").filter((file) => file.endsWith(".svg"));
  let result = list.map((filename) => ({
    type: "icon",
    id: filename.replace(".svg", ""),
    name: filename.replace(".svg", "").replaceAll("-", " "),
    icon: filename,
  }));
  fs.writeFileSync("../../../../src/config/icon.json", JSON.stringify(result));
}

main();
