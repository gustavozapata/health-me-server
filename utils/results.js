exports.BLOOD_TYPES = [
    "O+",
    "O-",
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
]

//randomise int between range
exports.randomise = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

//randomise double between range
exports.randomiseDecimal = (min, max) => {  
    let random = Math.random() * (max - min) + min;
    let power = Math.pow(10, 1);
    return Math.floor(random * power) / power;
}

//handle errors
exports.handleError = (res, err) => {
    res.status(400).json({
        status: "error",
        error: err,
    });
}