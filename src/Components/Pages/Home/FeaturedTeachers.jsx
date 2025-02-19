import React from "react";

const teachers = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        subject: "Physics",
        expertise: "Quantum Mechanics, Astrophysics",
        rating: 4.8,
        reviews: 120,
        image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
        id: 2,
        name: "Mr. Alex Brown",
        subject: "Mathematics",
        expertise: "Algebra, Calculus",
        rating: 4.7,
        reviews: 98,
        image: "https://randomuser.me/api/portraits/men/40.jpg",
    },
    {
        id: 3,
        name: "Ms. Emily Davis",
        subject: "Computer Science",
        expertise: "AI, Web Development",
        rating: 4.9,
        reviews: 150,
        image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
        id: 4,
        name: "Ss.Mr.Davis",
        subject: "Computer Science",
        expertise: "AI, Web Development",
        rating: 3.9,
        reviews: 50,
        image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
];

const FeaturedTeachers = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="capitalize text-center my-5 font-bold text-xl md:text-4xl mb-6">Featured Teachers & Mentors</h2>

            <div className="grid md:grid-cols-4 gap-2 my-8">
                {teachers.map((teacher) => (
                    <div key={teacher.id} className="card bg-base-100 rounded-none shadow-xl p-2">
                        <figure>
                            <img src={teacher.image} alt={teacher.name} className="rounded-full w-32 h-32 object-cover" />
                        </figure>
                        <div className="card-body p-2 text-center">
                            <h3 className="text-xl font-semibold">{teacher.name}</h3>
                            <b className="text-gray-500 border-dashed border rounded-full border-green-500 inline-block">{teacher.subject}</b>
                            <p className="text-sm text-gray-600">{teacher.expertise}</p>
                            <div className="flex justify-center items-center gap-1 mt-2">
                                <span className="text-yellow-500 text-lg">⭐ {teacher.rating}</span>
                                <span className="text-gray-500 text-sm">({teacher.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedTeachers;
