import './App.css';
import { useState } from 'react';

//reset object
const resetNote = {
    content: "",
    auther: ""
}


function App() {
    //***************** States *****************
    // เก็บ State แบบเก่าคือเก็บแยกกัน
    // const [noteContent, setNoteContent] = useState('');
    // const [noteAuther, setNoteAuther] = useState('');

    // เก็บแบบใหม่ เก็บแบบ Object และ Array
    const [note, setNote] = useState(resetNote); //เก็บ note ที่พึ่งพิมพ์ไป
    const [allNote, setAllNote] = useState([]); //เก็บ note ทั้งหมด
    const [editNote, setEditNote] = useState(null);


    //***************** Function *****************
    function onNoteValueChange(event) {
        //get name element
        const { name, value } = event.target;
        setNote((prevNote) => {
            return {
                ...prevNote, //เก็บ Note ค่าเก่า
                [name]: value //new data
            }
        })
    };

    function onEditNoteValueChange(event) {
        //get name element
        const { name, value } = event.target;
        setEditNote((prevNote) => {
            return {
                ...prevNote, //เก็บ Note ค่าเก่า
                [name]: value //new data
            }
        })
    };


    function onNoteSubmit(event) {
        event.preventDefault();

        setAllNote((prevAllNote) => {
            const newNote = { ...note };
            newNote.id = Date.now().toString();
            return [newNote, ...prevAllNote]
        })
        // console.log(note);
        setNote(resetNote);

    }

    function onEditNoteSubmit(event) {
        event.preventDefault();
        setEditNote(null);

        return setAllNote((prevAllNote) => {
            return prevAllNote.map((theNote) => {
                if (theNote.id !== editNote.id) return theNote;
                return editNote;
            });
        });

    }


    function onNoteDelect(noteId) {
        setAllNote((prevAllNote) => {
            return prevAllNote.filter(theNote => theNote.id !== noteId);
        });

    }

    //***************** ADD Elements *****************
    const noteElements = allNote.map((thenote) => {
        return (
            <div key={thenote.id} className='app-note'>
                <p>{thenote.content}</p>
                <h5>auther : {thenote.auther} <br />id : {thenote.id}</h5>
                <p>
                    <a onClick={() => { setEditNote(thenote) }}>แก้ไข</a>
                    <span> | </span>
                    <a onClick={() => { onNoteDelect(thenote.id) }}>ลบ</a>
                </p>
            </div>
        );
    });

    let editNoteElement = null;
    if (editNote) {
        editNoteElement = (
            <div className='app-edit-note'>
                <form onSubmit={onEditNoteSubmit}>
                    <p>
                        <textarea
                            rows="3"
                            type="text"
                            placeholder='ข้อความ'
                            name="content"
                            value={editNote.content}
                            onChange={onEditNoteValueChange}
                        />
                    </p>

                    <p>
                        <input
                            type="text"
                            placeholder='ลงชื่อ'
                            name="auther"
                            value={editNote.auther}
                            onChange={onEditNoteValueChange}
                        />
                    </p>
                    <p>
                        <button type='submit'>บันทึกข้อความ</button>
                    </p>
                </form>
            </div>
        )
    }



    //***************** UI *****************
    return (
        <section className='app-section'>
            <div className='app-container'>
                <h3>แอปบันทึกข้อความ</h3>
                <form onSubmit={onNoteSubmit}>
                    <p>
                        <textarea
                            rows="3"
                            type="text"
                            placeholder='ข้อความ'
                            name="content"
                            value={note.content}
                            onChange={onNoteValueChange}
                        />
                    </p>

                    <p>
                        <input
                            type="text"
                            placeholder='ลงชื่อ'
                            name="auther"
                            value={note.auther}
                            onChange={onNoteValueChange}
                        />
                    </p>
                    <p>
                        <button type='submit'>บันทึกข้อความ</button>
                    </p>
                </form>
            </div>

            <div className='app-notes'>
                {noteElements}
            </div>

            {editNoteElement}
        </section>
    );
}

export default App;
