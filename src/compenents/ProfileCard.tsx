import Button from "./Button";

type profileProps = {
    name: string, 
    role: string,
    isAvailable?: boolean,
    onMessage?: (msg: string) => void;
}

const ProfileCard = ({name, role, isAvailable = true, onMessage}: profileProps) => {
    return (
        <div>
            <h2>Name: {name}</h2>
            <p>Role: {role}</p>
            <p>Status: {isAvailable ? "Active" : "Not Active"} </p>
            <Button
            label="Show Message"
            variant= "primary"
            onClick={() => onMessage?.(`Hello from ${name}!`)}
            />  
        </div>
    )
}

export default ProfileCard;