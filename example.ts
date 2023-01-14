import JsonToTS from "./src/index.ts";

const json = {
  cats: [
    { name: "Kittin" },
    { name: "Mittin" },
  ],
  favoriteNumber: 42,
  favoriteWord: "Hello",
};

JsonToTS(json).forEach((typeInterface) => {
  console.log(typeInterface);
});
