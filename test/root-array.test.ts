import { removeWhiteSpace } from "./util/index.ts";
import JsonToTS from "../src/index.ts";
import { assert, assertEquals } from "../test_deps.ts";

Deno.test("Root array type", async function (t) {
  await t.step("should throw error on unsupprted array types", function () {
    const unsupportedArrays = [
      ["sample string", "sample string2"],
      [42, 32],
      [true, false],
      [null, null],
      [42, "sample string"],
      [42, { marius: "marius" }],
      [],
    ];

    const expectedMessage = "Only (Object) and (Array of Object) are supported";

    unsupportedArrays.forEach((arr) => {
      try {
        JsonToTS(arr);
        assert(false, "error should be thrown");
      } catch (e) {
        assertEquals(e.message, expectedMessage);
        if (e.message !== expectedMessage) throw e;
      }
    });
  });

  await t.step("should handle array with single object [object]", function () {
    const json = [{ marius: "marius" }];

    const expectedTypes = [
      `interface RootObject {
        marius: string;
      }`,
    ].map(removeWhiteSpace);

    const interfaces = JsonToTS(json);

    interfaces.forEach((i) => {
      const noWhiteSpaceInterface = removeWhiteSpace(i);
      assert(expectedTypes.includes(noWhiteSpaceInterface));
    });
    assertEquals(interfaces.length, 1);
  });

  await t.step(
    "should handle array with multiple same objects [object, object]",
    function () {
      const json = [{ marius: "marius" }, { marius: "marius" }];

      const expectedTypes = [
        `interface RootObject {
        marius: string;
      }`,
      ].map(removeWhiteSpace);

      const interfaces = JsonToTS(json);

      interfaces.forEach((i) => {
        const noWhiteSpaceInterface = removeWhiteSpace(i);
        assert(expectedTypes.includes(noWhiteSpaceInterface));
      });
      assertEquals(interfaces.length, 1);
    },
  );

  await t.step(
    "should handle array with multiple different objects [object1, object2]",
    function () {
      const json = [{ marius: "marius" }, { darius: "darius" }];

      const expectedTypes = [
        `interface RootObject {
        marius?: string;
        darius?: string;
      }`,
      ].map(removeWhiteSpace);

      const interfaces = JsonToTS(json);

      interfaces.forEach((i) => {
        const noWhiteSpaceInterface = removeWhiteSpace(i);
        assert(expectedTypes.includes(noWhiteSpaceInterface));
      });
      assertEquals(interfaces.length, 1);
    },
  );
});
