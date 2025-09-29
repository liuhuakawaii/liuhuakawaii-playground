// ParallaxPage.tsx
import { useEffect, useRef, useState, Suspense } from "react";
import HamsterLoading from "@/components/feedback/HamsterLoading";
import ImageSuspense from "@/components/feedback/ImageSuspense";

import bg1 from "../assets/banner2.jpg";
import bg2 from "../assets/banner5.jpg";
import bg3 from "../assets/banner6.jpg";

function ParallaxSection({
  bg,
  children,
}: {
  bg: string;
  children?: React.ReactNode;
}) {
  return (
    <ImageSuspense src={bg}>
      {children}
    </ImageSuspense>
  );
}

export default function ParallaxPage() {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver 检测区块
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".observe");
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <Suspense fallback={<HamsterLoading />}>
      <div ref={containerRef} className="fixed top-0 left-0 w-full h-full overflow-y-scroll z-10">
        {/* 第一屏 */}
        <ParallaxSection bg={bg1}>
          <div className="text-white text-5xl font-bold">Main Title</div>
          <div className="absolute bottom-5 left-5 w-[300px] h-[150px] bg-black/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
            Time Particles
          </div>
        </ParallaxSection>

        {/* AboutMe */}
        <div
          id="about-me"
          className={`observe min-h-screen flex items-center justify-center transition-all duration-700 ${visibleSections["about-me"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h2 className="text-4xl font-bold">About Me</h2>
        </div>

        {/* 第二屏 */}
        <ParallaxSection bg={bg2}>
          <div
            id="stats"
            className={`observe transition-all duration-700 ${visibleSections["stats"] ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
          >
            <div className="bg-white/70 p-6 rounded-lg shadow-lg">Stats Card</div>
          </div>
        </ParallaxSection>

        {/* About Blog */}
        <div
          id="about-blog"
          className={`observe py-20 flex flex-col items-center bg-gradient-to-r from-gray-400 to-gray-100 transition-all duration-700 ${visibleSections["about-blog"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h1 className="text-3xl font-bold mb-4">About Blog</h1>
          <p className="max-w-2xl text-center">
            分享学习、工作、面试笔记，也是查阅知识的库。未来也会记录生活与有趣的事。
          </p>
        </div>

        {/* 第三屏 */}
        <ParallaxSection bg={bg3}>
          <div
            id="contact"
            className={`observe transition-all duration-700 ${visibleSections["contact"] ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
          >
            <div className="bg-white/70 p-6 rounded-lg shadow-lg">Contact Info</div>
          </div>
        </ParallaxSection>
      </div>
    </Suspense>
  );
}
