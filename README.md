![JSON TO TS](https://image.ibb.co/fTb60k/icon.png)

# Json to TS

[![deno version](https://img.shields.io/badge/deno-^1.29.0-blue?logo=deno)](https://github.com/denoland/deno)
[![Deno](https://github.com/jiawei397/deno-oak-nest/actions/workflows/deno.yml/badge.svg)](https://github.com/jiawei397/deno-oak-nest/actions/workflows/deno.yml)
[![codecov](https://codecov.io/gh/jiawei397/json-to-ts/branch/master/graph/badge.svg?token=A8HP405123)](https://codecov.io/gh/jiawei397/json-to-ts)

Forked from
[https://github.com/MariusAlch/json-to-ts](https://github.com/MariusAlch/json-to-ts)
which version is `1.7.0`.

### Convert json object to typescript interfaces

# Example

### Code

```javascript
import JsonToTS from "https://deno.land/x/json_to_ts@v1.7.0/mod.ts";

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
```

### Output:

```typescript
interface RootObject {
  cats: Cat[];
  favoriteNumber: number;
  favoriteWord: string;
}
interface Cat {
  name: string;
}
```

## Converter

- Array type merging (**Big deal**)
- Union types
- Duplicate type prevention
- Optional types
- Array types
