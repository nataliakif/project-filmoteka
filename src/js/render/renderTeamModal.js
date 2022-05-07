import { teamModalMarkup } from '../templates/markupTeamModal';
import { refs } from '../references/refs';

function renderTeamModal() {
  refs.modalContent.innerHTML = teamModalMarkup;
}

export { renderTeamModal };
