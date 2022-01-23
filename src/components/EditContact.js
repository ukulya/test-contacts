import {useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";

const EditContact = () => {

    // contact id from url
    const {id} = useParams()

    const userId = parseInt(id,10)

    const [contact,setContact] = useState()
    const [form,setForm] = useState({
        id: id,
        name:'',
        username:'',
        email:'',
        phone:'',
        website:''
    })

    useEffect(()=>{
        getContact(userId)
    },[])

    async function getContact (userId) {
        await axios(`https://demo.sibers.com/users`)
            .then(response => {
                setContact(response.data[userId])
                if(JSON.parse(localStorage.getItem(`userId${id}`)) == id){
                    setForm(JSON.parse(localStorage.getItem(`userData${id}`)))
                } else {
                    setForm({
                        name:response.data[userId].name,
                        username:response.data[userId].username,
                        email:response.data[userId].email,
                        phone:response.data[userId].phone,
                        website:response.data[userId].website
                    })
                }
            })
            .catch(error => console.log('Error fetching data',error))
    }

    const handleSubmit = (e) => {
      e.preventDefault()
        localStorage.setItem(`userData${id}`, JSON.stringify(form));
        localStorage.setItem(`userId${id}`, id);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // if contact data is not ready - return loading
    if (!contact) return 'Loading...'

    return(
        <>
            {contact &&<h1 className='mb-5'>{contact.name}</h1>}
            <form onSubmit={handleSubmit}>
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
                    {(contact && form.name) ? <tr>
                        <th scope="row">{contact.id}</th>
                        <td><input type="text" value={form.name} onChange={handleChange} name='name'/></td>
                        <td><input type="text" value={form.username} onChange={handleChange} name='username'/></td>
                        <td><input type="text" value={form.email} onChange={handleChange} name='email'/></td>
                        <td><input type="text" value={form.phone} onChange={handleChange} name='phone'/></td>
                        <td><input type="text" value={form.website} onChange={handleChange} name='website'/></td>
                    </tr> : null}
                    </tbody>
                </table>
                <div className="text-center">
                    <button type='submit' className='btn btn-outline-primary'>Save</button>
                </div>
            </form>
        </>
    )
}
export default EditContact