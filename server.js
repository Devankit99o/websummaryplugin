const express = require('express');
const cors = require('cors');
const natural = require('natural');
const summarizeWebsite = require('./backend/summerise'); // Import the summarizeWebsite module



const tokenizer = new natural.WordTokenizer();

const app = express();

app.use(cors());
app.use(express.json());

const tagsToExtract = ['p','h1','h2','h3','h3','h4','span']; 
app.post('/msg', async(req, res) => {
    const url=req.body.url;
    console.log(url);
    summarizeWebsite(url,tagsToExtract)
  .then((websiteSummary) => {

    // Use the raw  content from the website
    const text = websiteSummary;

// Preprocess the text
const tokens = tokenizer.tokenize(text);
const wordFrequencies = {};

// Count word frequencies
for (const token of tokens) {
    const word = token.toLowerCase();
    if (word in wordFrequencies) {
        wordFrequencies[word]++;
    } else {
        wordFrequencies[word] = 1;
    }
}

// Find the maximum frequency
let maxFrequency = 0;
for (const frequency of Object.values(wordFrequencies)) {
    if (frequency > maxFrequency) {
        maxFrequency = frequency;
    }
}

// Normalize the word frequencies
for (const word in wordFrequencies) {
    wordFrequencies[word] /= maxFrequency;
}

// Calculate sentence scores using a simplified algorithm
const sentences = text.split('. '); // Split into sentences
const sentenceScores = {};
for (const sentence of sentences) {
    const wordsInSentence = tokenizer.tokenize(sentence);
    let score = 0;
    for (const word of wordsInSentence) {
        const freq = wordFrequencies[word.toLowerCase()];
        if (freq) {
            score += freq;
        }
    }
    sentenceScores[sentence] = score;
}

// summerise the content
const summarySentences = Object.keys(sentenceScores).sort((a, b) => sentenceScores[b] - sentenceScores[a]).slice(0,3);

// Print the summary
const summary = summarySentences.join('. ');
console.log('Text Summary:');

res.send(summary)
console.log(summary);

})
.catch((error) => {
    console.error('Error:', error);
  });

});




app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });