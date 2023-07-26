import { Button, Form, Input, Card, DatePicker } from "antd";
import moment from "moment";

const TradeStatsForm = ({ isLoading, fetchTradeStats }) => {
  const [form] = Form.useForm();
  return (
    <div className="trade-stats-from">
      <Card>
        <Form
          form={form}
          onFinish={fetchTradeStats}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Stock Ticker"
            name="ticker_symbol"
            rules={[
              {
                required: true,
                message: "Please enter stock/equity ticker symbol",
              },
            ]}
          >
            <Input
              maxLength={10}
              onChange={(e) =>
                form.setFieldsValue({
                  ticker_symbol: e?.target?.value?.toUpperCase(),
                })
              }
              placeholder="The ticker symbol of the stock/equity."
            />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please select a date",
              },
            ]}
          >
            <DatePicker
              disabledDate={(date) => date.isAfter(moment().startOf("day"))}
              className="w-100"
              placeholder="The date of the requested open/close"
            />
          </Form.Item>

          <Button
            loading={isLoading}
            className="w-100"
            type="primary"
            htmlType="submit"
          >
            Get Price Statistics
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default TradeStatsForm;
