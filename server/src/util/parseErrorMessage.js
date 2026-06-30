export const parseErrorMessage = err => {
    if (err.name === "ValidationError") return Object.keys(err.errors).map(msg => msg = err.errors[msg].message);
    if (err.message) return [err.message];
    return [err];
};