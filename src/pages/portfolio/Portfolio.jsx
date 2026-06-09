import React from "react";
import { portfolio } from "@/data";
import PortfolioItem from "@/components/PortfolioItem";

const Portfolio = () => {
  return (
    <section className="py-20 px-6" id="portfolio">
      <h2 className="text-center text-4xl font-bold tracking-tight mb-16">
        My <span className="text-primary">Portfolio</span>
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item) => (
          <PortfolioItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
