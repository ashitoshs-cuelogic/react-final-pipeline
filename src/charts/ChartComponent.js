import React, { Fragment } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { COLORS, renderCustomizedLabel } from "./chartConstant";

const charts = props => {
  return (
    <Fragment>
      {props.pages
        ? props.pages.map((entry, index) => (
            <div
              style={{
                textAlign: "left",
                width: "40%",
                display: "inline",
                float: "left",
                marginLeft: "60px",
                color: COLORS[index]
              }}
              key={{ index }}
            >
              <span>
                {index + 1}) {entry.name}: {entry.value}
              </span>
            </div>
          ))
        : null}

      <PieChart width={800} height={400}>
        <Pie
          data={props.pages}
          cx={300}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
          outerRadius={100}
          {...props.elementConfig}
        >
          {props.pages
            ? props.pages.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))
            : null}
        </Pie>
      </PieChart>
    </Fragment>
  );
};

export default charts;
