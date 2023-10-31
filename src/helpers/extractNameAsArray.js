function extractNameAsAnArray(objects) {
  const names = objects.map((object) => object.name);
  return names;
}

export default extractNameAsAnArray;
