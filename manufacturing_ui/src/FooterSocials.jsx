import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const FooterSocials = () => {
  return (
    <div className="footer__socials">
      <a href="#Contact" aria-label="Facebook">
        <FaFacebookF />
      </a>
      <a href="#Contact" aria-label="Twitter">
        <FaTwitter />
      </a>
      <a href="#Contact" aria-label="LinkedIn">
        <FaLinkedinIn />
      </a>
      <a href="#Contact" aria-label="Instagram">
        <FaInstagram />
      </a>
    </div>
  );
};

export default FooterSocials;
