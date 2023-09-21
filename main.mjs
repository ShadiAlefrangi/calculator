import express from "express";

const app = express();

app.get("/calc", (req, res) => {
	if (!req.query.discountType) {
		throw new Error("You must enter the discount type");
	}
	const priceBeforeDiscount = req.query.priceBeforeDiscount;
	const discount = req.query.discount;

	const discountType = req.query.discountType.toUpperCase();
	if (!priceBeforeDiscount) {
		throw new Error("You must enter the price before discount");
	}
	if (!discount) {
		throw new Error("You must enter the discount value");
	}

	if (discountType !== "PERCENT" && discountType !== "FIXED") {
		throw new Error(
			"You can select one of two types of discount Fixed or Percent"
		);
	}

	if (discountType === "PERCENT") {
		const youSaved = (priceBeforeDiscount * discount) / 100;
		const priceAfterDiscount = priceBeforeDiscount - youSaved;
		res.send({
			youSaved: `$${youSaved}`,
			priceAfterDiscount: `$${priceAfterDiscount}`,
		});
	} else {
		const discountPercentage = (discount / priceBeforeDiscount) * 100;
		const priceAfterDiscount = priceBeforeDiscount - discount;
		res.send({
			priceAfterDiscount: `$${priceAfterDiscount}`,
			discountPercentage: discountPercentage.toFixed(1) + "%",
		});
	}
});

app.listen(5000, () => {
	console.log(`Server is running at localhost:5000`);
});
