import React from 'react';
import pageNotFoundImage from '../../assets/404.png';

const NotFoundPage = () => (
  <div className="d-flex flex-column h-100 ">
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        <button type="button" className="btn btn-primary">Выйти</button>
      </div>
    </nav>
    <div className="text-center">
      <img src={pageNotFoundImage} className="img-fluid" alt="Страница не найдена" />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти&nbsp;
        <a href="/">на главную страницу</a>
      </p>
    </div>
  </div>
);

export default NotFoundPage;
