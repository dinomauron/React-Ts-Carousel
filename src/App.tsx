import Carousel from "./components/Carousel";

const slides = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-orange-500",
].map((bg, nr) => (
  <div key={bg} className={`w-full h-full ${bg} grid place-items-center`}>
    Slide {nr + 1}
  </div>
));

const App = () => (
  <main className="w-full min-h-screen grid place-items-center">
    <div className="w-3/4 aspect-video">
      <Carousel slides={slides} />
    </div>
  </main>
);

export default App;
