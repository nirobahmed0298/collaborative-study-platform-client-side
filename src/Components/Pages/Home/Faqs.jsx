import React from 'react';
import { useState } from "react";

const faqs = [
    {
        question: "How can I create a study group?",
        answer: "You can create a study group by navigating to the 'Groups' section and clicking on 'Create Group'. Invite members and start collaborating!",
    },
    {
        question: "Where can I find shared study resources?",
        answer: "Shared study resources are available under the 'Resources' tab, categorized by subject and uploaded by teachers and students.",
    },
    {
        question: "Can teachers moderate discussions?",
        answer: "Yes, teachers have moderator privileges to guide discussions, pin important topics, and remove inappropriate content.",
    },
    {
        question: "How do I schedule a study session?",
        answer: "Go to the 'Study Schedule' tab, select a time slot, and invite participants. Notifications will be sent to all members.",
    },
];

const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="bg-white">
            <h2 className="capitalize text-center my-6 font-bold text-xl md:text-4xl mb-6">Study Collaboration Q&A</h2>
            <div className="space-y-2">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-sm">
                        <button
                            className="w-full text-left flex justify-between items-center text-lg font-semibold text-blue-900"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            {faq.question}
                            <span className="text-gray-600">{openIndex === index ? "▲" : "▼"}</span>
                        </button>
                        {openIndex === index && <p className="mt-2 text-gray-700">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faqs;