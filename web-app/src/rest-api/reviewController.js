const reviewManager = require('../business-logic-layer/review-manager');

async function createReview(request, response) {
    const newReview = {
        hero_name: request.body.hero_name,
        name: request.body.name,
        rating: request.body.rating,
        description: request.body.description,
        author_account_id: request.body.userInfo.account_id
    };

    try {
        const review = await reviewManager.createReview(newReview);
        response.status(201).json(review);
    } catch (error) {
        response.status(400).json({ error: "An error occured when trying to create the review" });
    }
}

async function updateReview(request, response) {
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
}


async function getReviewById(request, response) {
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
}

async function getReviewsByHeroId(request, response) {
    const heroId = request.params.id;

    try {
        const reviews = await reviewManager.getReviewsByHeroId(heroId);
        response.status(200).json(reviews);
    } catch (error) {
        response.status(400).json({ error: "An error occured when trying to fetch the reviews for this hero" });
    }
}

async function deleteReviewById(request, response) {
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

module.exports = {
    createReview,
    updateReview,
    getReviewById,
    getReviewsByHeroId,
    deleteReviewById
};