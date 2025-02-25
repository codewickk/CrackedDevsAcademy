import React, { useState } from "react";
import { PurchaseCard } from "../ui/PurchaseCard";
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  price,
  category,
  _id
}) => {
  const [showPurchaseCard, setShowPurchaseCard] = useState(false);

  return (
    <>
      <div
        className={cn(
          "row-span-1 rounded-xl group/bento transition duration-200 bg-black border border-neutral-800 hover:border-neutral-700",
          "h-[400px] flex flex-col",
          className
        )}
      >
        {header && (
          <div className="h-40 overflow-hidden rounded-t-xl">
            <img
              src={header}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-grow flex flex-col p-4">
          <div className="flex-grow">
            <div className="text-neutral-500">{icon}</div>
            <div className="font-sans font-bold text-neutral-200 mb-2 mt-2">
              {title}
            </div>
            <div className="font-sans font-normal text-neutral-400 text-xs">
              {description}
            </div>
            <div className="font-sans font-medium text-neutral-300 mt-2">
              Category: <span className="text-neutral-400">{category}</span>
            </div>
            <div className="font-sans font-medium text-green-400 mt-1">
              Price: {price}
            </div>
          </div>

          <div className="mt-auto pt-4">
            <button
              onClick={() => setShowPurchaseCard(true)}
              className="w-full px-6 py-3 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200"
            >
              Enroll now
            </button>
          </div>
        </div>
      </div>
      
      {showPurchaseCard && (
        <PurchaseCard
          isOpen={showPurchaseCard}
          onClose={() => setShowPurchaseCard(false)}
          courseData={{
            _id,
            title,
            description,
            thumbnail: header,
            category,
            price,
          }}
        />
      )}
    </>
  );
};