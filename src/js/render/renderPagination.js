import Pagination from 'tui-pagination';
import { onPaginatorClick } from '../base/handlers';
import '../../sass/layout/_pagination.scss';

let pagination = null;

function renderPagination(pageAmount, currentPage = 1) {
  if (pageAmount === 0) {
    pagination = null;
    document.querySelector('#tui-pagination-container').innerHTML = '';
    return;
  }
  pagination = new Pagination('tui-pagination-container', {
    totalItems: pageAmount,
    itemsPerPage: 1,
    visiblePages: 5,
    page: currentPage,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      // currentPage: '<button class="tui-page-btn tui-is-selected">{{page}}</button>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  });

  pagination.on('afterMove', ({ page }) => onPaginatorClick(page));
}

export { renderPagination, pagination };
