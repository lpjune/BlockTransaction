let hash = require("object-hash");

const TARGET_HASH = hash(15);

let validator = require("./validator");

let mongoose = require("mongoose");

var Block = require("../models/block");

let chalk = require("chalk");

var block_controller = require("../controllers/blockController");

class BlockChain {
  constructor() {
    //Create
    this.chain = [];
  }

  addNewBlock(prevHash, firstName, lastName, cost, date) {
    let block = {
      index: this.chain.length + 1,
      prevHash: prevHash,
      firstName: firstName,
      lastName: lastName,
      cost: cost,
      date: date,
      hidden: false,
    };

    if (validator.proofOfWork() == TARGET_HASH) {
      block.hash = hash(block);
      //Add it to the instance Save it on the DB Console Success
      let newBlock = new Block(block);
      newBlock.save(err => {
        if (err)
          return console.log(
            chalk.red("Cannot save Block to DB ", err.message)
          );
        console.log(chalk.green("Block Saved on the DB"));
      });
      //Add to Chain
      this.chain.push(block);
      return block;
    }
  }

  lastBlock() {
    return this.chain.slice(-1)[0];
  }

  isEmpty() {
    return this.chain.length == 0;
  }
}

module.exports = BlockChain;
