const getCurrentPage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return +(urlParams.get('page') || 1);
};

const getPageNumbers = (page) =>
  page === 1 ? [1, 2, 3] : [page - 1, page, page + 1];

const createPaginationElement = (page) => {
  const li = document.createElement('li');
  li.classList.add('pagination__item');

  const isCurrent = getCurrentPage() === page;
  if (isCurrent) {
    li.classList.add('pagination__item--active');
  }

  const link = document.createElement('a');
  link.classList.add('pagination__button');
  link.textContent = page;
  if (!isCurrent) {
    let href = '/blog.html';
    if (page !== 1) {
      href += '?page=' + page;
    }

    link.href = href;
  }

  li.append(link);

  return li;
};

let pagination;
const renderPagination = () => {
  if (!pagination) {
    pagination = document.querySelector('.pagination__items');
  }

  pagination.innerHTML = '';

  getPageNumbers(getCurrentPage()).forEach((page) => {
    pagination.append(createPaginationElement(page));
  });
};

document.addEventListener('DOMContentLoaded', renderPagination);
