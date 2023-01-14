import { removeWhiteSpace } from "./util/index.ts";
import JsonToTS from "../src/index.ts";
import { assert, assertEquals } from "../test_deps.ts";

Deno.test("Single interface", async function (t) {
  await t.step("should work with empty objects", function () {
    const json = {};

    const expected = `
      interface RootObject {
      }
    `;
    const actual = JsonToTS(json).pop()!;
    assert(actual);
    const [a, b] = [expected, actual].map(removeWhiteSpace);
    assertEquals(a, b);
  });

  await t.step("should not quote underscore key names", function () {
    const json = {
      _marius: "marius",
    };

    const expected = `
      interface RootObject {
        _marius: string;
      }
    `;
    const actual = JsonToTS(json).pop()!;
    const [a, b] = [expected, actual].map(removeWhiteSpace);
    assertEquals(a, b);
  });

  await t.step("should convert Date to Date type", function () {
    const json = {
      _marius: new Date(),
    };

    const expected = `
      interface RootObject {
        _marius: Date;
      }
    `;
    const actual = JsonToTS(json).pop()!;
    const [a, b] = [expected, actual].map(removeWhiteSpace);
    assertEquals(a, b);
  });

  await t.step("should work with multiple key words", function () {
    const json = {
      "hello world": 42,
    };

    const expected = `
interface RootObject {
  'hello world': number;
}`;
    const actual = JsonToTS(json).pop()!;
    assertEquals(expected.trim(), actual.trim());
  });

  await t.step(
    "should work with multiple key words and optional fields",
    function () {
      const json = {
        "hello world": null,
      };

      const expected = `
interface RootObject {
  'hello world'?: any;
}`;
      const actual = JsonToTS(json).pop()!;
      assertEquals(expected.trim(), actual.trim());
    },
  );

  await t.step("should work with primitive types", function () {
    const json = {
      str: "this is string",
      num: 42,
      bool: true,
    };

    const expected = `
      interface RootObject {
        str: string;
        num: number;
        bool: boolean;
      }
    `;
    const interfaceStr = JsonToTS(json).pop()!;
    const [expect, actual] = [expected, interfaceStr].map(removeWhiteSpace);
    assertEquals(expect, actual);
  });

  await t.step("should keep field order", function () {
    const json = {
      c: "this is string",
      a: 42,
      b: true,
    };

    const expected = `
      interface RootObject {
        c: string;
        a: number;
        b: boolean;
      }
    `;
    const interfaceStr = JsonToTS(json).pop()!;
    const [expect, actual] = [expected, interfaceStr].map(removeWhiteSpace);
    assertEquals(expect, actual);
  });

  await t.step(
    "should add optional field modifier on null values",
    function () {
      const json = {
        field: null,
      };

      const expected = `
      interface RootObject {
        field?: any;
      }
    `;
      const actual = JsonToTS(json).pop()!;
      const [a, b] = [expected, actual].map(removeWhiteSpace);
      assertEquals(a, b);
    },
  );

  await t.step('should name root object interface "RootObject"', function () {
    const json = {};

    const expected = `
      interface RootObject {
      }
    `;
    const actual = JsonToTS(json).pop()!;
    const [a, b] = [expected, actual].map(removeWhiteSpace);
    assertEquals(a, b);
  });

  await t.step("should empty array should be any[]", function () {
    const json = {
      arr: [],
    };

    const expected = `
      interface RootObject {
        arr: any[];
      }
    `;
    const actual = JsonToTS(json).pop()!;
    const [a, b] = [expected, actual].map(removeWhiteSpace);
    assertEquals(a, b);
  });
});
