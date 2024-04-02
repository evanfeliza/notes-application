"use client"
import { useEffect, useRef, useState } from "react"
import { useParams, usePathname } from "next/navigation"
import { useForm, useFormContext, FormProvider } from "react-hook-form"
import { createClient } from "@/utils/supabase/client"
import { Modal } from "@/components/Modal"
import toast, { Toaster } from "react-hot-toast"



type NotesFormData = {
    id: string;
    note: string;
    userId: string;
}


const getNotesDetails = async () => {
    const supabase = createClient()
    const { data } = await supabase
        .from('notes')
        .select('*')
    return data
}

const useGetNotes = () => {
    const [notes, setNotes] = useState<NotesFormData[] | null>(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await getNotesDetails();
                setNotes(res);
            } catch (error) {
                toast.error(`${error}`, { className: "capitalize tracking-widest text-xs" });
            }
        };
        fetchNotes();

    }, [notes])
    return {
        notes,
    };
};

const useAddNewNoteModal = () => {
    const { register, reset, formState: { errors } } = useFormContext<NotesFormData>()
    const addNewNoteModalRef = useRef<HTMLDialogElement>(null)

    return {
        modal:
            <Modal modalBoxClassName="flex flex-col gap-4" onBackdropClick={() => addNewNoteModalRef?.current?.close()} ref={addNewNoteModalRef}>
                <p className="text-lg tracking-wider font-semibold text-secondary mb-4">Your New Note</p>
                <textarea rows={5} className="textarea textarea-bordered w-full resize-none" placeholder="Type here" {...register("note", { required: "Field is empty." })}></textarea>
                {errors?.note && <p className="text-xs text-warning flex py-2 px-1 gap-2 items-center"><i className="fi fi-sr-info"></i>{errors.note?.message}</p>}
                <div className="card-actions justify-end">
                    <button onClick={() => {
                        reset()
                        addNewNoteModalRef?.current?.close()
                    }} className="btn btn-error tracking-widest font-light">Cancel</button>
                    <button type="submit" className="btn btn-success tracking-widest font-light">Submit</button>
                </div>
            </Modal >
        ,
        open: () => addNewNoteModalRef?.current?.showModal()
    }
}

const useUpdateNoteModal = () => {
    const [updateNote, setUpdateNote] = useState<NotesFormData>()
    const { register, reset, formState: { errors }, watch } = useForm<NotesFormData>()
    const supabase = createClient()
    const updateNoteModalRef = useRef<HTMLDialogElement>(null)

    const updateNoteValue = watch("note")

    useEffect(() => {
        reset(updateNote)
    }, [updateNote])

    const handleSubmitUpdateNote = async ({ id, note }: {
        id: string;
        note: string
    }) => {
        try {
            const { error } = await supabase
                .from('notes')
                .update({ note: note })
                .eq('id', id).select();

            if (error) {
                throw new Error(error.message);
            }

            toast.success(`Updated!`, { className: "capitalize tracking-widest text-xs" });
            updateNoteModalRef?.current?.close()
        } catch (error) {
            toast.error(`${error}`, { className: "capitalize tracking-widest text-xs" });
        }
    };
    return {
        modal:
            <Modal modalBoxClassName="flex flex-col gap-4" onBackdropClick={() => {
                reset()
                updateNoteModalRef?.current?.close()
            }} ref={updateNoteModalRef}>
                <p className="text-lg tracking-wider font-semibold text-secondary mb-4">Edit  Your Note</p>
                <textarea rows={5} className="textarea textarea-bordered w-full resize-none" placeholder="Type here" {...register("note", { required: "Field is empty." })}></textarea>
                {errors?.note && <p className="text-xs text-warning flex py-2 px-1 gap-2 items-center"><i className="fi fi-sr-info"></i>{errors.note?.message}</p>}
                <div className="card-actions justify-end">
                    <button onClick={(e) => {
                        e.preventDefault();
                        reset()
                        updateNoteModalRef?.current?.close()
                    }} className="btn btn-error tracking-widest font-light">Cancel</button>
                    <button onClick={() => handleSubmitUpdateNote({
                        id: updateNote!.id!,
                        note: updateNoteValue
                    })} className="btn btn-success tracking-widest font-light">Save</button>
                </div>
            </Modal >
        ,
        open: (data: NotesFormData) => {
            setUpdateNote(data)
            updateNoteModalRef?.current?.showModal()
        }
    }
}


