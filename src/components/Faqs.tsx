import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// ✅ FAQ Data
const faqs = [
  {
    question: "What is Cavallis, and what do you sell?",
    answer:
      "Cavallis is a leading provider of premium organic supplements and wellness products designed for a healthier lifestyle.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Simply browse our products, add to cart, and proceed to checkout. You can pay via M-Pesa or choose cash on delivery.",
  },
  {
    question: "Do you offer nationwide delivery in Kenya?",
    answer:
      "Yes, we deliver across Kenya within 24-72 hours. Delivery fees vary based on location.",
  },
  {
    question: "Can I return a product if I'm not satisfied?",
    answer:
      "We offer a 7-day return policy for unopened products. Contact support for assistance.",
  },
  {
    question: "How does the referral program work?",
    answer:
      "When you refer a friend, you earn a commission when they make a purchase. Join the referral program to start earning!",
  },
];

// ✅ FAQ Component
const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-gray-300 pb-2">
              <button
                className="flex justify-between w-full text-lg font-semibold text-left text-gray-800"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
