const axios = require('axios');
const cheerio = require('cheerio');
const { promises: { writeFile } } = require('fs');

const URL = "https://uakino.club/top100imdb.html"

async function scrapeData() {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);
        const listMovie = $('div.rel-col');
        const movies = [];
    
        for (const movie of listMovie) {
            const structuredData = {
                name: $(movie).children('a.rel-title').text().slice(3),
                rating: $(movie).children('div.related-rate').text().slice(3),
            };
            movies.push(structuredData);
        }
        
        const convert = JSON.stringify(movies, null, 4)

        await writeFile('./data/movie.txt', convert);
        console.log(convert);

    } catch(err) {
        console.log(err);
    }
}
scrapeData();