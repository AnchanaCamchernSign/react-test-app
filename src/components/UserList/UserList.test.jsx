import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { describe, expect, vi, it } from "vitest";
import UserList from "./UserList";

vi.mock('axios')

describe('UserList component', () => {
    const mockUsers = [
        {
            id: '1',
            name: 'Jay W Youth',
            email: 'callmejay@gmail.com',
            phoneNumber: '0928384582'
        },
        {
            id: '2',
            name: 'Melanine Wilson',
            email: 'minie@gmail.com',
            phoneNumber: '0983475743'
        },
        {
            id: '3',
            name: 'Honey Bee',
            email: 'babie@gmail.com',
            phoneNumber: '0894532343'
        }
    ]

    it('renders the table successfully when API call successed', async () => {
        axios.get.mockResolvedValue({ data: mockUsers })
        render(<UserList />)

        await waitFor(() => {
            expect(screen.getByText('Melanine Wilson')).toBeInTheDocument()
            expect(screen.getByText('minie@gmail.com')).toBeInTheDocument()
        })
    })

    it('filters users based on search input', async () => {
        axios.get.mockResolvedValue({ data: mockUsers })
        render(<UserList />)

        await waitFor(() => {
            fireEvent.change(screen.getByPlaceholderText('Search by name or email'), {
                target: { value: 'Jay W Youth'},
            })
            expect(screen.getByText('Jay W Youth')).toBeInTheDocument()
            expect(screen.getByText('callmejay@gmail.com')).toBeInTheDocument()
        })
    })

    it('handle API failure without problems and still renders')
})