const useDeleteNoteModal = () => {
    const [currentNote, setCurrentNote] = useState<NotesFormData>()
    const { reset } = useForm<NotesFormData>()
    const supabase = createClient()
    const useDeleteNoteModal = useRef<HTMLDialogElement>(null)

    const handleDeleteNote = async ({ id, note }: {
        id: string;
        note: string
    }) => {
        try {
            const { error } = await supabase
                .from('notes')
                .delete()
                .eq('id', id)
                .eq('note', note)
            if (error) {
                throw new Error(error.message);
            }

            toast.success(`Removed`, { className: "capitalize tracking-widest text-xs" });
            useDeleteNoteModal?.current?.close()
        } catch (error) {
            toast.error(`${error}`, { className: "capitalize tracking-widest text-xs" });
        }
    };
    return {
        modal:
            <Modal modalBoxClassName="flex flex-col gap-4" onBackdropClick={() => useDeleteNoteModal?.current?.close()} ref={useDeleteNoteModal}>
                <p className="modal-title"> Are you sure you want to delete this Note ?</p>
                <div className="card-actions justify-end">
                    <button onClick={(e) => {
                        e.preventDefault();
                        reset()
                        useDeleteNoteModal?.current?.close()
                    }} className="btn btn-outline btn-error tracking-widest font-light">No</button>
                    <button onClick={() => handleDeleteNote({
                        id: currentNote!.id!,
                        note: currentNote!.note!
                    })} className="btn btn-outline btn-success tracking-widest font-light">Yes</button>
                </div>
            </Modal >
        ,
        open: (data: NotesFormData) => {
            setCurrentNote(data)
            useDeleteNoteModal?.current?.showModal()
        }
    }
}





const useNotesForm = () => {
    const params = useParams<{ id: string }>()
    const supabase = createClient()
    const methods = useForm<NotesFormData>()


    const onSubmit = async (formData: NotesFormData) => {
        try {
            const { error } = await supabase
                .from('notes')
                .insert([
                    { user_id: params.id, note: formData.note },
                ])
                .select();

            if (error) {
                throw new Error(error.message);
            }

            toast.success(`Added a new note!`, { className: "capitalize tracking-widest text-xs" });
            methods.reset();
        } catch (error) {
            toast.error(`${error}`, { className: "capitalize tracking-widest text-xs" });
        }
    }

    return {
        methods,
        handleSubmit: methods.handleSubmit(onSubmit),
    }
}

const NoteListSkeleton = () => {
    const skeletonList = new Array(3).fill(null)

    return <>
        {
            skeletonList.map((_, index) => <li key={index} className="bg-base-100 rounded-xl h-52 drop-shadow-md px-6 py-4 skeleton flex flex-col gap-5">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-1/4"></div>
            </li>)
        }
    </>
}

const NoteListForm = () => {
    const { modal: updateNoteModal, open: openUpdateNoteModal } = useUpdateNoteModal()
    const { modal: deleteNoteModal, open: openDeleteNoteModal } = useDeleteNoteModal()
    const { notes } = useGetNotes()

    return (
        <ul className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max grid-flow-row overflow-y-auto px-8 py-6 max-h-full h-full">
            {updateNoteModal}
            {deleteNoteModal}
            {notes ? notes.map(note => <li key={note.id} className="card bg-base-100 drop-shadow-md h-full rounded-2xl">
                <div className="card-body h-full rounded-2xl">
                    <p className="font-light tracking-widest text-md h-full">{note.note}</p>
                    <div className="mt-2 flex justify-end gap-2">
                        <button className="btn btn-primary tracking-widest font-light inline-block uppercase" onClick={() => {
                            openUpdateNoteModal({ id: note.id, note: note.note, userId: note.userId })
                        }}>
                            Edit
                            <i className="ml-4 fi fi-rr-edit"></i>
                        </button>
                        <button className="btn btn-error tracking-widest uppercase font-light inline-block" onClick={() => openDeleteNoteModal({ id: note.id, note: note.note, userId: note.userId })}>
                            Delete
                            <i className="ml-4 fi fi-rr-trash"></i>
                        </button>
                    </div>
                </div>
            </li>) : <NoteListSkeleton />}
        </ul>
    )
}




const NoteForm = () => {
    const { modal: addNewNoteModal, open: openAddNewNoteModal } = useAddNewNoteModal()
    const pathname = usePathname()
    const segments = pathname.split('/')
    const path = segments[segments.length - 1]

    useEffect(() => {
        if (path === "add") {
            openAddNewNoteModal()
        }
    }, [path, pathname])

    return <div className="mt-20">
        {addNewNoteModal}
        <div className="px-8 py-4 flex items-center justify-between">
            <h1 className="text-3xl tracking-wider text-secondary font-medium">My Notes</h1>
            <div className="my-auto p-4">
                <span className="tracking-wider text-lg mr-4 ">New Note</span>
                <button onClick={openAddNewNoteModal} className="btn btn-circle btn-secondary my-auto">
                    <i className="fi fi-rs-add-document text-base-100 text-2xl"></i>
                </button>
            </div>
        </div>
        <hr />
    </div>
}

export default function NotesDetail() {
    const { methods, handleSubmit } = useNotesForm()
    return (
        <FormProvider {...methods}>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
            <form onSubmit={handleSubmit}>
                <NoteForm />
            </form>
            <NoteListForm />
        </FormProvider>
    );
}