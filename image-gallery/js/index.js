import Cards from './cards.js';
import Search from './search.js';

const cards = new Cards();
await cards.getCards();

new Search(cards.getCards.bind(cards));
