import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ContactList from "./components/ContactList";
import EditContact from "./components/EditContact";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [contacts,setContacts] = useState()

    useEffect(()=>{
        getContacts()
    },[])

    async function getContacts () {
        await axios('https://demo.sibers.com/users')
            .then(response => {
                setContacts(response.data)
                //console.log(response.data)
            })
            .catch(error => console.log('Error fetching data',error))
    }

    // function to sort contacts in Ascending way
    const handleSortAsc = () => {
        const sortedData = contacts.slice().sort((a,b)=>{
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        })
        setContacts(sortedData)
    }

    // function to sort contacts in Descending way
    const handleSortDesc = () => {
        const sortedData = contacts.slice().sort((a,b)=>{
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0;
        })
        setContacts(sortedData)
    }
    const handleSearch = (e) => {
        const filteredContacts = contacts.filter(contact => contact.name.includes(e.target.value))
        console.log(e.target.value)
        if (e.target.value !== '') {
            setContacts(filteredContacts)
        } else {
            setContacts(contacts)
        }
    }

    return (
        <BrowserRouter>
            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <button className="btn btn-outline-primary mx-lg-3 my-lg-0 my-3" onClick={handleSortAsc}>Sort A - Z</button>
                                <button className="btn btn-outline-info mb-lg-0 mb-3" onClick={handleSortDesc}>Sort Z - A</button>
                            </Nav>
                            <label htmlFor="">
                                <input className="form-control form-control-sm" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
                            </label>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main>
                <div className="container py-5 overflow-auto">
                    <Routes>
                        <Route path='/' element={<ContactList contacts={contacts}/>}/>
                        <Route path='/contact/edit/:id' element={<EditContact/>}/>
                    </Routes>
                </div>
            </main>
            <footer className='pb-5 text-center'>
                <div className="container">
                    <a href="https://github.com/ukulya">
                        <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32"
                             data-view-component="true" className="octicon octicon-mark-github v-align-middle">
                            <path fillRule="evenodd"
                                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        <span className='ms-2'>made by Ukulya</span>
                    </a>
                </div>
            </footer>
        </BrowserRouter>
    )
}

export default App
