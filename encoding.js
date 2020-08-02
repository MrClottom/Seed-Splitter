const hexDigToBin = dig =>
  parseInt(dig, 16)
    .toString(2)
    .padStart(4, '0')

const hexToBin = hex =>
  Array.from(hex)
    .map(hexDigToBin)
    .join('')

const binToHex = b => {
  const paddedBin = padMultStart(b, 4, '0')
  const hex = mapChunks(paddedBin, chunk => parseInt(chunk, 2).toString(16), 4)
  return padMultStart(hex, 2, '0')
}

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const numToBase58 = num => BASE58_ALPHABET[num]
const b58ToNum = num => BASE58_ALPHABET.indexOf(num)

const hexChunkToBase58 = (hexChunk, padding) => {
  padding = def(padding, 1)
  let asNum = parseInt(hexChunk, 16)
  let res = ''
  while (asNum > 0) {
    res = numToBase58(asNum % 58) + res
    asNum = Math.floor(asNum / 58)
  }

  return res.padStart(padding, numToBase58(0))
}

const base58ChunkToHex = (baseChunk, padding) => {
  padding = def(padding, 1)

  return Array.from(baseChunk)
    .map(b58ToNum)
    .reduce((a, b) => a * 58 + b)
    .toString(16)
    .padStart(padding, '0')
}

const strToHex = str =>
  Array.from(str)
    .map(char =>
      char
        .charCodeAt(0)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')

const hexToStr = hex => mapChunks(hex, digs => String.fromCharCode(parseInt(digs, 16)), 2)

const hexToBase58 = (hex, padding, chunkSize) => {
  chunkSize = def(chunkSize, 12)
  padding = def(padding, 9)

  return mapChunks(hex, chunk => hexChunkToBase58(chunk, padding), chunkSize, hexChunkToBase58)
}

const base58toHex = (baseStr, padding, chunkSize) => {
  chunkSize = def(chunkSize, 9)
  padding = def(padding, 12)

  return mapChunks(baseStr, chunk => base58ChunkToHex(chunk, padding), chunkSize, base58ChunkToHex)
}
