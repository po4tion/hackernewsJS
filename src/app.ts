import Router from './core/router';
import { NewsDetailView, NewsFeedView } from './page';
import { Store } from './store';

const store = new Store();

const router: Router = new Router();
const newsFeedView = new NewsFeedView('root', store);
const newsDetailView = new NewsDetailView('root', store);

router.setDefaultPage(newsFeedView);

router.addRoutePath('/page/', newsFeedView, /page\/(\d+)/);
router.addRoutePath('/show/', newsDetailView, /show\/(\d+)/);

router.go();
/* 
  반복되거나 중복되는 코드는 개선하자(리팩토링 중요)
  복잡도가 높은 코드는 지양하자
*/
