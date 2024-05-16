import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { RiEditCircleLine } from 'react-icons/ri'
import { Slide, toast } from 'react-toastify'
import { db } from '../config/firebase'
import useDisclouse from '../hooks/useDisclouse'
import AddAndUpdateContact from './AddAndUpdateContact'

const ContactCard = ({ contact }) => {

    const { onClose, onOpen, isOpen } = useDisclouse();
    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id));
            toast.warn("contact deleted!", {
                position: "bottom-right",
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <>
        <div key={contact.id} className="bg-teal flex justify-between items-center p-2 rounded-lg">
          <div className="flex gap-1">
              <HiOutlineUserCircle className="text-white text-3xl " />
              <div className=" text-white">
                  <h2 className="font-medium">{contact.name}</h2>
                  <p className="text-sm">{contact.email}</p>
              </div>
          </div>
          <div className="flex text-3xl cursor-pointer">
              <RiEditCircleLine className="text-white" onClick={onOpen} />
              <IoMdTrash onClick={()=>deleteContact(contact.id)} className="text-red-500" />
          </div>
        </div>
          <AddAndUpdateContact
                contact = {contact}
                isUpdate
                isOpen={isOpen}
                onClose={onClose} 
          />
    </>
  )
}

export default ContactCard