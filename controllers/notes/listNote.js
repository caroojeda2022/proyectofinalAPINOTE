const selectAllNoteQuery = require('../../db/noteQueries/selectAllNoteQuery');

const listNote = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    const { idUser } = req;

    const note = await selectAllNoteQuery(idUser, keyword);

    res.send({
      status: 'ok',
      data: {
        note,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listNote;
