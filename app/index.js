/* YouTube Chapters */
import { YouTubeChapters as YTC } from './youtube-chapters';

/* Stylesheets */
import './styles/main.scss';

/**
 * Add YTC to window
 * @private
 */
window.YTC = YTC.setup;

/**
 * Export as YTC for shorter code.
 * @private
 */
export default YTC.setup;
