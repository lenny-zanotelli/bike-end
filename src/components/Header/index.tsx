import './styles.scss';
import bikeLogo from '../../assets/bike-logo.svg';

function Header() {
  return (
    <header className="header__container">
      <img className="header-logo hidden-logo" src={bikeLogo} alt="bike_logo" height="200px" width="200px" />
      <h1 className="header__container__title">BikeEnd</h1>
      <h2 className="tagline hidden">Le planificateur des week-ends qui font du bien à la tête et à la planète !</h2>
    </header>
  );
}

export default Header;
