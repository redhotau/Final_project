const NotFoundError = require("../errors/NotFoundError");
const { Movie } = require("../models");  

exports.index = async (req, res, next) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    } catch (error) {
        next(error)  //akan dihandle midlleware error
    }
};

exports.show = async (req, res, next) => {
    const { id } = req.params ;
    try {
        const movie = await Movie.findByPk(id);
        if (!movie) throw new NotFoundError("Movie id is not found");
        res.status(200).json(movie)
    } catch (error) {
        next(error) 
    }
};


