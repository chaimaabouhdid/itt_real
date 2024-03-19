import Image from 'next/image';

// Define the Logo component
export const Logo = () => {
    return ( 
        <Image
            height={200}
            width={200}
            alt="logo"
            src="/logo.svg"
        />
     );
}
