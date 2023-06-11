const axios = require('axios');
const cheerio = require('cheerio');
const { promises: { writeFile } } = require('fs');
const path = require('path');

const URL = /*process.env.parseURL*/ 'https://uakino.club/';


async function scrapeData() {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);
        const listMovie = $('div.swiper-slide');
        const movies = [];
        let iterationCount = 0;

        for (const movie of listMovie) {
            iterationCount++;
            const structuredData = {
                // poster: $(movie).find('img.animate.img').attr('src'),
                name: $(movie).find('a.movie-title').text().slice(3, -2),
                genre: $(movie).find('div.movie-genre1').text().slice(1),
                url: $(movie).find('a.movie-title').attr('href'),
            };
            console.log(structuredData);
            movies.push(structuredData);

            if(iterationCount === 20) {
                break;
            }
        }

        const convert = JSON.stringify(movies, null, 4)
        
        await writeFile('./data/NEWmovie.txt', convert);
        console.log(convert);

    } catch(err) {
        console.log(err);
    }
}
scrapeData();