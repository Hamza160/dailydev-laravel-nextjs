import Image from "next/image";

const UserAvatar = ({image}:{image?: string}) => {
    return (
        <div>
            {
                image ? <Image src="image" alt="Avatar" width={40} height={40}/> : <Image src="/avatar.png" alt="Avatar" width={40} height={40} />
            }
        </div>
    )
}

export default UserAvatar;