import edit from '../edit.svg'
import {NavLink} from "react-router-dom";

const ContactList = ({contacts}) => {

    // if contacts data is not ready - return loading
    if (!contacts) return 'Loading...'

    return(
        <>
            <h1>Contact List</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Website</th>
                </tr>
                </thead>
                <tbody>
                {contacts && contacts.map((contact,id)=> {
                    if (JSON.parse(localStorage.getItem(`userId${contact.id}`)) === contact.id) {
                        const userData = JSON.parse(localStorage.getItem(`userData${contact.id}`))
                        return <tr key={id}>
                            <th scope="row">{contact.id }</th>
                            <td>{userData.name}</td>
                            <td>{userData.username}</td>
                            <td>{userData.email}</td>
                            <td>{userData.phone}</td>
                            <td>
                                <span className='d-inline-block w-50'>{contact.website}</span>
                                <NavLink to={`/contact/edit/${contact.id}`} title='click to edit'
                                         className='mx-3 btn btn-outline-warning'>
                                    <img src={edit} alt="edit icon"/>
                                </NavLink>
                            </td>
                        </tr>
                    } else {
                        return <tr key={id}>
                            <th scope="row">{contact.id }</th>
                            <td>{contact.name}</td>
                            <td>{contact.username}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>
                                <span className='d-inline-block w-50'>{contact.website}</span>
                                <NavLink to={`/contact/edit/${contact.id}`}
                                         title='click to edit'
                                         className='mx-3 btn btn-outline-warning'>
                                    <img src={edit} alt="edit icon"/>
                                </NavLink>
                            </td>
                        </tr>
                    }
                })
                }
                </tbody>
            </table>
        </>
    )
}
export default ContactList