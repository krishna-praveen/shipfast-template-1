const stripe = require("stripe")(
  "sk_test_51ODSs6A56A0EdwEk19qB6DVxhoRacGQvCIVD4TDyyCwOsJjVyt6Susi6Bo2b7Gckr1sxDq4eiyRisUX9AZs6V3Ux00te4v0qDt"
);

stripe.subscriptions
  .update("sub_1OOp6hA56A0EdwEk7KiJi8FH", {
    trial_end: "now",
  })
  .then((subscription) => {
    console.log(subscription);
  })
  .catch((error) => {
    console.error(error);
  });
