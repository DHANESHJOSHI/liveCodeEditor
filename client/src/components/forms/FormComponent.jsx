import useAppContext from "@/hooks/useAppContext"
import useSocket from "@/hooks/useSocket"
import ACTIONS from "@/utils/actions"
import UserStatus from "@/utils/status"
import { useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

function FormComponent() {
    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()
    const usernameRef = useRef(null)
    const navigate = useNavigate()

    const createNewRoomId = () => {
        setCurrentUser({ ...currentUser, roomId: uuidv4() })
        toast.success("Created a new Room Id")
        usernameRef.current.focus()
    }

    const handleInputChanges = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentUser({ ...currentUser, [name]: value })
    }

    const validateForm = () => {
        if (currentUser.username.length === 0) {
            toast.error("Enter your username")
            return false
        } else if (currentUser.roomId.length === 0) {
            toast.error("Enter a room id")
            return false
        } else if (currentUser.roomId.length < 5) {
            toast.error("ROOM Id must be at least 5 characters long")
            return false
        } else if (currentUser.username.length < 3) {
            toast.error("Username must be at least 3 characters long")
            return false
        }
        return true
    }

    const joinRoom = (e) => {
        e.preventDefault()
        if (status === UserStatus.ATTEMPTING_JOIN) return
        if (!validateForm()) return
        toast.loading("Joining room...")
        setStatus(UserStatus.ATTEMPTING_JOIN)
        socket.emit(ACTIONS.JOIN_REQUEST, currentUser)
    }

    useEffect(() => {
        if (currentUser.roomId.length > 0) return
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId })
            if (currentUser.username.length === 0) {
                toast.success("Enter your username")
            }
        }
    }, [currentUser, location.state?.roomId, setCurrentUser])

    useEffect(() => {
        if (status === UserStatus.DISCONNECTED && !socket.connected) {
            socket.connect()
            return
        }
        if (status === UserStatus.JOINED) {
            const username = currentUser.username
            navigate(`/editor/${currentUser.roomId}`, {
                state: { username },
            })
        }
    }, [currentUser, navigate, socket, status])

    return (
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 p-4 sm:w-[500px] sm:p-8">
            <h1 className="text-4xl sm:text-5xl">BuddyCode</h1>
            <p className="mb-4 text-center md:mb-8">
            {"Code, Chat, Collaborate. It's All in Sync."} <br/> {"Made with ♥ by TechWithJoshi"}
            </p>
            <p className="mt-[-5%] mb-4 text-center md:mb-0">
            <details><summary>Steps To Use this app</summary>
                <li>Go to This <a href="https://3.110.157.177:3000/" target="_blank" rel="noreferrer"><u><b>Link</b></u> </a>
                    and allow server to access the site</li>
                        <li>It will Show <b>Your connection is not private</b></li>
                        <li>Click On Advance Then Click <b> Proceed to 3.110.157.177 (unsafe)</b></li>
            </details></p>
            <form onSubmit={joinRoom} className="flex flex-col w-full gap-4">
                <input
                    type="text"
                    name="roomId"
                    placeholder="Room Id"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md bg-darkHover focus:outline-none"
                    onChange={handleInputChanges}
                    value={currentUser.roomId}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full px-3 py-3 border border-gray-500 rounded-md bg-darkHover focus:outline-none"
                    onChange={handleInputChanges}
                    value={currentUser.username}
                    ref={usernameRef}
                />
                <button
                    type="submit"
                    className="w-full px-8 py-3 mt-2 text-lg font-semibold text-black rounded-md bg-primary"
                >
                    Join
                </button>
            </form>
            <button
                className="underline cursor-pointer select-none"
                onClick={createNewRoomId}
            >
                Generate Unique Room Id
            </button>
        </div>
    )
}

export default FormComponent
