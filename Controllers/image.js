const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '53e02fcfa7234373b2c8760dade66bef'
});


const handleClarifaiApiCall = (req, res) => {
    if (req.body.fileUpload === 0) {
        app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.inputurl)
            .then(data => {
                res.json(data)
            })
            .catch(err => res.status(400).json("Unable to work with api"))
    }
    else if (req.body.fileUpload === 1) {
        app.models.predict(Clarifai.FACE_DETECT_MODEL, { base64: req.body.inputurl })
            .then(data => {
                res.json(data)
            })
            .catch(err => res.status(400).json("Unable to work with api"))
    }

}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(
            entries => {
                res.json(entries[0])
            }
        )
        .catch(
            err => res.status(400).json('Unable to update count')
        )
}

module.exports = {
    handleImage: handleImage,
    handleClarifaiApiCall: handleClarifaiApiCall
};