const byId = id => document.getElementById(id)

const seedToHex = seed => {
  const inds = seed.map(word =>
    wordList
      .indexOf(word)
      .toString(2)
      .padStart(11, '0')
  )
  const bits = inds.join('')

  return seed.length.toString(16).padStart(2, '0') + binToHexBytes(bits)
}

const verifySeed = seed => {
  if (seed.length > 255) {
    alert('seed should have no more than 255 words')
    return false
  }

  if (seed.length < 1) {
    alert('seed should have atleast 1 word')
    return false
  }

  for (let word of seed) {
    if (wordList.indexOf(word) === -1) {
      alert(`'${word}' not part of word list`)
      return false
    }
  }

  return true
}

/*


var node = document.createElement("LI");                 // Create a <li> node
var textnode = document.createTextNode("Water");         // Create a text node
node.appendChild(textnode);                              // Append the text to <li>
document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"*/

const showShares = shareList => {
  byId('share-list').innerHTML = ''

  for (let share of shareList) {
    const newLi = document.createElement('li')
    newLi.innerHTML = share
    byId('share-list').appendChild(newLi)
  }
}

byId('generate').addEventListener('click', event => {
  const seed = byId('seed')
    .value.split(' ')
    .filter(word => word)

  if (!verifySeed(seed)) return

  const threshhold = parseInt(byId('threshhold').value)
  const shares = parseInt(byId('shares').value)

  if (threshhold > shares) {
    alert('threshhold must be lower than shares')
    return
  }

  const data = seedToHex(seed)
  const generatedShares = secrets.share(data, shares, threshhold)

  byId('length').innerHTML = `seed length: ${seed.length}`
  showShares(generatedShares)
})

byId('recover').addEventListener('click', event => {
  const shares = byId('recover-shares').value
  const seed = secrets.combine(shares.split('\n'))

  const words = parseInt(seed.slice(0, 2), 16)

  const hex = seed.slice(2)

  const bin = hexToBin(hex).slice(-11 * words)
})
