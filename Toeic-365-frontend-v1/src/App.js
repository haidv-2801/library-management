import React, { Suspense, useContext, useEffect, useRef } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Loading from './components/atomics/base/Loading/Loading';
import LoginPage from './components/pages/admin/LoginPage/LoginPage';
import NotFoundPage from './components/pages/admin/NotFoundPage/NotFoundPage';
import RegisterPage from './components/pages/admin/RegisterPage/RegisterPage';
import BookDetail from './components/pages/user/BookDetail/BookDetail';
import RequiredAuth from './components/sections/RequiredAuth/RequiredAuth';
import UserProfile from './components/pages/user/UserProfile/UserProfile';
import {
  FIXED_MENU_ID,
  PATH_NAME,
  UTC_WEB_TITLE,
} from './constants/commonConstant';
import { AuthContext } from './contexts/authContext';
import HtmlContentEditPage from './components/pages/admin/HtmlContentEditPage/HtmlContentEditPage';
import HtmlContentCreatingPage from './components/pages/admin/HtmlContentCreatingPage/HtmlContentCreatingPage';
import PostPage from './components/pages/admin/PostPage/PostPage';
import UserPage from './components/pages/admin/UserPage/UserPage';
import MenuPage from './components/pages/admin/MenuPage/MenuPage';
import SearchPage from './components/pages/user/SearchPage/SearchPage';
import ReaderPage from './components/pages/admin/ReaderPage/ReaderPage';
import BookPage from './components/pages/admin/BookPage/BookPage';
import BooksPageSeeAll from './components/pages/user/BooksPageSeeAll/BooksPageSeeAll';
import BooksPage from './components/pages/user/BooksPage/BooksPage';
import BookLendingPage from './components/pages/admin/BookLendingPage/BookLendingPage';
import Test from './components/pages/test/Test';
import './main.scss';

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

  useEffect(() => {
    document.title = UTC_WEB_TITLE.toUpperCase();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading show />}>
        <Routes>
          <Route exact path="/">
            <Route index element={<HomePage />} />
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
            </Route>

            <Route
              path="dashboard"
              element={
                <RequiredAuth>
                  <UserPage />
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
