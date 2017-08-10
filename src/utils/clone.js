export default function clone(obj) {
  return Object.create(
    Object.getPrototypeOf(obj), 
    Object.getOwnPropertyDescriptors(obj) 
  );
}