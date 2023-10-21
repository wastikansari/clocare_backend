import Joi from "joi";

const serviceOrderSchema = Joi.object({
  order_type: Joi.string().required(),
  service_id: Joi.number().required(),
  service_name: Joi.string().required(),
  items: Joi.number().required(),
  payment_type: Joi.string().required(),
  payment_status: Joi.string().required(),
  pickup_date: Joi.string().required(),
  pickup_time: Joi.string().required(),
  delivery_date: Joi.string().required(),
  delivery_time: Joi.string().required(),
  pickup_address_id: Joi.string().required(),
  delivery_address_id: Joi.string().required(),
  ord_status: Joi.string().required(),
});

const basketOrderSchema = Joi.object({
  order_type: Joi.string().required(),
  no_of_servic: Joi.number().required(),
  service_name: Joi.string().required(),
  items: Joi.number().required(),
  items_list: Joi.string().required(),
  payment_type: Joi.string().required(),
  payment_status: Joi.string().required(),
  amount: Joi.number().required(),
  pickup_date: Joi.string().required(),
  pickup_time: Joi.string().required(),
  delivery_date: Joi.string().required(),
  delivery_time: Joi.string().required(),
  pickup_address_id: Joi.string().required(),
  delivery_address_id: Joi.string().required(),
  ord_status: Joi.string().required(),
});

export { serviceOrderSchema, basketOrderSchema };
