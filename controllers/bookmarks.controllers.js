const NotFoundError = require("../errors/NotFoundError");
const { Bookmark,Movie } = require("../models");  

exports.index = async (req, res, next) => {
    const options = {
      include: ["movie"],
      where: {UserId: req.user.id},
    };

    try {
        const myBookmark = await Bookmark.findAll(options);
        res.status(200).json(myBookmark);
    } catch (error) {
        next(error) 
    }
};

exports.create = async (req, res, next) => {
    const custid = req.user.id;
    const { id } = req.params;
    try {
      const findTitle = await Movie.findByPk(id);
      const bookmarkMovie = await Bookmark.create({ MovieId: id, UserId: custid });
      res.status(201).json({message: "Success adding new bookmark", 
        id: bookmarkMovie.id,
        UserId: custid, 
        MovieId: bookmarkMovie.MovieId,
        MovieTitle: findTitle.title,
    });
    } catch (error) {
      next(error);
    }
  };

  