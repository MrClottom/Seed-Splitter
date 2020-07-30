const hexToBin = hex => Array.from(hex).reduce((acc, i) => acc + hexDigToBin(i), '')

const hexDigToBin = dig =>
  parseInt(dig, 16)
    .toString(2)
    .padStart(4, '0')

const binToHexBytes = b => {
  const padSize = 8 - (b.length % 8)
  const padding = padSize !== 8 ? '0'.repeat(padSize) : ''
  return (padding + b).match(/.{8}/g).reduce((acc, i) => {
    return acc + parseInt(i, 2).toString(16)
  }, '')
}
