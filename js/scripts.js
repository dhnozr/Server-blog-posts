'use strict';

/*!
 * Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
 */
window.addEventListener('DOMContentLoaded', () => {
  let scrollPos = 0;
  const mainNav = document.getElementById('mainNav');
  const headerHeight = mainNav.clientHeight;
  window.addEventListener('scroll', function () {
    const currentTop = document.body.getBoundingClientRect().top * -1;
    if (currentTop < scrollPos) {
      // Scrolling Up
      if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
        mainNav.classList.add('is-visible');
      } else {
        console.log(123);
        mainNav.classList.remove('is-visible', 'is-fixed');
      }
    } else {
      // Scrolling Down
      mainNav.classList.remove(['is-visible']);
      if (
        currentTop > headerHeight &&
        !mainNav.classList.contains('is-fixed')
      ) {
        mainNav.classList.add('is-fixed');
      }
    }
    scrollPos = currentTop;
  });
});

const postRequest = 'http://localhost:1337/api/posts/';
const postImgUrl = 'http://localhost:1337/api/posts?populate=hero';

const postContainer = document.querySelector('.posts');

window.addEventListener('hashchange', changeRoute);

function changeRoute() {
  const pageUrl = location.hash.substring(2);
  loadPageUrl(pageUrl);
  console.log(pageUrl);
}

async function loadPageUrl(url) {
  postContainer.innerHTML = 'Loading';

  if (url === '') {
    loadHomePage();
  } else {
    loadSubPage(postRequest + url);
  }
}

async function loadSubPage(url) {
  const post = await fetch(url).then(r => r.json());
  const postImg = await fetch(postImgUrl).then(r => r.json());

  const imgUrl =
    `http://localhost:1337` +
    postImg.data[0].attributes.hero.data.attributes.url;

  postContainer.innerHTML = `
  <div class="post-preview">
            <a href="#">
              <h2 class="post-title">
                ${post.data.attributes.title}
              </h2>
            </a>
            <h3 class="post-subtitle">
            ${post.data.attributes.summary}
          </h3>
          <div>
          ${post.data.attributes.content}
          </div>
          <div>
           <img src="${imgUrl}" alt="" width="100%">

          </div>
            <p class="post-meta">
              Posted by
              <a href="#!">Start Bootstrap</a>
              on September 24, 2023
            </p>
          </div>
  `;
}

async function loadHomePage() {
  const posts = await fetch(postRequest).then(r => r.json());

  postContainer.innerHTML = '';

  for (const post of posts.data) {
    console.log(post);
    postContainer.innerHTML += `
    <div class="post-preview">
              <a href="#/${post.id}">
                <h2 class="post-title">
                  ${post.attributes.title}
                </h2>
              </a>
              <h3 class="post-subtitle">
              ${post.attributes.summary}
            </h3>
              <p class="post-meta">
                Posted by
                <a href="#!">Start Bootstrap</a>
                on September 24, 2023
              </p>
            </div>
    `;
  }
}

changeRoute();
