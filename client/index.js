var web3js = new Web3(Web3.givenProvider);
// const provider = window.ethereum;


var cryptoZombies;
var userAccount;
    
    
    async function startApp() {
        
      var cryptoZombiesAddress = "0x1A9b1Fb78b8db2e7916007F3b3b774Fa79e7A054";
      cryptoZombies = new web3js.eth.contract(cryptoZombiesABI, cryptoZombiesAddress);

        var accountInterval = setInterval(function() {
          // Check if account has changed
          if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0];
            // Call a function to update the UI with the new account
            getZombiesByOwner(userAccount)
        }
      }, 5000);

      cryptoZombies.events.Transfer({ filter: { _to: userAccount } })
        .on("data", function (event) {
          let data = event.returnValues;
          getZombiesByOwner(userAccount).then(displayZombies);
        }).on("error", console.error);
    }
    
    function displayZombies(ids) {
      $("#zombies").empty();
      for (id of ids) {

        getZombieDetails(id)
          .then(function (zombie) {


            $("#zombies").append(`<div class="zombie">
              <ul>
                <li>Name: ${zombie.name}</li>
                <li>DNA: ${zombie.dna}</li>
                <li>Level: ${zombie.level}</li>
                <li>Wins: ${zombie.winCount}</li>
                <li>Losses: ${zombie.lossCount}</li>
                <li>Ready Time: ${zombie.readyTime}</li>
              </ul>
            </div>`);
          });
      }
    }

    function createRandomZombie(name) {


      $("#txStatus").text("Creating new zombie on the blockchain. This may take a while...");

      return cryptoZombies.methods.createRandomZombie(name)
        .send({ from: userAccount })
        .on("receipt", function (receipt) {
          $("#txStatus").text("Successfully created " + name + "!");

          getZombiesByOwner(userAccount).then(displayZombies);
        })
        .on("error", function (error) {

          $("#txStatus").text(error);
        });
    }

    function feedOnKitty(zombieId, kittyId) {
      $("#txStatus").text("Eating a kitty. This may take a while...");
      return cryptoZombies.methods.feedOnKitty(zombieId, kittyId)
        .send({ from: userAccount })
        .on("receipt", function (receipt) {
          $("#txStatus").text("Ate a kitty and spawned a new Zombie!");
          getZombiesByOwner(userAccount).then(displayZombies);
        })
        .on("error", function (error) {
          $("#txStatus").text(error);
        });
    }

    function levelUp(zombieId) {
      $("#txStatus").text("Leveling up your zombie...");
      return cryptoZombies.methods.levelUp(zombieId)
        .send({ from: userAccount, value: web3.utils.toWei("0.001", "ether") })
        .on("receipt", function (receipt) {
          $("#txStatus").text("Power overwhelming! Zombie successfully leveled up");
        })
        .on("error", function (error) {
          $("#txStatus").text(error);
        });
    }

    function getZombieDetails(id) {
      return cryptoZombies.methods.zombies(id).call()
    }

    function zombieToOwner(id) {
      return cryptoZombies.methods.zombieToOwner(id).call()
    }

    function getZombiesByOwner(owner) {
      return cryptoZombies.methods.getZombiesByOwner(owner).call()
    }

    window.addEventListener('load', function () {


      if (typeof web3 !== 'undefined') {

        web3js = new Web3(web3.currentProvider);
      } else {


      }


      startApp()

    })