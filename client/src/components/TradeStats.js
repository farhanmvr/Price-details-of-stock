import { Card, Col, Row, Statistic, Table } from "antd";
import moment from "moment";
import CountUp from "react-countup";

const TradeStats = ({ stats }) => {
  // This formatter is to animate the numbers
  const formatter = (value, decimals = 2) => (
    <CountUp end={value} decimals={decimals} duration={1} separator="," />
  );

  return (
    <div className="trade-stats">
      <Card>
        <h2>
          Trade Statistics of{" "}
          <span className="color-primary">{stats?.ticker_symbol} </span> on{" "}
          {moment(stats?.date).format("Do MMMM YYYY")}
        </h2>
        <div className="trade-stats-card">
          <Card bordered={false}>
            <Statistic
              title="Open"
              value={stats?.open}
              precision={2}
              formatter={formatter}
              valueStyle={{ color: "blue" }}
            />
          </Card>

          <Card bordered={false}>
            <Statistic
              title="High"
              value={stats?.high}
              precision={2}
              formatter={formatter}
              valueStyle={{ color: "green" }}
            />
          </Card>

          <Card bordered={false}>
            <Statistic
              title="Low"
              value={stats?.low}
              precision={2}
              formatter={formatter}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>

          <Card bordered={false}>
            <Statistic
              title="Close"
              value={stats?.close}
              precision={2}
              formatter={formatter}
              valueStyle={{ color: "grey" }}
            />
          </Card>

          <Card bordered={false}>
            <Statistic
              title="Volume"
              value={stats?.volume}
              valueStyle={{ color: "indigo" }}
              formatter={(val) => formatter(val, 0)}
            />
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default TradeStats;
