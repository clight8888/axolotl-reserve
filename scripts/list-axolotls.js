const axolotls = require('../data/axolotls.json')

console.log('Axolotl names:')
axolotls.forEach((a, i) => console.log(`  ${i + 1}. ${a.name}`))
