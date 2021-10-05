// DOM API를 이용
const container = document.getElementById('root');
// AJAX(Asynchronous Javascript And Xml) code
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store = {
  currentPage: 1,
};

function getData(url) {
  // boolean 타입의 false 값은 동기적으로 처리하겠다는 의미
  ajax.open('GET', url, false);
  ajax.send();

  // 응답받은 JSON 값을 객체화
  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];

  newsList.push('<ul>');

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
    <li>
      <a href="#/show/${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
  `);
  }

  newsList.push('</ul>');
  newsList.push(`
    <div>
      <a href="#/page/${
        store.currentPage > 1 ? store.currentPage - 1 : 1
      }">이전 페이지</a>
      <a href="#/page/${
        store.currentPage < 3 ? store.currentPage + 1 : 3
      }">다음 페이지</a>
    </div>
  `);
  container.innerHTML = newsList.join('');
}

function newsDetail() {
  const id = location.hash.substr(7);
  const newsContent = getData(CONTENT_URL.replace('@id', id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>
  
    <div>
      <a href="#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
}

// hashchange를 사용하기 위해서는 a.href의 값 맨 앞에 #가 있어야 한다
window.addEventListener('hashchange', router);

/* 
  반복되거나 중복되는 코드는 개선하자(리팩토링 중요)
*/

function router() {
  const routePath = location.hash;

  // location.hash에 #만 들어왔을 경우 빈 문자열로 인식한다
  if (routePath === '') {
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail();
  }
}

router();
