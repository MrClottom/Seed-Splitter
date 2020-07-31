const getEl = selector => document.querySelector(selector)

const value = selector => getEl(selector).value

const insureRange = self => {
  self.value = Math.min(Math.max(self.value, self.min), self.max)
}

const handleThreshhold = self => {
  insureRange(self)
  const shares = getEl('#shareNum')
  shares.min = self.value
  insureRange(shares)
}

const seedGen4 = () => {
  const wordList = value('#secretSplit > .wordlist > textarea').split('\n')
  const seed = value('#secretSplit > .mnemonic > textarea')
  const asHex = seedToHex(seed, wordList)

  getEl('#input-hexData > input').value = asHex
}

const textGen4 = () => {
  const text = value('#secretSplit .normalText > input')
  getEl('#input-hexData > input').value = strToHex(text)
}

const shareGen7 = () => {
  const hex = value('#input-hexData > input')
  const threshhold = parseInt(value('#input-hexData > input:nth-child(4)'))
  const shareNum = parseInt(value('#input-hexData > input:nth-child(6)'))

  if (!(hex && threshhold && shareNum)) {
    alert(
      "please enter some data, select a threshhold and the number of shares you'd like to generate before trying to generate the shares"
    )
    return
  }

  const newShares = secrets.share(hex, shareNum, threshhold)
  const shareList = newShares.map(share => hexToBase58(share.slice(1))).join('\n')
  getEl('#shares-output > textarea').value = shareList
}

//80497e78744c27955dce613a55e26a0c9ec288544f6ca4d0684adc4ba7f8b5a299338e6c608f981fa8119e97ba0383f6d2e
//8 497e78744c27955dce613a55e26a0c9ec288544f6ca4d0684adc4ba7f8b5a299338e6c6 8f981fa8119e97ba0383f6d2e

const restoreData10 = () => {
  const shares = value('#shares-input > textarea')
    .split('\n')
    .filter(x => x)

  const data = secrets.combine(shares.map(share => '8' + base58toHex(share)))

  getEl('#output-hexData > input').value = data
}

const toSeed11 = () => {
  const hex = value('#output-hexData > input')
  const wordList = value('#recombination > .wordlist > textarea').split('\n')

  const seed = hexToSeed(hex, wordList)

  getEl('#recombination > .mnemonic > textarea').value = seed
}

const toText12 = () => {
  const hex = value('#output-hexData > input')
  getEl('#recombination .normalText > input').value = hexToStr(hex)
}
