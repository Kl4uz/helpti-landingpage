import React, { useEffect, useRef, useState } from "react";

interface CarouselItem {
  icon: any;
  title: string;
  description: string;
}

interface MobileCarouselProps {
  items: CarouselItem[];
  direction: "ltr" | "rtl";
  variant: "services" | "differentials";
}

const MobileCarousel = ({ items, direction, variant }: MobileCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = direction === "ltr" ? (prev + 1) % items.length : (prev - 1 + items.length) % items.length;
        if (scrollRef.current) {
          const child = scrollRef.current.children[next] as HTMLElement;
          if (child) scrollRef.current.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
        }
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [items.length, direction]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const childWidth = (scrollRef.current.children[0] as HTMLElement)?.offsetWidth || 1;
    setActiveIndex(Math.round(scrollRef.current.scrollLeft / childWidth));
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const child = scrollRef.current.children[index] as HTMLElement;
    if (child) scrollRef.current.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
  };

  const isServices = variant === "services";

  return (
    <div className="md:hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className={`snap-center shrink-0 w-[74vw] p-4 rounded-xl border transition-all duration-300 ${
              isServices
                ? "bg-card border-border"
                : "bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20"
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              isServices ? "bg-primary/10" : "bg-primary-foreground/20"
            }`}>
              <item.icon className={`h-6 w-6 ${isServices ? "text-primary" : "text-primary-foreground"}`} />
            </div>
            <h3 className={`font-display font-semibold mb-2 ${isServices ? "text-foreground" : ""}`}>{item.title}</h3>
            <p className={`text-sm ${isServices ? "text-muted-foreground" : "opacity-80"}`}>{item.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActiveIndex(i); scrollToIndex(i); }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? isServices ? "bg-primary w-6" : "bg-primary-foreground w-6"
                : isServices ? "bg-primary/30 w-2" : "bg-primary-foreground/30 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileCarousel;
