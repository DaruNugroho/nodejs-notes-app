const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const date = new Date().toISOString();
    const createdAt = date;
    const updatedAt = date;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    }

    notes.push(newNote);

    // Cek apakah catatan baru berhasil tambahkan
    const isSuccess = notes.filter((note) => note.id === id);

    if(isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId : id,
            }
        }); 

        response.code(201);
        return response;
    }


    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambakan',
    });

    response.code(500);
    return response;
};


const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    }
});


const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) =>  n.id === id);

    if (note !== undefined) {
        return {
          status: 'success',
          data: {
            note: note[0],
          },
        };
      }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    });

    response.code(404);
    return response;
} 

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if(index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags, 
            body, 
            updatedAt
        }

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui'
        });

        response.code(200);
        return response;
    }


    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal diperbarui. Id tidak ditemukan'
    });

    response.code(404);
    return response; 

}


module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler };