import './sass/main.scss';
import './js/api/api-service';
import './js/base/spiner';
import './js/base/handlers.js';
import './js/base/state';
import './js/base/listeners';
import { updateInterface } from './js/base/update';
import './js/base/scrollToTop';
import './js/templates/footer-modal';
import './js/base/themePreference';
import { setDefaultTheme } from './js/base/themePreference';

updateInterface();

setDefaultTheme();



