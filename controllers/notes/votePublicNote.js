const insertVotePublicQuery = require('../../db/noteQueries/insertVotePublicQuery');

const votePublicNote = async (req, res, next) => {
  try {
    const { idNote } = req.params;

    const value = await insertVotePublicQuery(req.idUser, idNote);

    res.send({
      status: 'ok',
      message: value ? 'Nota pública agregada' : 'Nota eliminada',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = votePublicNote;
