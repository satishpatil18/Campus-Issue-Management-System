import "./Hero.css";
import heroImage from "../assets/hero.svg";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>Report Campus Issues with Ease</h1>

        <p>
          A modern platform that helps students report campus
          issues and enables administrators to resolve them
          efficiently.
        </p>

        <div className="hero-buttons">

          <button>Get Started</button>

          <button className="secondary-btn">
            Login
          </button>

        </div>

      </div>

      <div className="hero-image">

        <img src={heroImage} alt="Student using laptop" />

      </div>

    </section>
  );
}

export default Hero;