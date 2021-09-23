import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { actionInputHeader } from '../redux/actions';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../css/Header.css';

function Header({
  pageTitle,
  actionInpHeader,
  searchButton,
  searchFuncs: { setRadioSelecionado, verificaRadioFetch },
  inputHeader }) {
  const [toggleButtonSearch, setToggleButtonSearch] = useState(false);
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    actionInpHeader(searchInput);
  }, [actionInpHeader, searchInput]);

  const history = useHistory();

  function renderButton() {
    return (
      <button
        type="button"
        onClick={ () => setToggleButtonSearch((prevState) => !prevState) }
        data-testid="search-top-btn"
        src={ searchIcon }
      >
        <img alt="icone-search" src={ searchIcon } />
      </button>
    );
  }

  function displaySearchInput() {
    return (
      <div>
        <input
          onChange={ ({ target }) => setSearchInput(target.value) }
          data-testid="search-input"
          type="text"
        />
        <div>
          <label htmlFor="ingredient">
            Ingrediente
            <input
              type="radio"
              value="ingrediente"
              data-testid="ingredient-search-radio"
              onChange={ ({ target }) => setRadioSelecionado(target.value) }
              name="radio"
            />
          </label>
          <label htmlFor="name">
            Nome
            <input
              type="radio"
              value="nome"
              data-testid="name-search-radio"
              name="radio"
              onChange={ ({ target }) => setRadioSelecionado(target.value) }
            />
          </label>
          <label htmlFor="ingredient">
            Primeira letra
            <input
              type="radio"
              value="firstLetter"
              data-testid="first-letter-search-radio"
              onChange={ ({ target }) => setRadioSelecionado(target.value) }
              name="radio"
            />
          </label>
          <button
            type="button"
            onClick={ () => verificaRadioFetch(inputHeader.inputHeader) }
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className="app-header">
      <div className="header-Items-container">
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ profileIcon }
          onClick={ () => history.push('/perfil') }
        >
          <img alt="icone-profile" src={ profileIcon } />
        </button>

        <h3 data-testid="page-title">{pageTitle}</h3>

        <div>
          {searchButton && renderButton()}
        </div>
      </div>

      {toggleButtonSearch && displaySearchInput()}
    </header>
  );
}

Header.defaultProps = {
  searchButton: true,
  searchFuncs: { setRadioSelecionado: () => {}, verificaRadioFetch: () => {} },
};

Header.propTypes = {
  actionInpHeader: PropTypes.func.isRequired,
  pageTitle: PropTypes.string.isRequired,
  searchButton: PropTypes.bool,
  inputHeader: PropTypes.shape({
    inputHeader: PropTypes.string,
  }).isRequired,
  searchFuncs: PropTypes.shape({
    setRadioSelecionado: PropTypes.func,
    verificaRadioFetch: PropTypes.func,
  }),
};

const mapStateToProps = (state) => ({
  inputHeader: state.reducerHeader,
});

const mapDispatchToProps = (dispatch) => ({
  actionInpHeader: (input) => dispatch(actionInputHeader(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
