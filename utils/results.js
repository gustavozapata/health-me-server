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

/*  the rarest blood types:
O positive: 35%
O negative: 13%
A positive: 30%
A negative: 8%
B positive: 8%
B negative: 2%
AB positive: 2%
AB negative: 1%
*/

exports.randomise = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

exports.randomiseDecimal = (min, max) => {  
    let random = Math.random() * (max - min) + min;
    let power = Math.pow(10, 1);
    return Math.floor(random * power) / power;
}

exports.handleError = (res, err) => {
    res.status(400).json({
        status: "error",
        error: err,
    });
}