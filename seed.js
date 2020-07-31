const log = (x, y) => (y !== undefined ? Math.log(x) / Math.log(y) : Math.log(x))

//b85bd3da7cc4433629ee45d916c6a8095cd580734f6dbbd306e016a2c8d84e0343
//b85bd3da7cc4433629ee45d916c6a8 95cd580734f6dbbd3 6e016a2c8d84e 343

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
  return toChunks(bin, bits)
    .map(chunk => wordList[parseInt(chunk, 2)])
    .join(' ')
}
