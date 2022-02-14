import ControlRenderCards from './control_render_cards.js';
import Search from './search.js';

console.log(`Добрый день!
Из дополнительного функционала реалезован "Infinite Scrolling" и "Кнопка поиска со сменой положений и возвратом в верхнюю часть"`);

await ControlRenderCards.render();
new Search(ControlRenderCards.render, 'header');
