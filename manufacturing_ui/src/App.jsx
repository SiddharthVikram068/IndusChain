import { useState } from 'react'
import './styles.css'
// import 'swiper/swiper-bundle.min.css'

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
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#article">Articles</a></li>
            <li><a href="#client">Clients</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="section__container header__container" id="home">
          <p>TOGETHER</p>
          <h1>Making Industrial Service Smarter</h1>
          <div class="header__flex">
            <div class="header__card">
              <span><i class="ri-store-2-fill"></i></span>
              <div>
                <h5>Consectetur</h5>
                <h4>Production</h4>
              </div>
            </div>
            <div class="header__card">
              <span><i class="ri-building-fill"></i></span>
              <div>
                <h5>Consectetur</h5>
                <h4>Industrial</h4>
              </div>
            </div>
            <div class="header__card">
              <span><i class="ri-stackshare-line"></i></span>
              <div>
                <h5>Consectetur</h5>
                <h4>Construction</h4>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section class="section__container about__container" id="about">
        <div class="about__header">
          <div>
            <h3 class="section__subheader">About Us</h3>
            <h2 class="section__header">
              The Cleaver Industrial Business You Can Feel
            </h2>
          </div>
          <p class="section__description">
            With a relentless commitment to quality, efficiency, and customer
            satisfaction, we pride ourselves on our hands-on approach to
            industrial solutions. Discover the difference where expertise meets a
            tangible touch for unparalleled success.
          </p>
        </div>
        <div class="about__grid">
          <div class="about__card">
            <p>FITTING</p>
            <h4>The arrival of the fitting</h4>
          </div>
          <div class="about__card">
            <p>FACTORY</p>
            <h4>Factory business wonder</h4>
          </div>
          <div class="about__card">
            <p>QUALITY</p>
            <h4>We stand slow in quality</h4>
          </div>
        </div>
      </section>

      <section class="section__container faq__container" id="faq">
        <div class="faq__image">
          <img src="assets/faq.jpg" alt="faq" />
        </div>
        <div class="faq__content">
          <h3 class="section__subheader">Ask By Client</h3>
          <h2 class="section__header">Frequently Asked Questions</h2>
          <p class="section__description">
            A comprehensive resource designed to answer your most common queries
            and provide valuable insights into our products, services, and the
            industrial landscape.
          </p>
          <div class="faq__grid">
            <div class="faq__card">
              <div class="faq__header">
                <h4>What types of industrial products do you offer?</h4>
                <span><i class="ri-arrow-down-s-line"></i></span>
              </div>
              <div class="faq__description">
                We specialize in providing a diverse range of industrial products,
                including machinery, equipment, and supplies tailored to meet the
                unique needs of various sectors.
              </div>
            </div>
            <div class="faq__card">
              <div class="faq__header">
                <h4>How can I place an order for your products?</h4>
                <span><i class="ri-arrow-down-s-line"></i></span>
              </div>
              <div class="faq__description">
                Placing an order is simple and convenient. Navigate to the product
                page, select the desired quantity, and click "Add to Cart." Follow
                the intuitive checkout process, providing necessary details.
              </div>
            </div>
            <div class="faq__card">
              <div class="faq__header">
                <h4>Are there any warranties on your products?</h4>
                <span><i class="ri-arrow-down-s-line"></i></span>
              </div>
              <div class="faq__description">
                Our commitment to customer satisfaction means that if you
                encounter any issues, our support team is ready to assist and find
                a swift resolution.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section__container article__container" id="article">
        <h3 class="section__subheader">Insight And Trends</h3>
        <h2 class="section__header">Recent Articles</h2>
        <div class="article__grid">
          <div class="article__card">
            <img src="assets/article-1.jpg" alt="article" />
            <div>
              <p>Mar 19, 2023</p>
              <a href="#">Innovation</a>
            </div>
            <h4>Revolutionizing: The Latest in Industrial Innovation</h4>
          </div>
          <div class="article__card">
            <img src="assets/article-2.jpg" alt="article" />
            <div>
              <p>May 05, 2023</p>
              <a href="#">Products</a>
            </div>
            <h4>Spotlight: Enhancing Operations with Our Industrial Solutions</h4>
          </div>
          <div class="article__card">
            <img src="assets/article-3.jpg" alt="article" />
            <div>
              <p>Aug 24, 2023</p>
              <a href="#">Insights</a>
            </div>
            <h4>Navigating: Expert Perspectives on Industrial Dynamics</h4>
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

      <footer id="contact">
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
              <li><a href="#">Products</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Customer Support</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4>Social Media</h4>
            <div class="footer__media">
              <img src="assets/media-1.jpg" alt="media" />
              <img src="assets/media-2.jpg" alt="media" />
              <img src="assets/media-3.jpg" alt="media" />
              <img src="assets/media-4.jpg" alt="media" />
              <img src="assets/media-5.jpg" alt="media" />
              <img src="assets/media-6.jpg" alt="media" />
            </div>
            <div class="footer__socials">
              <a href="#"><i class="ri-facebook-fill"></i></a>
              <a href="#"><i class="ri-twitter-fill"></i></a>
              <a href="#"><i class="ri-linkedin-fill"></i></a>
              <a href="#"><i class="ri-instagram-line"></i></a>
            </div>
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
