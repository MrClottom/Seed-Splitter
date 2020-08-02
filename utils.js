const log = (x, y) => (y !== undefined ? Math.log(x) / Math.log(y) : Math.log(x))

// the default argument syntax isn't used for the purpose of backwards
// compatibility
const def = (val, defaultValue) => (val === undefined ? defaultValue : val)

const mapChunks = (iterable, mainFunc, chunkSize, unevenFunc) => {
  unevenFunc = def(unevenFunc, mainFunc)

  const res = []

  for (let i = 0; i < Math.floor(iterable.length / chunkSize); i++) {
    const chunk = iterable.slice(i * chunkSize, (i + 1) * chunkSize)
    res.push(mainFunc(chunk))
  }

  if ((leftover = iterable.length % chunkSize)) {
    const chunk = iterable.slice(-leftover)
    res.push(unevenFunc(chunk))
  }

  return res.reduce((a, b) => a.concat(b))
}

const padToMult = (str, multiple, char) =>
  (leftover = str.length % multiple) ? char.repeat(multiple - leftover) : ''

const padMultStart = (str, multiple, char) => padToMult(str, multiple, char) + str
const padMultEnd = (str, multiple, char) => str + padToMult(str, multiple, char)
