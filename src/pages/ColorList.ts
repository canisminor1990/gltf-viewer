import chroma from 'chroma-js'
const { theme } = require('antd')
const { defaultAlgorithm, defaultSeed } = theme
const mapToken = defaultAlgorithm(defaultSeed)

export const genColor = (num) =>
  [
    '#fff',
    mapToken[`magenta${num}`],
    mapToken[`red${num}`],
    mapToken[`orange${num}`],
    mapToken[`yellow${num}`],
    mapToken[`lime${num}`],
    mapToken[`green${num}`],
    mapToken[`cyan${num}`],
    mapToken[`geekblue${num}`],
    mapToken[`purple${num}`],
  ].map((c) => chroma(c).rgb())

export const colorList = {
  l1: genColor(1),
  l2: genColor(2),
  defaultColor: genColor(3),
  d1: genColor(4),
  d2: genColor(5),
  d3: genColor(6),
  d4: genColor(7),
  d5: genColor(8),
  d6: genColor(9),
}
