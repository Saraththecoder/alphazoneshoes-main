import React from 'react';
import './InfoPage.css';

const INFO_CONTENT = {
  about: {
    title: "About Us",
    content: "TheAlphaZone is India's premium destination for fashion-forward individuals. We believe that true luxury lies in comfort and unapologetic style. Our mission is to provide you with the highest quality footwear and apparel that empowers you to wear bold and live alpha."
  },
  contact: {
    title: "Contact Us",
    content: "We're always here to help you. Reach out to our customer support team at support@thealphazone.in or call us at +91 9999999999. Working hours: Monday to Saturday, 10:00 AM - 7:00 PM."
  },
  privacy: {
    title: "Privacy Policy",
    content: "Your privacy is our priority. We only collect the necessary information to process your orders and improve your shopping experience. We never sell your personal data to third parties. We utilize industry-standard encryption to protect your payment details."
  },
  terms: {
    title: "Terms of Service",
    content: "By using our website, you agree to our terms of service. All content on this site is the property of TheAlphaZone. We reserve the right to refuse service to anyone for any reason at any time. Prices for our products are subject to change without notice."
  },
  refund: {
    title: "Refund & Return Policy",
    content: "We offer a 7-day hassle-free return policy. Items must be unused, in their original packaging, and with all tags attached. Refunds will be processed within 5-7 business days after we receive the returned item. For COD orders, a store credit will be issued."
  },
  faq: {
    title: "Frequently Asked Questions",
    content: "Q: How long does delivery take?\nA: Standard delivery takes 3-5 business days depending on your location in India.\n\nQ: Do you offer free shipping?\nA: Yes, we offer free shipping on all orders above ₹499.\n\nQ: How can I track my order?\nA: You will receive a tracking link via email and WhatsApp once your order is shipped."
  }
};

const InfoPage = ({ type }) => {
  const data = INFO_CONTENT[type];

  if (!data) return <div>Content not found</div>;

  return (
    <div className="info-page page-enter">
      <div className="info-container">
        <h1 className="info-title display-text">{data.title}</h1>
        <div className="info-content">
          {data.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
