import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { FaGithub } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaCode } from "react-icons/fa";

const About: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initEngine = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      setIsLoaded(true);
    };
    
    initEngine();
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles container loaded:", container);
  };

  // Modern particle options
  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#12100E", // smokey-black
        },
      },
      fullScreen: {
        enable: false,
      },
      particles: {
        color: {
          value: "#998FC7", // indigo-300
        },
        links: {
          color: "#D4C2FC", // periwinkle-200
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 50,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div id="aboutContainer" className="relative w-full min-h-screen bg-gray-900 text-white py-16">
      {isLoaded && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="absolute inset-0 z-0"
        />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20">
        {/* Title section */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">
          <span className="text-teal-400">Algorithm Visualizer</span>
        </h1>

        {/* Main content card */}
        <div className="bg-gray-800 bg-opacity-70 p-6 md:p-8 rounded-lg shadow-xl">
          <div className="space-y-4">
            <p className="leading-relaxed">
              This project is a <span className="text-teal-400 font-semibold">sorting algorithm visualizer</span> built in React designed to help users understand how different sorting algorithms work through interactive visualization.
            </p>
            
            <p className="leading-relaxed">
              Each algorithm comes with detailed information and implementations in various programming languages, making it an excellent educational tool for students and developers alike.
            </p>
            
            <p className="leading-relaxed">
              By visualizing sorting algorithms in real-time, users can gain insights into algorithm efficiency, performance characteristics, and the underlying mechanics of each sorting method.
            </p>
            
            <div className="bg-gray-700 p-4 rounded-lg mt-6">
              <p className="leading-relaxed">
                This project is <span className="text-teal-400 font-semibold">open source</span> and welcomes contributions! Issues are posted on GitHub, and all pull requests will be reviewed.
              </p>
            </div>
            
            <p className="leading-relaxed">
              Have suggestions or feedback? Please share! Your input helps make this tool more useful for everyone in the community.
            </p>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-6 text-teal-400">Thank you for visiting!</h2>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://github.com/BasicallyManny/Algorithm-Visualizer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md shadow-md transition duration-200"
              >
                <FaGithub className="mr-2" size={20} />
                <span>GitHub Repository</span>
              </a>
              
              <a
                href="https://mannyfong.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-teal-600 hover:bg-teal-500 text-white font-medium py-3 px-6 rounded-md shadow-md transition duration-200"
              >
                <CgProfile className="mr-2" size={20} />
                <span>Visit Portfolio</span>
              </a>
            </div>
          </div>
        </div>

        {/* Featured algorithms section */}
        <div className="mt-12 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-teal-400">Featured Algorithms</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {["Insertion Sort", "Quick Sort", "Merge Sort"].map((algo) => (
              <div key={algo} className="bg-gray-700 p-4 rounded-md flex items-center">
                <FaCode className="text-teal-400 mr-3" size={16} />
                <span>{algo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-white text-sm">
          <p>© {new Date().getFullYear()} Algorithm Visualizer</p>
          <p>Crafted with ❤️ by Manny Fong</p>
        </div>
      </div>
    </div>
  );
};

export default About;