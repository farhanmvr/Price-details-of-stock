import { useState } from "react";
import TradeStats from "../components/TradeStats";
import TradeStatsForm from "../components/TradeStatsFrom";
import { message } from "antd";
import axios from "axios";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({});

  // Fetch stock/equity stats
  const fetchTradeStats = async (values) => {
    const { ticker_symbol, date } = values;
    const formattedDate = date.format("YYYY-MM-DD");
    setStats({});
    setIsLoading(true);
    try {
      const body = { ticker_symbol, date: formattedDate };
      const res = await axios.post("/fetchStockData", body);
      if (!res?.data || res?.status != 200) {
        message.error(
          res?.data?.message ?? "Something went wrong, please try again later"
        );
        return;
      }
      setStats(res.data);
    } catch (err) {
      message.error(
        err?.response?.data?.message ??
          "Something went wrong, please try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-section">
      {/* Trade stats form */}
      <TradeStatsForm isLoading={isLoading} fetchTradeStats={fetchTradeStats} />

      {/* Trade stats details fetched from api */}
      {stats?.ticker_symbol && <TradeStats stats={stats} />}
    </div>
  );
};

export default HomePage;
