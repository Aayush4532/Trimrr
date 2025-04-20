import { useEffect } from 'react';
import { loadSlim } from 'tsparticles-slim'; // or use "tsparticles" if you need features from the full version

export default function ParticlesBackground() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  useEffect(() => {
    const initParticles = async () => {
      await particlesInit(window.tsParticles);
      
      window.tsParticles.load('tsparticles', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ["#9F7AEA", "#667EEA", "#6B46C1"]
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          links: {
            enable: true,
            distance: 150,
            color: "#7C3AED",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5
              }
            },
            push: {
              quantity: 4
            }
          }
        },
        retina_detect: true
      });
    };

    initParticles();

    return () => {
      // Cleanup function
      if (window.tsParticles) {
        window.tsParticles.dom().forEach(container => container.destroy());
      }
    };
  }, []);

  return <div id="tsparticles" className="absolute inset-0" />;
}