require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentController = {
  payment: async (req, res) => {
    const { cartItems } = req.body;

    // We can change keys   inside this map
    const lineItems = cartItems?.map((product) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: product?.name,
        },
        // We have to send price after converting into decimal therefore we have mutiplied by 100
        unit_amount: product?.price * 100,
      },
      quantity: 1,
      // quantity: product?.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    res.status(200).json({ id: session.id });
  },
};

module.exports = paymentController;
