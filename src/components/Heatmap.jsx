import PropTypes from "prop-types";

import "../styles/Heatmap.css";
import { HeatmapBox } from "./HeatmapBox";

export function Heatmap({ data }) {
  return (
    <>
      <h2 className="title">Heatmap - Altas e Baixas de ações semanal</h2>
      <div className="container">
        <div className="heatmap-container">
          {data.map((item, index) => (
            <HeatmapBox
              key={index}
              stock={item.stock}
              variation={item.variation}
              value={item.value}
            />
          ))}
        </div>
      </div>
    </>
  );
}

Heatmap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      stock: PropTypes.string.isRequired,
      variation: PropTypes.number.isRequired,
    })
  ).isRequired,
};
