import HomePageData from "../../Data/HomePageData";

const Home = () => {
  const { header, hero, features, courses, testimonials, cta } = HomePageData;

  return (
    <div className=" border-4 border-slate-800 space-y-12 bg-gradient-to-b from-cyan-950 via-slate-900 to-black text-white min-h-screen">
      {/* Header Section */}
      <header className="relative">
        <img
          src={header.url}
          alt="Website Header"
          className="w-screen h-screen object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-8xl font-bold text-white drop-shadow-lg">
            {header.appName}
          </h1>
          <p className="text-xl mt-4 max-w-3xl text-center text-gray-300">
            {header.welcome}
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center p-8 bg-gray-800">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in-down">
          {hero.title}
        </h1>
        <p className="text-lg mb-6 animate-fade-in-up">{hero.subtitle}</p>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          {hero.buttonText}
        </button>
        <img
          src={hero.image}
          alt="Hero"
          className="mt-6 mx-auto max-w-lg rounded-lg shadow-lg animate-scale-in"
        />
      </section>

      {/* Features Section */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 shadow-lg rounded-lg text-center transition-transform transform hover:scale-105 animate-slide-in"
            >
              <div className="text-4xl mb-4 text-purple-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-purple-300">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className="p-8 bg-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Our Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-6 bg-gray-700 shadow-lg rounded-lg text-center transition-transform transform hover:scale-105 animate-slide-in"
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2 text-purple-300">
                {course.name}
              </h3>
              <p className="text-gray-300 mb-4">{course.description}</p>
              <a
                href={course.link}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 shadow-lg rounded-lg transition-transform transform hover:scale-105 animate-fade-in"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-52 h-52 rounded-full mb-4 mx-auto"
              />
              <h3 className="text-xl font-bold text-center mb-2 text-purple-300">
                {testimonial.name}
              </h3>
              <p className="text-gray-300 text-center">
                {testimonial.feedback}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center p-8 bg-gray-800">
        <h2 className="text-3xl font-bold mb-4 text-purple-400">{cta.title}</h2>
        <p className="text-lg mb-6 text-gray-300">{cta.description}</p>
        <a
          href={cta.link}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {cta.buttonText}
        </a>
      </section>
    </div>
  );
};

export default Home;
