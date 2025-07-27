import { useState } from "react";

const initialArticles = new Array(8)
  .fill({
    title: "E-cell",
    authorImage:
      "https://www.cameo.com/cdn-cgi/image/fit=cover,format=auto,width=210,height=278/https://cdn.cameo.com/thumbnails/648e2bf7c2977ff5614bc426-wm-thumbnail.jpg",
    date: "69 May",
    category: "Research",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    image: ["/images/test.jpg", "/images/test.jpg", "/images/test.jpg"],
  })
  .map((article, index) => ({
    ...article,
    title: `E-cell ${index + 1}`,
    description: `This is article ${index + 1} about E-cell. ${
      article.description
    }`,
    category: ["Research", "Design", "Marketing", "Web Dev"][index % 4],
  }));

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filteredArticles = initialArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag === "All" || article.category === activeTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="w-full bg-[#0F0F0F] text-white font-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-l from-[#62C4FF] to-[#1e73fc] py-10 px-4 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/838769888/photo/noise-tv-screen-pixels-interfering-signal.jpg?s=612x612&w=0&k=20&c=ETN482AF1mO6MtcgJ0Ei-c7nnLBO8sB0wNZvRUZkDz0=')] opacity-20 pointer-events-none"></div>
        <div className="flex justify-between items-center">
          <div className="text-4xl py-5 font-poppins-bold font-bold md:text-7xl ">
            INSIGHTS & INSPIRATIONS
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-between md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
          <div className="flex gap-2 flex-wrap text-2xl">
            {["All", "Design", "Research", "Marketing", "Web Dev"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`bg-transparent hover:backdrop-blur-3xl hover:bg-[rgba(255,255,255,0.44)] text-[#1f1f1f] border border-transparent px-6 py-1 rounded-full text-[1.2rem] transition-colors ${
                    activeTag === tag ? "bg-[rgba(223, 223, 223, 0.44)]" : ""
                  }`}
                >
                  {tag}
                </button>
              )
            )}
          </div>
          <div className="flex items-center bg-white rounded-full px-5 py-3 w-full max-w-md md:py-3 px-8">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow font-semibold bg-transparent outline-none text-black placeholder-black pl-3"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>
        </div>
        <div className="pt-7">
          <hr className="border-t-2 border-black opacity-90" />
        </div>
      </div>

      {/* Main Content Row: First 2 Articles + Top Reads */}
      <div className="px-4 md:px-20 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* First-2 featured articles */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.slice(0, 2).map((article, i) => (
              <div key={i} className="bg-[#0F0F0F] p-4 rounded-xl">
                <img
                  src={article.image[i % 3]}
                  alt="article"
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={article.authorImage}
                    alt="author"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-lg font-semibold">{article.title}</div>
                    <div className="text-sm">{article.date}</div>
                  </div>
                </div>
                <div className="text-m text-gray-400 mb-2">
                  {article.category}
                </div>
                <p className="text-m text-gray-300">{article.description}</p>
              </div>
            ))
          ) : (
            <div className="lg:col-span-2 text-center py-10">
              No articles found matching your search.
            </div>
          )}
        </div>

        {/* Top Reads */}
        <div className="bg-[#3884ff] rounded-[10%] p-6 text-white sm:rounded-[3%]">
          <h2 className="text-lg font-bold mb-4">Top Reads</h2>
          <ol className="list-decimal list-inside space-y-2 text-m">
            {[
              "10 Small Businesses to start in 2025",
              "3 new tools every founder must know in 2025",
              "IPO and legal hurdles of 5 B2B startups",
              "7 AI tools launched between 2023-2024 that are worth investing in",
              "5 Unbelievable Shark Tank India pitches",
              "How Neobanks changed the fintech ecosystem in the US",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Decorative Horizontal Line */}
      {filteredArticles.length > 2 && (
        <>
          <div className="px-8 md:px-15">
            <hr className="my-8 border-t-1 border-white opacity-90" />
          </div>

          {/* Article Grid (remaining articles) */}
          <div className="px-4 md:px-20 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredArticles.slice(2).map((article, index) => (
              <div key={index} className="bg-[#0F0F0F] p-4 rounded-xl">
                <img
                  src={article.image[index % 3]}
                  alt="article"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={article.authorImage}
                    alt="author"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-lg font-semibold">{article.title}</div>
                    <div className="text-sm">{article.date}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  {article.category}
                </div>
                <p className="text-sm text-gray-300">{article.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
