import Input from "./Input";
import Modal from "./Modal";
import { useRef } from "react";

export default function NewProject({ onAdd, onCancel }) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dateRef = useRef();
    const modal = useRef();

    function handleSave() {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const date = dateRef.current.value;

        if (title.trim() === '' ||
            description.trim() === '' ||
            date.trim() === '') 
        {
                modal.current.open();
                return;
        }

        onAdd({
            title: title,
            description: description,
            date: date
        });

    }

    return (
        <>
        <Modal ref={modal} btnCaption="Okay">
            <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid input</h2>
            <p className='text-stone-600 mb-4'>
                Oops... looks like you forgot to enter a value.
            </p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li><button onClick={onCancel} className="text-stone-800 hover:text-stone-950">Cancel</button></li>
                <li><button onClick={handleSave} className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md">Save</button></li>
            </menu>
            <div>
                <Input type='text' ref={titleRef} label="Title" />
                <Input ref={descriptionRef} label="Description" isTextArea />
                <Input type='date' ref={dateRef} label="Due Date" />
            </div>
        </div></>
        
    );
}