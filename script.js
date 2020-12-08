const wordArray = ["geography", "cat", "yesterday", "java", "truck", "opportunity",
"fish", "token", "transportation", "bottom", "apple", "cake",
"remote", "boots", "terminology", "arm", "cranberry", "tool",
"caterpillar", "spoon", "watermelon", "laptop", "toe", "toad",
"fundamental", "capitol", "garbage", "anticipate", "pesky"]
// game word handling
let gameWord
let gameGuess
let displayGuess = document.querySelector('.guess')
displayGuess.innerText = gameGuess
let chances = document.getElementById('chances')

//board handling
function drawBoard () {
  //new game Word and Chance
  gameWord = wordArray[(Math.floor((Math.random() * wordArray.length)))]
  gameGuess = gameWord.replace(/\w/g, '_')
  displayGuess.innerText = gameGuess
  chances.innerText = '6'

  //new characters selections
  let chars = document.querySelector(".chars")
  chars.innerHTML = ""
  for (let i = 65; i < 91; i++) {
      chars.innerHTML += `<div class="keys" id=
      "${String.fromCharCode(i+32)}">${String.fromCharCode(i)}</div>`
  }
  let keys = document.querySelectorAll(".keys")


  keys.forEach(key => {
      key.addEventListener("click" , (e)=> {
          key.classList.add("excluded")
          takeGuess(gameWord, gameGuess, key.id)
      })
  })
  
}
drawBoard()

document.addEventListener("keydown", (e)=> {
  let key = document.getElementById(`${e.key}`)
  key.classList.add("excluded")
  takeGuess(gameWord, gameGuess, e.key)
})


// change guess
function takeGuess(word, guess, char) {
    let newGuess = ""
    for (let i = 0 ; i < word.length; i ++) {
      if (word[i] === char) {
        newGuess += char
      } else if (guess[i] === '_'){
        newGuess += '_'
      } else {
        newGuess += guess[i]
      }
    }
    gameGuess = newGuess
    displayGuess.innerText = gameGuess
    if (!gameWord.includes(char) && chances.innerText>0) {
      chances.innerText--;
      
    }
    if (!gameGuess.includes('_') && !chances.innerText.includes('Win') && !chances.innerText.includes('Lose')) {
      chances.innerText += '\n You Win!'
    }
    if (chances.innerText === '0') {
          chances.innerText += '\n You Lose!'
    }
    
}
// button
let newButton = document.getElementById('new-game')
newButton.addEventListener('click', ()=> {
  drawBoard()
})