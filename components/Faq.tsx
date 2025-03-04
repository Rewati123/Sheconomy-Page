"use client"


import { useState } from "react";

const faqs = [
  {
    question: "What is SHEconomy?",
    answer:
      "SHEconomy is a dynamic platform dedicated to empowering women entrepreneurs. It provides a comprehensive ecosystem that includes free e-commerce hosting, mentorship, networking opportunities, and tools to help women start, scale, and succeed in their businesses.",
  },
  {
    question: "Who can join the SHEconomy Program?",
    answer:
      "The program is open to all women entrepreneurs, whether you're just starting out, looking to expand your business, or seeking mentorship and networking opportunities. It’s also designed for women professionals who wish to contribute as mentors or speakers.",
  },
  {
    question: "How do I register for the program?",
    answer:
      "Simply download the SHEconomy app from your app store, create your community profile, and fill out the registration form. Once submitted, you’ll receive a confirmation email with further details about your enrollment.",
  },
  {
    question: "Is there any fee to join the SHEconomy Program?",
    answer:
      "No, joining SHEconomy is completely free. We believe in making empowerment accessible to every woman without any financial barriers.",
  },
  {
    question: "What benefits can I expect from joining SHEconomy?",
    answer: `As a member, you gain access to:
      - A supportive community of like-minded women entrepreneurs
      - Free e-commerce hosting and business tools
      - Expert mentorship and leadership training
      - Exclusive networking events and webinars
      - Opportunities to collaborate and grow your brand`,
  },
  {
    question: "How does the mentorship program work?",
    answer:
      "Once you attend the program, a mentor will be assigned to guide you. The mentorship program is designed to provide expert advice, industry insights, and ongoing support to help you navigate challenges and scale your business.",
  },
  {
    question: "Can I join SHEconomy as a seller?",
    answer:
      "Yes! SHEconomy offers a seller-friendly platform where you can list your products or services and connect with a dedicated audience that supports women-led businesses.",
  },
  {
    question: "What support is available if I encounter issues or need help?",
    answer:
      "Our SHEconomy support team is always here to help. You can reach out via our in-app support, email, or through our social media channels for any assistance you might need.",
  },
  {
    question: "How do I become a mentor or speaker on SHEconomy?",
    answer:
      "If you’re interested in contributing as a mentor or speaker, simply apply through our dedicated section on the app. Your application will be reviewed, and if selected, you’ll be invited to join our mentorship and speaking engagements.",
  },
  {
    question: "What events does SHEconomy organize?",
    answer:
      "SHEconomy hosts a variety of events including networking sessions, webinars, mentorship programs, and collaborative workshops, all aimed at empowering women entrepreneurs and fostering business growth.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center px-4 py-3 text-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-600 bg-gray-50">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
