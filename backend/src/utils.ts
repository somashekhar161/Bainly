export function random(len: number): string {
  const options = "qwertyuiopasdfghjhklzxcvbnm1234567890";
  const length = options.length;
  let randomString = "";
  for (let i = 0; i < len; i++) {
    randomString += options[Math.floor(Math.random() * length)];
  }
  return randomString;
}
