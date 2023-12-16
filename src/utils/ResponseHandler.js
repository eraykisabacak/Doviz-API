class ResponseHandler{
    static successResponse(res, data, message = "Success"){
        const response = {
            success: true,
            data: data,
            message: message
        };
        return res.json(response);
    }

    static errorResponse(res, message = "Error", statusCode = 500){
        const response = {
            success: false,
            message: message
        }
        res.status(statusCode).json(response);
    }
}

module.exports = ResponseHandler;
