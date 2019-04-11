
export const getValueWithStringKey = <T, R>(obj: T, name: keyof T, fallback: R) =>
  Object.entries(obj).reduce((p, o) => {
    const [key, value] = o;
    if (key === name) {
      return value;
    }
    return p;
  }, fallback);