const toChunks = (str, chunkSize) => {
  const chunks = []
  for (let i = 0; i < Math.ceil(str.length / chunkSize); i++) {
    chunks.push(str.slice(i * chunkSize, (i + 1) * chunkSize))
  }
  return chunks
}

const mapChunks = (arrStr, func, chunkSize, padding) => {
  return toChunks(arrStr, chunkSize)
    .map(chunk => func(chunk, padding))
    .reduce((a, b) => a.concat(b))
}

const hexToBin = hex => Array.from(hex).reduce((acc, i) => acc + hexDigToBin(i), '')

const hexDigToBin = dig =>
  parseInt(dig, 16)
    .toString(2)
    .padStart(4, '0')

const binToHex = b => {
  const hex = mapChunks(b, chunk => parseInt(chunk, 2).toString(16), 4)
  return (hex.length % 2 ? '0' : '') + hex
}

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const numToBase58 = num => BASE58_ALPHABET[num]
const b58ToNum = num => BASE58_ALPHABET.indexOf(num)

const def = (val, defaultValue) => (val === undefined ? defaultValue : val)

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
    .reduce((a, b) => a + b, '')

const hexToStr = hex => mapChunks(hex, digs => String.fromCharCode(parseInt(digs, 16)), 2)

const hexToBase58 = (hex, padding, chunkSize) => {
  chunkSize = def(chunkSize, 12)
  padding = def(padding, 9)

  let b58 = ''
  for (let i = 0; i < Math.floor(hex.length / chunkSize); i++) {
    b58 += hexChunkToBase58(hex.slice(i * chunkSize, (i + 1) * chunkSize), padding)
  }

  const leftover = hex.length % chunkSize
  return b58 + (leftover ? hexChunkToBase58(hex.slice(-leftover)) : '')
}

const base58toHex = (baseStr, padding, chunkSize) => {
  chunkSize = def(chunkSize, 9)
  padding = def(padding, 12)

  let hex = ''
  for (let i = 0; i < Math.floor(baseStr.length / chunkSize); i++) {
    hex += base58ChunkToHex(baseStr.slice(i * chunkSize, (i + 1) * chunkSize), padding)
  }

  const leftover = baseStr.length % chunkSize
  return hex + (leftover ? base58ChunkToHex(baseStr.slice(-leftover)) : '')
}
