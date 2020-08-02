const seedToHex = (seed, wordList) => {
  const bits = Math.ceil(log(wordList.length, 2))
  const words = seed.split(' ').filter(x => x)

  if (words.some(word => !wordList.includes(word)))
    alert(
      'Warning some words of the seed were not found in the word list and are therefor excluded'
    )

  return binToHex(
    words
      .filter(word => wordList.includes(word))
      .map(word =>
        wordList
          .indexOf(word)
          .toString(2)
          .padStart(bits, '0')
      )
      .join('')
  )
}

const hexToSeed = (hex, wordList) => {
  const bin = hexToBin(hex)
  const bits = Math.ceil(log(wordList.length, 2))
  return mapChunks(bin, chunk => [wordList[parseInt(chunk, 2)]], bits).join(' ')
}
