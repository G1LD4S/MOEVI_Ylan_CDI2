const prisma = require("../config/prisma");

class CardsController {
    async getUserCards(req, res) {
        try {
            const { id } = req.user;
            let total = 0;

            const userCards = await prisma.userCard.findMany({
                where: {
                    userId: id,
                },
                select: {
                    cardId: true,
                    quantity: true,
                },
            });

            if (!userCards.length) {
                return res
                    .status(404)
                    .json({ message: "You don't own any card." });
            }

            userCards.forEach((card) => {
                total += card.quantity;
            });

            return res.status(200).json({ cards: userCards, total });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new CardsController();
