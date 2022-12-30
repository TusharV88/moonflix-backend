
const responeWithData = (res, statusCode, data) => res.status(statusCode).json(data);

const error = (res) => responeWithData(res, 500, {
    status: 500,
    message: 'Oops! Something wrong!'
});

const badRequest = (res, message) => responeWithData(res, 400, {
    status: 400,
    message
});

const ok = (res, data) => responeWithData(res, 200, data);

const created = (res, data) => responeWithData(res, 201, data);

const unauthorized = (res) => responeWithData(res, 401, {
    status: 401,
    message: 'Unauthorized'
});

const notFound = (res) => responeWithData(res, 404, {
    status: 404,
    message: 'Resource not found'
});

export default {
    error,
    badRequest,
    ok,
    created,
    unauthorized,
    notFound
};
