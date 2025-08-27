import axios from "axios"
import { useEffect, useState } from "react"

function UserList() {

    const [users, setUsers] = useState([])
    const [searchItem, setSearchItem] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    'https://65a25d5342ecd7d7f0a771bd.mockapi.io/users'
                )
                setUsers(response.data)
            } catch (error) {
                console.error('Error fetching users: ', error)
            }
        }
        fetchUsers()
    }, [])

    const handleSearch = (event) => {
        setSearchItem(event.target.value)
    }

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchItem.toLocaleLowerCase()) ||
            user.email.toLowerCase().includes(searchItem.toLocaleLowerCase())
    )

    return (
        <div className="container mx-auto p-4 bg-amber-200">
            <input
                type="text"
                className="p-2 border border-gray-300 rounded mb-4 w-full"
                placeholder="Search by name or email"
                value={searchItem}
                onChange={handleSearch}
            />
            <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id} className="bg-purple-300 border-b font-black">
                            <td className="px-4 py-2 ">{user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default UserList