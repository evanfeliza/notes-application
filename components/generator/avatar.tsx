import { createAvatar } from '@dicebear/core';
import { pixelArt } from '@dicebear/collection';



const Avatar = ({ email }: { email: string }) => {

    const generateInitials = () => {
        const parts = email.split('@'); // Split the email address into parts before and after '@'
        let initials = ''; // Initialize the variable to store initials
        parts.forEach(part => {
            initials += part.charAt(0); // Append the first letter of each part to the initials string
        });
        return initials.toUpperCase();

    }

    const initals = generateInitials()
    const avatar = createAvatar(pixelArt, {
        seed: initals,
    });

    return <div className='h-10 w-10 bg-accent' dangerouslySetInnerHTML={{ __html: avatar.toString() }} />
}

export default Avatar