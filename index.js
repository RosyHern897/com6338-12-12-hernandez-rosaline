const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    // ignore if we've already guessed this letter
    if (this.correctLetters.includes(letter) || this.incorrectLetters.includes(letter)) {
      return
    }

    if (this.word.includes(letter)) {
      // correct guess
      this.correctLetters.push(letter)

      // build a new displayWord revealing this letter
      let newDisplay = ""
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          newDisplay += letter
        } else {
          newDisplay += this.displayWord[i]
        }
      }
      this.displayWord = newDisplay
    } else {
      // incorrect guess
      this.remainingGuesses--
      this.incorrectLetters.push(letter)
    }
  }

  // implement the updateScreen function:
  updateScreen() {
    const wordToGuessEl = document.getElementById('word-to-guess')
    const remainingEl = document.getElementById('remaining-guesses')
    const incorrectEl = document.getElementById('incorrect-letters')

    wordToGuessEl.textContent = this.displayWord
    remainingEl.textContent = String(this.remainingGuesses)
    incorrectEl.textContent = this.incorrectLetters.join(', ')
  }

  // implement the isGameOver function:
  isGameOver() {
    const wordSolved = this.displayWord === this.word
    const outOfGuesses = this.remainingGuesses <= 0
    return wordSolved || outOfGuesses
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    // if game not over, no result yet
    if (!this.isGameOver()) {
      return null
    }

    const wordSolved = this.displayWord === this.word
    const hasGuesses = this.remainingGuesses > 0
    const noGuesses = this.remainingGuesses <= 0

    if (wordSolved && hasGuesses) {
      return 'win'
    }

    if (!wordSolved && noGuesses) {
      return 'loss'
    }

    // edge case not covered by tests
    return null
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()
