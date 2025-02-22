export default function About({ description, shortdescription }) {
  return (
    <section id="about" className="bg-[#D41461] text-white py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          About the Program
        </h2>

        <div className="w-1/4 h-1 bg-white mx-auto mt-2"></div>

        <h3 className="text-3xl sm:text-4xl font-bold mt-8 mb-8">
          {shortdescription}
        </h3>

        <div className="max-w-6xl mx-auto">
          <p
            className="text-2xl sm:text-3xl leading-relaxed mt-4 text-justify whitespace-pre-line"
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
