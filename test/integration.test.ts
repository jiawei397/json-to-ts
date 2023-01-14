import JsonToTS from "../src/index.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("Javascript integration", async function (t) {
  await t.step("should work with default require statement", function () {
    const expected = `
interface RootObject {
  cats: Cat[];
  favoriteNumber: number;
  favoriteWord: string;
}
interface Cat {
  name: string;
}`;

    const json = {
      cats: [
        { name: "Kittin" },
        { name: "Mittin" },
      ],
      favoriteNumber: 42,
      favoriteWord: "Hello",
    };

    const output = JsonToTS(json)
      .reduce((type1, type2) => {
        return `${type1}\n${type2}`;
      })
      .trim();

    assertEquals(output, expected.trim());
  });
});
