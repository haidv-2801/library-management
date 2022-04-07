import React, { Suspense, useContext, useEffect, useRef } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Loading from './components/atomics/base/Loading/Loading';
import LoginPage from './components/pages/admin/LoginPage/LoginPage';
import NotFoundPage from './components/pages/admin/NotFoundPage/NotFoundPage';
import RegisterPage from './components/pages/admin/RegisterPage/RegisterPage';
import BookDetail from './components/pages/user/BookDetail/BookDetail';
import RequiredAuth from './components/sections/RequiredAuth/RequiredAuth';
import UserProfile from './components/pages/user/UserProfile/UserProfile';
import { Toast } from 'primereact/toast';
import { PATH_NAME } from './constants/commonConstant';
import { AuthContext } from './contexts/authContext';
import './main.scss';

const MenuPage = React.lazy(() =>
  import('./components/pages/admin/MenuPage/MenuPage')
);

const HtmlContentEditPage = React.lazy(() =>
  import('./components/pages/admin/HtmlContentEditPage/HtmlContentEditPage')
);

const PostPage = React.lazy(() =>
  import('./components/pages/admin/PostPage/PostPage')
);

const HtmlContentCreatingPage = React.lazy(() =>
  import(
    './components/pages/admin/HtmlContentCreatingPage/HtmlContentCreatingPage'
  )
);

const UserPage = React.lazy(() =>
  import('./components/pages/admin/UserPage/UserPage')
);

const Test = React.lazy(() => import('./components/pages/test/Test'));

const CommonListItemPage = React.lazy(() =>
  import('./components/pages/user/CommonListItemPage/CommonListItemPage')
);

const HomePage = React.lazy(() =>
  import('./components/pages/user/HomePageLib/HomePage')
);

const HtmlRenderPage = React.lazy(() =>
  import('./components/pages/user/HtmlRenderPage/HtmlRenderPage')
);

const BooksPage = React.lazy(() =>
  import('./components/pages/user/BooksPage/BooksPage.js')
);

const BooksPageSeeAll = React.lazy(() =>
  import('./components/pages/user/BooksPageSeeAll/BooksPageSeeAll')
);

function App() {
  const authCtx = useContext(AuthContext);
  const toast = useRef();

  useEffect(() => {
    document.title = 'Thư viện 365';
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
              <Route index element={<BooksPage />}></Route>
              <Route exact path=":slug">
                <Route exact index element={<BooksPageSeeAll />} />
                <Route exact path=":id" element={<BookDetail />} />
              </Route>
            </Route>
            <Route
              exact
              path={PATH_NAME.NEWS}
              element={<CommonListItemPage />}
            />
            <Route
              exact
              path={PATH_NAME.NOTIFICATION}
              element={<CommonListItemPage />}
            />
            {/* html page */}
            <Route exact path="html">
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
          </Route>
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
