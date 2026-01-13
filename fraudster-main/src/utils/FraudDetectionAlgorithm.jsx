/*
    This file will be used exclusively for the fraud detection algorithm.
    We will call on this code in other files when needed.
 */


/*
    Algorithm will set the score to 100 initially. If there is some deviation, the score
    will decrease by some number
 */
function calculateFraudScore(Transaction, Users) {
    let score = 100;

    // time of day calc (decrease by x)

    // new merchant

    // account age

    // add more when needed

    // keep score in range [0, 100]
    score = Math.max(0, Math.min(100, score));

    return score;
}