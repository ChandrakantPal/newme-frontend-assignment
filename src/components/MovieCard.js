import React from "react";

const MovieCard = ({ imageSrc, title, year }) => {
  return (
    <div className="space-y-2 rounded-md bg-gradient-to-tr from-black to-blue-950">
      <img
        src={
          imageSrc !== "N/A"
            ? imageSrc
            : "https://www.movienewz.com/img/films/poster-holder.jpg"
        }
        alt={title}
        className="object-cover object-top rounded-t-md w-full aspect-[9/16]"
      />
      <div className="p-2 space-y-2 text-center">
        <div className="text-base text-white md:text-2xl">{title},</div>
        <div className="text-sm md:text-base">{year}</div>
      </div>
    </div>
  );
};

export default MovieCard;
