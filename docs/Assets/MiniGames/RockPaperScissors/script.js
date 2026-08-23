document.addEventListener('DOMContentLoaded', () => {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const playerChoiceDisplay = document.getElementById('player-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const resultDisplay = document.getElementById('result-text');
    const winsDisplay = document.getElementById('wins');
    const lossesDisplay = document.getElementById('losses');
    const tiesDisplay = document.getElementById('ties');
    
    let wins = 0;
    let losses = 0;
    let ties = 0;
    
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const playerChoice = button.dataset.choice;
            const computerChoice = getComputerChoice();
            const result = determineWinner(playerChoice, computerChoice);
            
            playerChoiceDisplay.textContent = `Your choice: ${getEmoji(playerChoice)}`;
            computerChoiceDisplay.textContent = `Computer choice: ${getEmoji(computerChoice)}`;
            resultDisplay.textContent = result;
            
            updateScore(result);
        });
    });
    
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }
    
    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            ties++;
            return "It's a tie!";
        }
        
        if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            wins++;
            return 'You win!';
        } else {
            losses++;
            return 'You lose!';
        }
    }
    
    function updateScore(result) {
        winsDisplay.textContent = wins;
        lossesDisplay.textContent = losses;
        tiesDisplay.textContent = ties;
    }
    
    function getEmoji(choice) {
        switch (choice) {
            case 'rock': return '✊';
            case 'paper': return '✋';
            case 'scissors': return '✌️';
            default: return '';
        }
    }
});