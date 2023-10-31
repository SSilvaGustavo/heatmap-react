import PropTypes from "prop-types";
import { useState } from "react";

export function HeatmapBox({ stock, variation, value }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const percentage = parseFloat(value);

  const boxStyle =
    variation >= 0
      ? `rgb(${
          255 - Math.min(255, Math.round((percentage * 100) / 25))
        } , 255, ${255 - Math.min(255, Math.round((percentage * 100) / 25))})`
      : `rgb(255, ${
          255 - Math.min(255, Math.round((percentage * 100) / 25))
        }, ${255 - Math.min(255, Math.round((percentage * 100) / 25))})`;

  if (percentage > 0 && percentage <= 100) {
    return (
      <div
        className="rectangle"
        style={{
          gridColumn: `span ${Number(percentage.toString().charAt(0))}`,
          backgroundColor: `${boxStyle}`,
        }}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <span className="stock-name">{stock}</span>
        <span className={`var-name ${isMouseOver ? "active" : "hidden"}`}>
          {variation > 0 ? `+${variation}` : `${variation}`}%
        </span>
      </div>
    );
  }
}

HeatmapBox.propTypes = {
  stock: PropTypes.string.isRequired,
  variation: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
