import {
  serviceOrderSchema,
  basketOrderSchema,
} from "../../validators/orderValidator";
import OrderService from "../../service/order_service";
import OrderModel from "../../models/order/order_model";
import SmsService from "../../service/sms_service";
import customer_login from "../../models/customer/customer_login";
import CustomerAddress from "../../models/customer/customer_address";

const orderController = {
  async serviceOrdercreate(req, res, next) {
    // Validation
    const { error } = serviceOrderSchema.validate(req.body);
    if (error) {
      res.json({ status: false, data: { error } });
    } else {
      const {
        order_type,
        service_id,
        service_name,
        items,
        payment_type,
        payment_status,
        pickup_date,
        pickup_time,
        delivery_date,
        delivery_time,
        pickup_address_id,
        delivery_address_id,
        ord_status,
      } = req.body;
      const userId = req.user._id;

      const recentOrder = await OrderModel.findOne({
        customer_id: userId,
        service_name: service_name,
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // 24 houre
      });

      if (recentOrder) {
        return res.status(200).json({
          status: false,
          msg: `You have already made a order ${service_name}`,
        });
      }

      const customer = await customer_login.findOne({ _id: userId });
      const customerPhoneNo = customer.mobile;
      const address = await CustomerAddress.findOne({ customer_id: userId,_id: pickup_address_id,});
      const formatAddress =  address.format_address;
      const ordNo = await OrderService.generateOrderNumber();

      const order = new OrderModel({
        customer_id: userId,
        order_no: ordNo,
        order_display_no: `ORD${ordNo}`,
        order_type: "Service order",
        service_id,
        service_name,
        items,
        payment_type,
        payment_status,
        pickup_date,
        pickup_time,
        delivery_date,
        delivery_time,
        pickup_address: formatAddress,
        pickup_address_id,
        delivery_address: formatAddress,
        delivery_address_id: pickup_address_id,
        ord_status,
      });
      await order.save();
      await SmsService.orderPlaceSms(customerPhoneNo, `ORD${ordNo}`);
      res.json({ status: true, msg: `Order successfully placed. Your order ID is ORD${ordNo}.` });
    }
  },

  async basketOrderSchema(req, res, next) {
    // Validation
    const { error } = basketOrderSchema.validate(req.body);
    if (error) {
      res.json({ status: false, data: { error } });
    } else {
      const {
        order_type,
        no_of_servic,
        service_name,
        items,
        items_list,
        payment_type,
        payment_status,
        amount,
        pickup_date,
        pickup_time,
        delivery_date,
        delivery_time,
        pickup_address_id,
        delivery_address_id,
        ord_status,
      } = req.body;
      const userId = req.user._id;

      const recentOrder = await OrderModel.findOne({
        customer_id: userId, createdAt: { $gte: new Date(Date.now() - 2 * 60 * 1000) }, // 24 houre
      });
      if (recentOrder) {
        return res.status(200).json({
          status: false,
          msg: `You have already made a order wait for 120 sec`,
        });
      }
      const customer = await customer_login.findOne({ _id: userId });
      const customerPhoneNo = customer.mobile;
      const address = await CustomerAddress.findOne({ customer_id: userId,_id: pickup_address_id,});
      const formatAddress =  address.format_address;
      const ordNo = await OrderService.generateOrderNumber();

      const order = new OrderModel({
        customer_id: userId,
        order_no: ordNo,
        order_display_no: `ORD${ordNo}`,
        order_type: "Basket order",
        no_of_servic,
        service_name,
        items,
        items_list,
        payment_type,
        payment_status,
        amount,
        pickup_date,
        pickup_time,
        delivery_date,
        delivery_time,
        pickup_address: formatAddress,
        pickup_address_id,
        delivery_address: formatAddress,
        delivery_address_id: pickup_address_id,
        ord_status,
      });
      await order.save();
      await SmsService.orderPlaceSms(customerPhoneNo, `ORD${ordNo}`);
      res.json({ status: true, msg: `Order successfully placed. Your order ID is ORD${ordNo}.` });
    }
  },

  async read(req, res, next) {
    const orderList = await OrderModel.find().sort({ createdAt: -1 });

    res.json({ status: true, data: orderList });
  },

  async delete(req, res, next) {
    const adminId = req.user._id;
    const orderId = req.params.id;

    const packageData = await OrderModel.findOneAndRemove({
      _id: orderId,
    });

    res.json({
      status: true,
      msg: "package deleted successfully",
      data: packageData,
    });
  },
};

export default orderController;
