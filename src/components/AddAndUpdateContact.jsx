import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Slide, toast } from 'react-toastify';
import * as Yup from "yup";
import { db } from '../config/firebase';
import Modal from './Modal';


const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
})




const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  
  const addContact = async (contact) => {
    try {      
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("contact added!", {
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
  const updateContact = async (contact, id) => {
    try {      
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.info("contact updated!", {
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
    <div>
      <Modal isOpen={isOpen} isClose={onClose}>
        <Formik
          
          validationSchema={contactSchemaValidation}

          initialValues={isUpdate ? {
            name: contact.name,
            email: contact.email,
          } :
            {
              name: '',
              email:'',
            }
          }          
          onSubmit={(values) => {
            isUpdate ? updateContact(values,contact.id) :
            addContact({name: values.name, email: values.email});            
          }}        
        >
          <Form className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="name">Name</label>
              <Field name="name" className='border h-10'></Field>
              <div className='text-red-500 text-xs'>
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className='border h-10'></Field>
              <div className='text-red-500 text-xs'>
                <ErrorMessage name="email" />
              </div>
            </div>
            <button className='bg-teal text-white px-3 py-1.5 border self-end'>
              { isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>        
      </Modal>  
    </div>
  )
}

export default AddAndUpdateContact