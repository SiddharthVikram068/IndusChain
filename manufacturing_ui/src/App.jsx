import { useState } from 'react'
import './styles.css'
// import 'swiper/swiper-bundle.min.css'
import faq from './assets/faq.jpg'
import media1 from './assets/media-1.jpg'
import media2 from './assets/media-2.jpg'
import media3 from './assets/media-3.jpg'
import media4 from './assets/media-4.jpg'
import media5 from './assets/media-5.jpg'
import media6 from './assets/media-6.jpg'
import FooterSocials from './FooterSocials'

function App() {
  const [count, setCount] = useState(0)

return (
    <>
        <div>
        <header className="header">
            <nav>
                <div className="nav__header">
                    <div className="nav__logo">
                        <a href="#">Indu<span>sCh</span>ain</a>
                    </div>
                    <div className="nav__menu__btn" id="menu-btn">
                        <span><i className="ri-menu-line"></i></span>
                    </div>
                </div>
                <ul className="nav__links" id="nav-links">
                    <li><a href="/login">Login</a></li>
                    <li><a href="/signup">Signup</a></li>
                    <li><a href="#Home">Home</a></li>
                    <li><a href="#About">About</a></li>
                    <li><a href="#Resources">Resources</a></li>
                    <li><a href="#Updates">Updates</a></li>
                    <li><a href="#Contact">Contact</a></li>

                    <li><a href="/machinefailure">Machine Failures</a></li>

                </ul>
            </nav>
            <div className="section__container header__container" id="Home">
                <p>TOGETHER</p>
                <h1>Making Industrial Service Smarter</h1>
                <div className="header__flex">
                    <div className="header__card">
                        <span><i className="ri-store-2-fill"></i></span>
                        <div>
                            <h5>Consectetur</h5>
                            <h4>Production</h4>
                        </div>
                    </div>
                    <div className="header__card">
                        <span><i className="ri-building-fill"></i></span>
                        <div>
                            <h5>Consectetur</h5>
                            <h4>Industrial</h4>
                        </div>
                    </div>
                    <div className="header__card">
                        <span><i className="ri-stackshare-line"></i></span>
                        <div>
                            <h5>Consectetur</h5>
                            <h4>Construction</h4>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section className="section__container about__container" id="About">
            <div className="about__header">
                <div>
                    <h3 className="section__subheader">About Us</h3>
                    <h2 className="section__header">
                        The Smarter Industrial Business that can think
                    </h2>
                </div>
                <p className="section__description">
                    With a relentless commitment to quality, efficiency, and innovation
                    ,we pride ourselves on our hands-on approach to
                    industrial solutions. Discover the difference where expertise meets a
                    tangible touch of creativity and a rigor for problem solving.
                </p>
            </div>
            <div className="about__grid">
                <div className="about__card">
                    <p>FITTING</p>
                    <h4>Fit your factory with IndusChain today</h4>
                </div>
                <div className="about__card">
                    <p>PLANNER</p>
                    <h4>Plan out your manifacturing plant with IIoT</h4>
                </div>
                <div className="about__card">
                    <p>QUALITY</p>
                    <h4>We stand slow in quality</h4>
                </div>
            </div>
        </section>

        <section className="section__container faq__container" id="Resources">
            <div className="faq__image">
                <img src={faq} alt="faq" />
            </div>
            <div className="faq__content">
                <h3 className="section__subheader">Common Resources</h3>
                <h2 className="section__header">Documentation and queries</h2>
                <p className="section__description">
                    IndusChain offers a comprehensive documentation on how to use the Services
                    and answer your queries about how to utilise it at it's full potential.
                    There is also a developer portal available for small scale projects and
                    how to use IndusChain at an individual level.
                </p>
                <div className="faq__grid">
                    <div className="faq__card" style={{ border: '2px solid orange' }}>
                        <div className="faq__header">
                            <h4>Documentation and ESG report </h4>
                            <span><i className="ri-arrow-down-s-line"></i></span>
                        </div>
                    </div>
                    <div className="faq__card" style={{ border: '2px solid orange' }}>
                        <div className="faq__header">
                            <h4>Frequently asked questions</h4>
                            <span><i className="ri-arrow-down-s-line"></i></span>
                        </div>
                        <div className="faq__description">
                            Placing an order is simple and convenient. Navigate to the product
                            page, select the desired quantity, and click "Add to Cart." Follow
                            the intuitive checkout process, providing necessary details.
                        </div>
                    </div>
                    <div className="faq__card" style={{ border: '2px solid orange' }}>
                        <div className="faq__header">
                        <a href="https://github.com/SiddharthVikram068/IndusChain/" target="_blank" className="bold-link">
                            Developer resources and portal
                        </a>
                            <span><i className="ri-arrow-down-s-line"></i></span>
                        </div>
                        <div className="faq__description">
                            Our commitment to customer satisfaction means that if you
                            encounter any issues, our support team is ready to assist and find
                            a swift resolution.
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="section__container article__container" id="Updates"></section>
      <section class="section__container article__container" id="Updates">
        <h3 class="section__subheader">Insights And Innovation</h3>
        <h2 class="section__header">Recent Articles</h2>
        <div class="article__grid">
          <div class="article__card">
            <div>
              <p>Oct 5, 2024</p>
              <a href="#">Innovation</a>
            </div>
            <h4>IndusChain now capable of Predictive maintenance in Manifacturing Equipment</h4>
          </div>
          <div class="article__card">
            <div>
              <p>Oct 7, 2024</p>
              <a href="#">Products</a>
            </div>
            <h4>Utilising Cargochain with Industry planner, how to upgrade your supply chain</h4>
          </div>
          <div class="article__card">
            <div>
              <p>Oct 10, 2024</p>
              <a href="#">Insights</a>
            </div>
            <h4>Guide to use Flexsim with Induschain, road to maximising efficiency</h4>
          </div>
        </div>
      </section>




      <section class="banner">
        <div class="section__container banner__container">
          <div class="banner__content">
            <h3 class="section__subheader">Join Us</h3>
            <h2 class="section__header">Stay Updated!</h2>
            <p class="section__description">
              From technological innovations to market updates, our curated
              content keeps you informed.
            </p>
          </div>
          <div class="banner__form">
            <form action="/">
              <input type="text" placeholder="Enter Your Email" />
              <button class="btn">Submit</button>
            </form>
          </div>
        </div>
      </section>

      <footer id="Contact">
        <div class="section__container footer__container">
          <div class="footer__col">
            <h4>About Us</h4>
            <p>
              Founded on the principles of integrity and a vision for advancing
              industrial solutions, we have evolved into a trusted partner for
              businesses seeking cutting-edge products and unparalleled support.
            </p>
            <button class="btn">Contact Us</button>
          </div>
          <div class="footer__col">
            <h4>Quick Links</h4>
            <ul class="footer__links">
              <li><a href="#Resources">Products</a></li>
              <li><a href="#About">Blog</a></li>
              <li><a href="#Contact">Contact Us</a></li>
              <li><a href="#Updates">Customer Support</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4>Social Media</h4>
            <div class="footer__media">
              <img src={media1} alt="media" />
              <img src={media2} alt="media" />
              <img src={media3} alt="media" />
              <img src={media4} alt="media" />
              <img src={media5} alt="media" />
              <img src={media6} alt="media" />
            </div>
            {/* <div class="footer__socials">
              <a href="#"><i class="ri-facebook-fill"></i></a>
              <a href="#"><i class="ri-twitter-fill"></i></a>
              <a href="#"><i class="ri-linkedin-fill"></i></a>
              <a href="#"><i class="ri-instagram-line"></i></a>
            </div> */}

            <FooterSocials />

          </div>
        </div>
        <div class="footer__bar">
          Copyright © 2024 Web Design Mastery. All rights reserved.
        </div>
      </footer>
      </div>

      {/* Repeat for other sections */}
    </>
  )
}

export default App
