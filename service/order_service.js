import orderModel from "../models/order/order_model";

const OrderService = {
  // Generate a new order number
  async generateOrderNumber() {
    const latestOrder = await orderModel.findOne().sort({ createdAt: -1 });
    // const newOrderNumber = latestOrder ? latestOrder.order_no + 1 : 1;
    var newOrderNumber = latestOrder ? parseInt(latestOrder.order_no.toString()) + 1
      : 1;

    console.log(`generateOrderNumber ${latestOrder} and ${latestOrder.order_no} and ${newOrderNumber} `);

    return newOrderNumber;
  },
};

export default OrderService;
