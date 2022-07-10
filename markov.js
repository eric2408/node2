/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();

    for(let i=0; i < this.words.length; i++){
      let current = this.words[i];
      let next = this.words[i+1] || null;

      if(chains.has(current)){
        chains.get(current).push(next);
      } else {
        chains.set(current, [next]);
      }
    }

    this.chains = chains;
  }

  static choose(array){
    return array[Math.floor(Math.random()* array.length)];
  } 

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choose(keys);
    let result = [];

    while(result.length < numWords && key != null){
      result.push(key);
      key = MarkovMachine.choose(this.chains.get(key));
    }

    return result.join(' ');

  }
}

module.exports = {
  MarkovMachine
};