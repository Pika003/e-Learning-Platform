const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        if (error.isJoi === true) {
            error.statusCode = 422;
        }
        res.status(error.statusCode || 500).json({
            statusCode: error.statusCode || 500,
            message: error.message || 'Internal Server Error'
        });
    }
};

export { asyncHandler };
