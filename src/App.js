import './App.css';
import Ridgeline from './components/Ridgeline'

function App() {
  return (
    <div className="App">
      <header>
    <div className="container">
      <a href="#" className="logo">NutriFusion</a>
      <nav>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Solutions</a></li>
          <li><a href="#">Impact</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <section className="hero">
      <div className="container">
        <h1>Empowering Sustainable Food Production</h1>
        <p>NutriFusion is a pioneering company developing cutting-edge solutions to optimize food production, enhance nutritional value, and minimize waste.</p>
        <button>Learn More</button>
      </div>
    </section>

    <section className="about">
      <div className="container">
        <h2>About NutriFusion</h2>
        <p>At NutriFusion, we are committed to revolutionizing the food industry through innovative technologies and sustainable practices. Our team of experts combines advanced data analytics, biotechnology, and environmental science to create solutions that address the challenges of modern food production.</p>
        <p>With a focus on nutrition, efficiency, and sustainability, we strive to make a positive impact on the world by ensuring access to healthy, high-quality food while minimizing the environmental footprint.</p>
      </div>
    </section>

    <section className="data-insights">
      <div className="container">
        <h2>Data-Driven Insights</h2>
        <p>We leverage advanced data analysis and machine learning algorithms to optimize every aspect of the food production process. Our intelligent systems monitor crop growth, predict yield, and provide actionable insights to improve efficiency and quality control.</p>
        <Ridgeline/>
      </div>
    </section>

    <section className="solutions">
      <div className="container">
        <h2>Our Solutions</h2>
        <div className="solution">
          <img src="precision-farming.jpg" alt="Precision Farming"/>
          <h3>Precision Farming</h3>
          <p>Our precision farming solutions utilize IoT sensors, satellite imagery, and data analytics to optimize crop management, reduce resource consumption, and maximize yield.</p>
        </div>
        <div className="solution">
          <img src="nutrient-enhancement.jpg" alt="Nutrient Enhancement"/>
          <h3>Nutrient Enhancement</h3>
          <p>Through advanced biotechnology and genetic engineering, we develop crops with enhanced nutritional profiles, providing healthier food options for consumers.</p>
        </div>
        <div className="solution">
          <img src="waste-reduction.jpg" alt="Waste Reduction"/>
          <h3>Waste Reduction</h3>
          <p>Our intelligent supply chain management and predictive analytics help minimize food waste throughout the production and distribution process, contributing to a more sustainable food system.</p>
        </div>
      </div>
    </section>

    <section className="call-to-action">
      <div className="container">
        <h2>Join the NutriFusion Revolution</h2>
        <p>Be a part of the future of food production. Become a partner, invest in our vision, or explore career opportunities with us.</p>
        <button>Get Involved</button>
      </div>
    </section>
  </main>

  <footer>
    <div className="container">
      <p>&copy; 2024 NutriFusion. All rights reserved.</p>
    </div>
  </footer>
    </div>
  
  );
}

export default App;
