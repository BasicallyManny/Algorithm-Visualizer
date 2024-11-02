import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo } from "react";
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // Ensure "@tsparticles/slim" package is installed

import { FaGithub } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


const About: React.FC = () => {
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: "#000000"
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#800080",
                },
                links: {
                    color: "#800080",
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.out,
                    },
                    random: false,
                    speed: 6,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        []
    );

    return (
        <div id="aboutContainer" className="relative w-full h-screen bg-black text-white pt-96 mt-6">
            {/* Particles background */}
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
                className="absolute inset-0 z-0" // Full-screen particles background
            />

            {/* About content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 rounded-lg shadow-lg">
                <p className="text-center text-white text-xl p-4 rounded-lg shadow-md">
                    <span className="block mb-2">
                        This project is a sorting algorithm visualizer built in React using TypeScript.
                    </span>
                    <span className="block mb-2">
                        It includes information about each individual algorithm and implementations in different programming languages.
                    </span>
                    <span className="block mb-2">
                        Allowing users to visualize how different sorting algorithms work in real time, provides an interactive way to understand the mechanics of sorting.
                    </span>
                    <span className="block mb-2">
                        I want to keep this project open source, so I welcome you to contribute!
                        I will be posting issues via GitHub, and any specific requests will be reviewed by me or a trusted contributor.
                    </span>
                    <span className="block mb-2">
                        Please feel free to share any details or specific requests.
                        Any feedback is greatly appreciated!
                    </span>w
                    <br></br>
                    <span className="font-bold text-xl !mt-6">Thank you for visiting!</span>
                </p>
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/BasicallyManny/Algorithm-Visualizer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center min-h-14 min-w-44 justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
                    >
                        <FaGithub className="mr-2" size={30} />
                        GitHub Repo
                    </a>

                </div>
                {/* Porfolio Link content*/}
                <div className="relative z-10 flex flex-col items-center justify-center p-2 rounded-lg shadow-lg">
                    <span className="font-bold text-xl !mt-6">Check out my portfolio</span>
                </div>
                <div className="flex space-x-4">
                    <a
                        href="https://mannyfong.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center mb-20 min-h-14 min-w-44 bg-purple-800 hover:bg-purple-500 text-white font-bold py-3 px-5 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
                    >
                        <CgProfile className="mr-2" size={30} />
                        Portfolio
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
