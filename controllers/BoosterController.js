const prisma = require("../config/prisma");

class BoosterController {
    async openBooster(req, res) {
        try {
            const { booster, id } = req.user;

            // 1. Vérifier si on est autorisé à ouvrir le booster
            const timerNextBooster = Number(booster) - Date.now();
            if (timerNextBooster > 0) {
                return res
                    .status(400)
                    .json({ message: "Your booster is not ready." });
            }

            const apiCards = await fetch(
                "https://hp-api.lainocs.fr/characters"
            );
            const cardsData = await apiCards.json();
            const numberOfCards = 5;
            let boosterCards = [];

            const minCeiled = Math.ceil(1);
            const maxFloored = Math.floor(cardsData.length);

            for (let i = 0; i < numberOfCards; i++) {
                // Générer 5 ID aléatoires entre [1, cardsData.length]
                const randomID = Math.floor(
                    Math.random() * (maxFloored - minCeiled) + minCeiled
                );

                // Vérifier si l'utilisateur a déjà la carte correspondant à l'ID
                const hasCard = await prisma.userCard.findFirst({
                    where: {
                        userId: id,
                        cardId: randomID,
                    },
                });

                if (hasCard) {
                    // Si il possède la carte, on update la quantité
                    await prisma.userCard.update({
                        where: {
                            userId_cardId: {
                                userId: id,
                                cardId: hasCard.cardId,
                            },
                        },
                        data: {
                            quantity: {
                                increment: 1,
                            },
                        },
                    });
                    // On insère les données de la carte dans le tableau boosterCards
                    boosterCards.push(cardsData[randomID]);
                } else {
                    // Sinon on crée la relation entre l'utilisateur et la carte
                    await prisma.userCard.create({
                        data: {
                            cardId: randomID,
                            userId: id,
                        },
                    });
                    // On insère les données de la carte dans le tableau boosterCards
                    boosterCards.push(cardsData[randomID]);
                }
            }

            // On update le timer du booster
            const nextBooster = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    booster: (Date.now() + 1000 * 60 * 60 * 24).toString(),
                },
                select: {
                    booster: true,
                },
            });

            return res
                .status(200)
                .json({ boosterCards, booster: nextBooster.booster });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async resetBooster(req, res) {
        try {
            const { id } = req.user;

            await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    booster: "0",
                },
                select: {
                    booster: true,
                },
            });

            return res.status(200).json({
                success: "The booster has been successfully reseted/",
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new BoosterController();
