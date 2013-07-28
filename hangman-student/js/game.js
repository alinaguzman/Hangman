var word = {
  secretWord: "",
  secretWordWithBlanks: "",
  wordList: ['ruby', 'rails', 'javascript', 'array', 'hash', 'underscore', 'sinatra', 'model', 'controller', 'view', 'devise', 'authentication', 'capybara', 'jasmine', 'cache', 'sublime', 'terminal', 'system', 'twitter', 'facebook', 'function', 'google', 'amazon', 'development', 'data', 'design', 'inheritance', 'prototype', 'gist', 'github', 'agile', 'fizzbuzz', 'route', 'gem', 'deployment', 'database'],
  // Selects a random word from the word list sets the secret word
  setSecretWord: function(){
      this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
      this.secretWordWithBlanks = this.secretWord.replace(/\w/g,"_");
  },
  // Takes an array of letters as input and returns an array of two items:
  // 1) A string with the parts of the secret word that have been guessed correctly and underscore for the parts that haven't
  // 2) An array of all the guessed letters that were not in the secret word
  checkLetters: function(guessedLetter){
      var correctLetters = _.intersection(this.secretWord, guessedLetter);
      var wrongLetters = _.difference(guessedLetter,correctLetters);

      for (var i = 0; i < this.secretWord.length; i++){
         var temp = this.secretWordWithBlanks.split("");
          if (this.secretWord[i] === guessedLetter) {
              temp[i] = guessedLetter;
              this.secretWordWithBlanks = temp.join("");
          }
  }
      return [this.secretWordWithBlanks, wrongLetters];
  }
};

var player = {
  MAX_GUESSES: 8,
  guessedLetters: [],
  // Takes a new letter as input and updates the game
  makeGuess: function(letter){
      if (this.guessedLetters.length < this.MAX_GUESSES){
         word.checkLetters(letter);
         if (_.contains(player.guessedLetters, letter)){
             console.log("Already guessed letter, try again")
         } else {
             this.guessedLetters.push(letter);
             document.getElementById("guessedLetters").innerText = this.guessedLetters;
             document.getElementById("wordString").innerText = word.secretWordWithBlanks;
             document.getElementById("guessesLeft").innerText = parseInt(this.MAX_GUESSES - this.guessedLetters.length);
         }
      }
  },

  // Check if the player has won and end the game if so
  checkWin: function(wordString){
      if (_.isEqual(word.secretWord,word.secretWordWithBlanks)){
          console.log("You win")
      }
  },

  // Check if the player has lost and end the game if so
  checkLose: function(wrongLetters){
      if (this.guessedLetters.length == this.MAX_GUESSES){
          console.log("You lose, max 8 guessed")
      }
  }
};

var game = {
  // Resets the game
  resetGame: function(){},

  // Reveals the answer to the secret word and ends the game
  giveUp: function(){},

  // Update the display with the parts of the secret word guessed, the letters guessed, and the guesses remaining
  updateDisplay: function(secretWordWithBlanks, guessedLetters, guessesLeft){}
};

window.onload = function(){
    word.setSecretWord();

  // Start a new game
  // Add event listener to the letter input field to grab letters that are guessed
  // Add event listener to the reset button to reset the game when clicked
  // Add event listener to the give up button to give up when clicked
    var letter = document.getElementById("letterField");
    letter.onkeyup = function(event){
       var key = this.value;
       player.makeGuess(key);
    }
};