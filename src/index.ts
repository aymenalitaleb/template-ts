import './index.css';
import { Watch } from './example-unit';

let timeWatch: Watch | null = null;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded.");
    if (!timeWatch) {
        console.log("Creating new Watch instance...");
        timeWatch = new Watch();
        timeWatch.start();
    }
});
