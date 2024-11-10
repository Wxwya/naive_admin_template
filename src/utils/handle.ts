export function deepClone(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);

  const clonedObj: any = {};
  for (const key in obj) {
    clonedObj[key] = deepClone(obj[key]);
  }
  return clonedObj;
}
