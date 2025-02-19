import React from 'react';

const Testimonials = () => {
    return (
        <section>
            <div className="container mx-auto text-center">
                <h2 className="capitalize text-center mt-5 font-bold text-xl md:text-4xl">
                    Student Success Stories & Testimonials
                </h2>
                <p className="text-sm text-gray-600 my-2">
                    💡 Hear from students and teachers about their inspiring journeys and <br /> how our platform has helped them grow.
                </p>

                {/* Testimonials Section */}
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 my-4">
                    <div className="card bg-base-100 image-full w-96 shadow-xl">
                        <figure>
                            <img className='w-full h-full object-cover'
                                src="https://htmldemo.net/edumate-v1/edumate/assets/images/blog-2.webp"
                                alt="Photo" />
                        </figure>
                        <div className="card-body flex justify-center items-center">
                            <div className='text-center flex items-center  justify-center flex-col'>

                                <h2 className="card-title">- Jane Smith, Teacher</h2>
                                <p className='overflow-hidden'> "As a teacher, the resource sharing feature allowed me to connect with my students and collaborate easily. It's a game changer!"
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 image-full w-96 shadow-xl">
                        <figure>
                            <img className='w-full h-full object-cover'
                                src="https://aurora-institute.org/wp-content/uploads/Redefining-Student-Success-post.jpg" alt="Photo" />
                        </figure>
                        <div className="card-body flex justify-center items-center">
                            <div className='text-center flex items-center  justify-center flex-col'>

                                <h2 className="card-title">- John Doe, Student</h2>
                                <p>               "The platform helped me stay organized with my study schedule. I was able to track my progress and get the support I needed!"
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 image-full w-96 shadow-xl">
                        <figure>
                            <img className='w-full h-full object-cover'
                                src="https://imageio.forbes.com/specials-images/dam/imageserve/1146956275/0x0.jpg?format=jpg&width=1200" alt="Photo" />
                        </figure>
                        <div className="card-body text-center flex justify-center items-center">
                            <div className='text-center flex items-center  justify-center flex-col'>
                                <h2 className="card-title">- Sarah Lee, Student</h2>
                                <p> "Before using the platform, I struggled to manage my time. Now, with personalized study plans, I feel more confident and focused."
                                </p>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="mt-2">
                    <h3 className="text-3xl font-semibold text-gray-800 mb-6">Video Success Highlights</h3>
                    <div className="flex justify-center space-x-8">
                        {/* Video  */}
                        <div className="w-80 h-48 bg-gray-200 rounded-lg">
                            <iframe className="w-full h-full" width="560" height="315" src="https://www.youtube.com/embed/e0HlQh-hwyE?si=J_JHMb66QHNMMBil" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                        <div className="w-80 h-48 bg-gray-200 rounded-lg">
                            <iframe className="w-full h-full" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen src="https://www.youtube.com/embed/0M0f3iuvyro?si=5nAIcr6pJ-f3moG2" title="YouTube video player" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
