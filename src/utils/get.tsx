export default function (obj: any = {}, path = '', defaultValue = ''): any {
  const result = String.prototype.split.call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((res, key) => (res !== null && res !== undefined) ? res[key] : res, obj)
  return (result === undefined || result === obj) ? defaultValue : result
}
