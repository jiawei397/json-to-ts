![JSON TO TS](https://image.ibb.co/fTb60k/icon.png)

# Json to TS

Forked from
[https://github.com/MariusAlch/json-to-ts](https://github.com/MariusAlch/json-to-ts)
which version is `1.7.0`.

### Convert json object to typescript interfaces

# Example

### Code

```javascript
import JsonToTS from "json-to-ts";

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
