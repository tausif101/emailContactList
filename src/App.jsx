import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAndUpdateContact from "./components/AddAndUpdateContact.jsx";
import ContactCard from "./components/ContactCard.jsx";
import Navbar from "./components/Navbar";
import NotFoundContact from "./components/NotFoundContact.jsx";
import { db } from "./config/firebase.js";
import useDisclouse from "./hooks/useDisclouse.js";

export default function App() {

  const [contacts, setContacts] = useState([]);
  const { onClose, onOpen, isOpen } = useDisclouse();

  useEffect(() => {

    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          });
          setContacts(contactList);
          return contactList;
        })

        
      } catch (error) {
          console.log(error);
      }


    }
    
    getContacts();
  }, []);



  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (

    <>
      <div className="max-w-[370px] mx-auto px-4">
        {/* showing the logo & website name */}
        <Navbar />

        {/* search box and add button */}
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="text-teal  text-2xl absolute ml-1" />
            <input
              onChange={filterContacts}
              type="text" className="flex-grow h-9 bg-transparent border border-teal rounded-md border-[2px] pl-9 font-medium text-lg" />
          </div>  
          <FiPlusCircle className="text-4xl text-teal items-center cursor-pointer" onClick={onOpen}/>
          
        </div>

        {/* show fetched contacts */}
        <div className="mt-4 gap-2 flex flex-col">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>       
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />    
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Slide/>
    </>
  )
}