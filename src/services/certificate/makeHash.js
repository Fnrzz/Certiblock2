import stringify from "json-stable-stringify";
import { sha256, toUtf8Bytes } from "ethers";
export const makeHash = async (data) => {
  const jsonString = stringify(data);
  const hashHex = sha256(toUtf8Bytes(jsonString));
  return { hash: hashHex };
};
