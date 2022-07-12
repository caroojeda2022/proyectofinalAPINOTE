const selectNoteByIdQuery = require('../../db/noteQueries/selectNoteByIdQuery');

const getNote = async (req, res, next) => {
  try {
    const { idNote } = req.params;

    const { idUser } = req;

    const note = await selectNoteByIdQuery(idUser, idNote);

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

module.exports = getNote;
