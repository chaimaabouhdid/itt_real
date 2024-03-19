import React from "react";

// Defining a functional component named AuthLayout using arrow function syntax
const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
     // Returning JSX to render the component
    return ( 
        // Rendering a <div> element with CSS classes for layout styling
        <div className="h-full flex items-center justify-center">
            {children}
        </div>
     );
}
export default AuthLayout;