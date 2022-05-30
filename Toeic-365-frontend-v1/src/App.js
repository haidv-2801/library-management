import React, { Suspense, useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import baseApi from './api/baseApi';
import Loading from './components/atomics/base/Loading/Loading';
import BookLendingPage from './components/pages/admin/BookLendingPage/BookLendingPage';
import BookPage from './components/pages/admin/BookPage/BookPage';
import HtmlContentCreatingPage from './components/pages/admin/HtmlContentCreatingPage/HtmlContentCreatingPage';
import HtmlContentEditPage from './components/pages/admin/HtmlContentEditPage/HtmlContentEditPage';
import LoginPage from './components/pages/admin/LoginPage/LoginPage';
import MenuPage from './components/pages/admin/MenuPage/MenuPage';
import NotFoundPage from './components/pages/admin/NotFoundPage/NotFoundPage';
import PostPage from './components/pages/admin/PostPage/PostPage';
import ReaderPage from './components/pages/admin/ReaderPage/ReaderPage';
import RegisterPage from './components/pages/admin/RegisterPage/RegisterPage';
import DashBoardPage from './components/pages/admin/DashBoardPage/DashBoardPage';
import UserPage from './components/pages/admin/UserPage/UserPage';
import Test from './components/pages/test/Test';
import BookDetail from './components/pages/user/BookDetail/BookDetail';
import BooksPage from './components/pages/user/BooksPage/BooksPage';
import BooksPageSeeAll from './components/pages/user/BooksPageSeeAll/BooksPageSeeAll';
import SearchPage from './components/pages/user/SearchPage/SearchPage';
import UserProfile from './components/pages/user/UserProfile/UserProfile';
import RequiredAuth from './components/sections/RequiredAuth/RequiredAuth';
import {
  FIXED_MENU_ID,
  MAXIMUM_PAGESIZE,
  OPERATOR,
  PATH_NAME,
  UTC_WEB_TITLE,
} from './constants/commonConstant';
import END_POINT from './constants/endpoint';
import { AuthContext } from './contexts/authContext';
import { appAction } from './redux/slices/appSlice';
import './constants/extension';
import './main.scss';
import SafeAddressPage from './components/pages/admin/SafeAddressPage/SafeAddressPage';
import responsiveObserve from 'antd/lib/_util/responsiveObserve';
import BooksPageSeeAllPrivate from './components/pages/user/BooksPageSeeAllPrivate/BooksPageSeeAllPrivate';

// const MenuPage = React.lazy(() =>
//   import('./components/pages/admin/MenuPage/MenuPage')
// );

// const HtmlContentEditPage = React.lazy(() =>
//   import('./components/pages/admin/HtmlContentEditPage/HtmlContentEditPage')
// );

// const PostPage = React.lazy(() =>
//   import('./components/pages/admin/PostPage/PostPage')
// );

// const HtmlContentCreatingPage = React.lazy(() =>
//   import(
//     './components/pages/admin/HtmlContentCreatingPage/HtmlContentCreatingPage'
//   )
// );

// const UserPage = React.lazy(() =>
//   import('./components/pages/admin/UserPage/UserPage')
// );

// const Test = React.lazy(() => import('./components/pages/test/Test'));

const CommonListItemPage = React.lazy(() =>
  import('./components/pages/user/CommonListItemPage/CommonListItemPage')
);

const HomePage = React.lazy(() =>
  import('./components/pages/user/HomePageLib/HomePage')
);

const HtmlRenderPage = React.lazy(() =>
  import('./components/pages/user/HtmlRenderPage/HtmlRenderPage')
);

// const BooksPage = React.lazy(() =>
//   import('./components/pages/user/BooksPage/BooksPage.js')
// );

// const BooksPageSeeAll = React.lazy(() =>
//   import('./components/pages/user/BooksPageSeeAll/BooksPageSeeAll')
// );

function App() {
  const authCtx = useContext(AuthContext);
  const toast = useRef();
  const dispatch = useDispatch();
  const selector = useSelector((store) => store.app);

  useEffect(() => {
    document.title = UTC_WEB_TITLE.toUpperCase();
    checkAllowedAccessPrivateDocuments();
  }, []);

  const getMenus = (hasPrivateMenu = false) => {
    let _filter = [
      ['IsDeleted', OPERATOR.EQUAL, '0'],
      OPERATOR.AND,
      ['Status', OPERATOR.EQUAL, '1'],
      OPERATOR.AND,
      ['IsShowHome', OPERATOR.EQUAL, '1'],
    ];

    if (hasPrivateMenu) {
    } else {
      _filter.push(OPERATOR.AND, ['IsPrivate', OPERATOR.EQUAL, '0']);
    }

    baseApi.post(
      (res) => {
        res = res.data.pageData.sort((a, b) => a.displayOrder - b.displayOrder);
        dispatch(appAction.changeDataMenus([...res]));
      },
      (err) => {},
      () => {},
      END_POINT.TOE_GET_MENUS_FILTER,
      {
        filter: btoa(JSON.stringify(_filter)),
        pageIndex: 1,
        pageSize: MAXIMUM_PAGESIZE,
      },
      null
    );
  };

  const checkAllowedAccessPrivateDocuments = () => {
    baseApi.get(
      (res) => {
        res = res?.status ? res.data : res;
        getMenus(res);
        dispatch(appAction.changeInPrivateAddresss(res));
      },
      (err) => {},
      () => {},
      END_POINT.TOE_SAFE_ADDRESS_ALLOWED_ACCESS,
      null,
      null
    );
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading show />}>
        <Routes>
          <Route exact path="/">
            <Route index element={<HomePage />} />

            <Route
              exact
              path={PATH_NAME.PRIVATE_DOCUMENTS}
              element={
                selector.isInPrivateAddress ? (
                  <BooksPageSeeAllPrivate titlePage="Tài liệu nội bộ" />
                ) : (
                  <NotFoundPage />
                )
              }
            ></Route>
            <Route
              exact
              path={PATH_NAME.PRIVATE_DOCUMENTS + '/:id'}
              element={<BookDetail />}
            />

            <Route exact path={PATH_NAME.HOME} element={<HomePage />} />
            <Route exact path={PATH_NAME.LOGIN} element={<LoginPage />} />
            <Route exact path={PATH_NAME.REGISTER} element={<RegisterPage />} />
            <Route exact path={PATH_NAME.USER} element={<UserProfile />} />
            <Route exact path={PATH_NAME.BORROWING_RETURNING_BOOK}>
              <Route exact path="sach">
                <Route index element={<BooksPage />} />
                <Route exact path=":slug">
                  <Route index element={<BooksPageSeeAll />} />
                  <Route exact path=":id" element={<BookDetail />} />
                </Route>
              </Route>
            </Route>
            <Route
              exact
              path={PATH_NAME.NEWS}
              element={
                <CommonListItemPage
                  titlePage="Tin tức"
                  menuID={FIXED_MENU_ID.NEWS}
                />
              }
            />
            <Route
              exact
              path={PATH_NAME.NOTIFICATION}
              element={
                <CommonListItemPage
                  titlePage="Thông báo"
                  menuID={FIXED_MENU_ID.NOTIFICATION}
                />
              }
            />
            <Route
              exact
              path={PATH_NAME.NEW_BOOKS_INTRODUCTION}
              element={
                <CommonListItemPage
                  titlePage="Giới thiệu sách mới"
                  menuID={FIXED_MENU_ID.NEW_BOOKS_INTRODUCTION}
                />
              }
            />
            {/* html page */}
            <Route exact path=":menuType">
              <Route index path=":slug" element={<HtmlRenderPage />} />
            </Route>
            <Route path="test" element={<Test />} />
          </Route>

          <Route path={PATH_NAME.ADMIN}>
            <Route
              index
              element={
                <RequiredAuth>
                  <UserPage />
                </RequiredAuth>
              }
            />
            <Route exact path="systems">
              <Route
                index
                exact
                path="user"
                element={
                  <RequiredAuth>
                    <UserPage />
                  </RequiredAuth>
                }
              />
              <Route
                exact
                path="role"
                element={
                  <RequiredAuth>
                    <UserPage />
                  </RequiredAuth>
                }
              />
              <Route
                exact
                path="permission"
                element={
                  <RequiredAuth>
                    <UserPage />
                  </RequiredAuth>
                }
              />
              <Route
                exact
                path="menu"
                element={
                  <RequiredAuth>
                    <MenuPage />
                  </RequiredAuth>
                }
              />
              <Route
                exact
                path="safe-address"
                element={
                  <RequiredAuth>
                    <SafeAddressPage />
                  </RequiredAuth>
                }
              />
            </Route>

            <Route
              path="dashboard"
              element={
                <RequiredAuth>
                  <DashBoardPage />
                </RequiredAuth>
              }
            />

            <Route exact path={'tin-tuc'}>
              <Route path="post">
                <Route
                  exact
                  path="new"
                  element={
                    <RequiredAuth>
                      <HtmlContentCreatingPage />
                    </RequiredAuth>
                  }
                />
                <Route
                  exact
                  path=":postId"
                  element={
                    <RequiredAuth>
                      <HtmlContentEditPage />
                    </RequiredAuth>
                  }
                />
                <Route
                  index
                  element={
                    <RequiredAuth>
                      <PostPage />
                    </RequiredAuth>
                  }
                />
              </Route>
            </Route>

            <Route exact path={'danh-muc'}>
              <Route
                exact
                path="ban-doc"
                element={
                  <RequiredAuth>
                    <ReaderPage />
                  </RequiredAuth>
                }
              />
              <Route
                exact
                path="sach"
                element={
                  <RequiredAuth>
                    <BookPage />
                  </RequiredAuth>
                }
              />
              <Route
                exact
                path="muon-tra"
                element={
                  <RequiredAuth>
                    <BookLendingPage />
                  </RequiredAuth>
                }
              />
            </Route>
          </Route>
          <Route path={PATH_NAME.SEARCH} element={<SearchPage />} />
          <Route
            path="/:postType/:postSlug/:postID"
            element={<HtmlRenderPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
