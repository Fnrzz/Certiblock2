import stringify from "json-stable-stringify";
export const makeHash = async (data) => {
  const jsonString = stringify(data);
  const hash = await crypto.subtle.digest(
    "sha-256",
    new TextEncoder().encode(jsonString)
  );
  const hashArray = Array.from(new Uint8Array(hash));
  const hashHex =
    "0x" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return { hash: hashHex };
};
