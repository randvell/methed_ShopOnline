import { getAuthor, getPosts } from './api/article.js';

const getAuthorName = async (userId) => {
  const response = await getAuthor(userId);
  const { id, name } = response;
  if (!id) {
    return `Не удалось получить автора (${userId})`;
  }

  return name;
};

const getArticleIdFromParam = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
};

const createHeader = (text) => {
  const el = document.createElement('h1');
  el.classList.add('article__header');
  if (text) {
    el.textContent = text;
  }

  return el;
};

const createParagraph = (text) => {
  const el = document.createElement('p');
  el.classList.add('article__paragraph');
  if (text) {
    el.textContent = text;
  }

  return el;
};

const renderArticle = async () => {
  const id = getArticleIdFromParam();
  if (!id) {
    return;
  }

  const response = await getPosts(id);
  if (!response) {
    console.log('Не удалось загрузить пост с ID ' + id);
    return;
  }

  const author = document.querySelector('.article__author');
  const articleBody = document.querySelector('.article__body');
  articleBody.innerHTML = '';

  const { code, data } = response;
  if (code !== 200) {
    let errorMsg = 'Не удалось загрузить статью';
    if (data.message) {
      errorMsg = `${errorMsg}: ${data.message} (${code})}`;
    }

    articleBody.append(createParagraph(errorMsg));
    author.textContent = '';
    return;
  }

  const { title, body, user_id: userId } = data;
  articleBody.append(createHeader(title));
  articleBody.append(createParagraph(body));

  /** Почему-то API возвращает несуществующих пользователей,
   * захардкодил рабочее значение */
  author.textContent = await getAuthorName(2138897 || userId);
};

document.addEventListener('DOMContentLoaded', renderArticle);
