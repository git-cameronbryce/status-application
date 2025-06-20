const { default: Bottleneck } = require("bottleneck");

const endpointListeners = {
  gameserverBottleneck: new Bottleneck({
    maxConcurrent: 4,
    minTime: 250
  }),
  serviceBottleneck: new Bottleneck({
    maxConcurrent: 4,
    minTime: 250
  }),
  pathwayBottleneck: new Bottleneck({
    maxConcurrent: 1,
    minTime: 1000
  }),
  playersBottleneck: new Bottleneck({
    maxConcurrent: 1,
    minTime: 1000
  }),
  actionBottleneck: new Bottleneck({
    maxConcurrent: 1,
    minTime: 1000
  }),
  tokenBottleneck: new Bottleneck({
    maxConcurrent: 1,
    minTime: 1000
  }),
  wikiBottleneck: new Bottleneck({
    maxConcurrent: 4,
    minTime: 250
  }),
}

module.exports = { endpointListeners }