import ControlRenderCards from './control_render_cards.js';
import Search from './search.js';

await ControlRenderCards.render();
new Search(ControlRenderCards.render, 'header');
