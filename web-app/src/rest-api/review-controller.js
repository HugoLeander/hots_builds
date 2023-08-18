module.exports = function ({ reviewManager }) {
    return {
        createReview: async function(request, response) {
        const newReview = {
            hero_name: request.body.hero_name,
            name: request.body.name,
            rating: request.body.rating,
            description: request.body.description,
            author_account_id: request.body.userInfo.account_id
        };

        reviewManager.createReview(isLoggedIn, newReview, (errors, review, success) => {
            if (errors.length > 0) {
                return response.status(400).json({ error: errors.join(", ") });
            }
            if (success) {
                response.status(201).json(review);
            } else {
                response.status(403).json({ error: "Unauthorized" });
            }
        });
    },

    updateReview: async function(request, response) {
        const reviewId = request.params.id;
        const updatedReview = {
            review_id: reviewId,
            hero_name: request.body.hero_name,
            name: request.body.name,
            rating: request.body.rating,
            description: request.body.description
        };
        const userInfo = request.body.userInfo;
        try {
            const authorized = await reviewManager.isAuthorized(userInfo, reviewId);
            if (!authorized) {
                response.sendStatus(403);
            } else {
                const review = await reviewManager.updateReview(updatedReview);
                response.status(204).end();
            }
        }
        catch (error) {
            response.status(400).json({ error: "An error occured when trying to update the review" });
        }
    },


    getReviewById: async function(request, response) {
        const reviewId = request.params.id;

        try {
            const review = await reviewManager.getReviewById(reviewId);
            if (review) {
                response.status(200).json(review);
            } else {
                response.status(404).end();
            }
        } catch (error) {
            response.status(400).json({ error: "An error occured when trying to fetch the review" });
        }
    },

    getReviewsByHeroId: async function(request, response) {
        const heroId = request.params.id;

        try {
            const reviews = await reviewManager.getReviewsByHeroId(heroId);
            response.status(200).json(reviews);
        } catch (error) {
            response.status(400).json({ error: "An error occured when trying to fetch the reviews for this hero" });
        }
    },

    deleteReviewById: async function(request, response) {
        const reviewId = request.params.id;
        const userInfo = request.body.userInfo;

        try {
            const review = await reviewManager.getReviewById(reviewId);
            if (!review) {
                response.status(404).end();
            } else {
                const authorized = await reviewManager.isAuthorized(userInfo, reviewId);
                if (!authorized) {
                    response.sendStatus(403);
                } else {
                    await reviewManager.deleteReviewById(reviewId);
                    response.status(204).end();
                }
            }
        } catch (error) {
            response.status(400).json({ error: "An error occured when trying to delete the review" });
        }
    }
    };
};
