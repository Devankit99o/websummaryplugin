const axios = require('axios');
const cheerio = require('cheerio');

async function summarizeWebsite(url, tagsToExtract) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    let webscrap = '';
 
    tagsToExtract.forEach(tag => {
      const elements = $(tag);
      elements.each((index, element) => {
        webscrap += $(element).text() + ' ';
      });
    });

    webscrap =webscrap.trim();
    console.log("the webpage scrap content")
    console.log(webscrap)
    return webscrap;
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = summarizeWebsite;
